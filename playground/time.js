var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
//
// // date.subtract(1, 'year').add(9,'months');
//
// // shorthand version of the month: Aug
// console.log(date.format("MMM Do, YYYY"));

// 10:35 am
// 6:01 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(someTimestamp);
console.log(date.format("h:mm a"));;

