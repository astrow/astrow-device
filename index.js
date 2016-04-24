var prompt = require('prompt');
var socket = require('socket.io-client')('http://server.astrow.site');
var config = require('./config');

// var waterrower = require("node-waterrower/Waterrower");

// var readWaterrower = function () {
// 	console.log();
// 	console.log("Stroke Rate..." + waterrower.readStrokeCount());  // [ - ]
// 	console.log("Total Speed..." + waterrower.readTotalSpeed());   // [cm/s]
// 	console.log("Average Speed..." + waterrower.readAverageSpeed()); // [cm/s]
// 	console.log("Distance..." + waterrower.readDistance());     // [ m ]
// 	console.log("Heart Rate......" + waterrower.readHeartRate());    // [ bpm ]
// 	console.log("Calories..." + waterrower.readCalories());    // [ kcal ]
// }

var dp;
var name;

prompt.start();
var promptProps = [{
    name: 'name',
    type: 'string',
    description: 'What\'s your name?'
}]
prompt.get(promptProps, function(err, result) {
    if (err) throw err;
    config.name = result.name;
    sendData();
})


function sendData() {
    var stroke = {
        name: config.name,
        strokeRate: Math.round((Math.random() * 5) + 20),
        caloriesPerMinute: Math.round((Math.random() * 10) + 70),
        distance: Math.round((Math.random() * 5) + 20)
    };

    socket.emit('stroke', stroke);
    setTimeout(sendData, 1000);
}
