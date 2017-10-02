const rp = require('request-promise');

var domains = [];
var funcs = [{
    func: "getAllRedditDomainsFromDate",
    description: "Get all domains from JSON using date",
    execute: function(date, subreddit, pageAfter, callback) {
        let req;
        let newPageAfter;

        if (pageAfter == '') {
            req = 'https://www.reddit.com/r/' + subreddit + '.json';
        } else {
            req = 'https://www.reddit.com/r/' + subreddit + '.json?after=' + pageAfter;
        }
        rp(req)
            .then(function(body) {
                var jsonParsed = JSON.parse(body);
                var limit = Object.keys(jsonParsed.data.children).length;
                newPageAfter = jsonParsed.data.after;
                // var todayDate = Date.now() / 1000 | 0;
                for (var i = 0; i < limit; i++) {
                    var postDate = new Date(jsonParsed.data.children[i].data.created * 1000);
                    if (postDate < date) {
                        var idPost = jsonParsed.data.children[i].data.id;
                        var domain = jsonParsed.data.children[i].data.domain;
                        var timestamp = jsonParsed.data.children[i].data.created;
                        var dateTime = postDate.getDate() + "/" + postDate.getMonth() + "/" + postDate.getFullYear();

                        domains.push(idPost + " - " + "Page : " + pageAfter + " - " + domain + " - " + dateTime);
                    }
                }
                return domains;
            }).then((dom) => {
                console.log(dom);
                return callback(dom, newPageAfter, false);
            })
            .catch(function(err) {
                return callback(false, false, err);
            });
    }
}];

module.exports = funcs;