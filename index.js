const funcs = require('./app/funcs');
let fromDate = new Date(1504216800 * 1000);
let subreddit = 'programmation';
var domains = [];

function getAllPages(subreddit, pageAfter) {
    funcs[0].execute(fromDate, subreddit, pageAfter, async function(newDomains, newPageAfter, err) {
        if (err) return console.log(err);
        domains = newDomains;
        await getAllPages(subreddit, newPageAfter);
    });
};

getAllPages(subreddit, '');