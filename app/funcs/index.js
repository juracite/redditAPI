const rp = require('request-promise');

var domains;
var funcs = [{
    func: "getAllRedditDomainsFromDate",
    description: "Get all domains from JSON using date",
    parameters: ["date", "json"],
    /**
     * @param {array} date The date (timestamp) from where to get all data
     * @param {String} json The JSON
     * @return {String}
     */
    execute: function(date, subreddit, pageAfter, callback) {
        let req = 'https://www.reddit.com/r/' + subreddit + '.json?after=' + pageAfter + '&limit=100';

        rp(req)
            .then(function(body) {
                var jsonParsed = JSON.parse(body);
                var limit = Object.keys(jsonParsed.data.children).length;
                // var todayDate = Date.now() / 1000 | 0;

                let pageAfter = jsonParsed.data.after;
                for (var i = 0; i < limit; i++) {
                    if (jsonParsed.data.children[i].data.created >= date) {
                        var idPost = jsonParsed.data.children[i].data.id;
                        var domain = jsonParsed.data.children[i].data.domain;
                        var timestamp = jsonParsed.data.children[i].data.created;
                        var dateTime = new Date(timestamp * 1000);
                        pageAfter = jsonParsed.data.after;
                        var dateTime = dateTime.getDate() + "/" + dateTime.getMonth() + "/" + dateTime.getFullYear();

                        domains = idPost + " - " + "Page : " + pageAfter + " - " + domain + " - " + dateTime;
                        console.log(domains);
                    }
                }

                return callback(domains, pageAfter, false);
            })
            .catch(function(err) {
                return callback(false, false, err);
            });
    }
}];

module.exports = funcs;