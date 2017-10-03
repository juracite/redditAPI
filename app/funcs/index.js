const rp = require('request-promise');
const moment = require('moment');

let pageAfterBase;

var domains = [];
var funcs = [{
    func: "getAllRedditDomainsFromDate",
    description: "Get all domains from JSON using date",
    execute: function(date, subreddit, pageAfter, callback) {
        let req;
        pageAfterBase = pageAfter;

        req = 'https://www.reddit.com/r/' + subreddit + '.json?after=' + pageAfter;

        rp(req)
            .then(function(body) {
                var jsonParsed = JSON.parse(body);
                var limit = Object.keys(jsonParsed.data.children).length;
                newPageAfter = jsonParsed.data.after;
                // var todayDate = Date.now() / 1000 | 0;
                for (var i = 0; i < limit; i++) {
                    var postDate = jsonParsed.data.children[i].data.created_utc.toString();
                    postDate = postDate.substring(0, 10);
                    postDate = new moment(new moment.unix(postDate));
                    if (postDate.isAfter(date) && postDate.isValid()) {
                        var idPost = jsonParsed.data.children[i].data.id;
                        var domain = jsonParsed.data.children[i].data.domain;
                        //var timestamp = jsonParsed.data.children[i].data.created;
                        //var dateTime = postDate.getDate() + "/" + postDate.getMonth() + "/" + postDate.getFullYear();
                        console.log(domain, " - Date : ", postDate.format("DD MMM YYYY hh:mm a"));
                        domains.push(idPost + " - " + "Page : " + pageAfterBase + " - " + domain + " - " + postDate.format("DD MMM YYYY hh:mm a"));
                    }
                }
                return domains;
            }).then((dom) => {
                //console.log(dom);
                return callback(dom, newPageAfter, false);
            })
            .catch(function(err) {
                return callback(false, false, err);
            });
    }
}];

module.exports = funcs;