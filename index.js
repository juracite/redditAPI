const funcs = require('./app/funcs');
let fromDate = 1504216800;
let subreddit = 'programmation';
var domains = [];

function getAllPages(subreddit, pageAfter) {

    funcs[0].execute(fromDate, subreddit, pageAfter, function(newDomains, newPageAfter, err) {
        if (err) return console.log(err);
        domains = domains.concat(newDomains);

        getAllPages(subreddit, newPageAfter);
    });

};

getAllPages(subreddit, '');