var rp = require('request-promise');
const funcs = require('./app/funcs');

rp('https://www.reddit.com/r/programming.json')
    .then(function(body) {
        return funcs[0].execute(1504216800, body);
    })
    .then((res) => {
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    });