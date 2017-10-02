var domains = [];
var funcs = [{
    func: "getAllRedditDomainsFromDate",
    description: "Get all domains from JSON using date",
    parameters: ["date", "json"],
    /**
     * @param {array} date The date (timestamp) from where to get all data
     * @param {String} json The JSON
     * @return {String}
     */
    execute: function(date, json) {
        var json = JSON.parse(json);
        var limit = Object.keys(json.data.children).length;
        var todayDate = Date.now() / 1000 | 0;

        for (var i = 0; i < limit; i++) {
            if (json.data.children[i].data.created >= date) {
                var idPost = json.data.children[i].data.id;
                var domain = json.data.children[i].data.domain;
                var timestamp = json.data.children[i].data.created;
                var dateTime = new Date(timestamp * 1000);
                var dateTime = dateTime.getDay() + "/" + dateTime.getMonth() + "/" + dateTime.getFullYear();

                domains.push(idPost, domain, dateTime);
            }
        }
        return domains;
    }
}];

module.exports = funcs;