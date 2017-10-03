const funcs = require('./app/funcs');
const moment = require('moment');

let fromDate = new moment.unix(1506725999).format("DD MMM YYYY hh:mm a")
let subreddit = 'programmation';
var domains = [];

function getAllPages(subreddit, pageAfter) {
    funcs[0].execute(fromDate, subreddit, pageAfter, async function(newDomains, newPageAfter, err) {
        if (err) return console.log(err);
        domains = newDomains;
        if (newPageAfter != null) {
            //console.log(domains);
            await getAllPages(subreddit, newPageAfter);
        }
    });
};

getAllPages(subreddit, '');