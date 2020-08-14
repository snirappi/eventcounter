var Queue = require('./Queue.js');
var events = new Queue.Queue(); //Queue
var maxTime = 300000; //5 minutes in ms
var intervalTime = 10;

function receiveCount(){
    events.enqueue(Date.now());
}

function reportCount(seconds){
    var ms = seconds * 1000;
    if(ms > maxTime){
        ms = maxTime;
    }
    var count = 0;
    var currentTime = Date.now();
    for(let i = events.size() - 1; i >= 0; i--){
        if(currentTime - events.store[i] <= ms){
            count++;
        } else {
            break;
        }
    }
    pruneEvents();
    return count;
}

function pruneEvents(){
    while(events.size() > 0 && events.peek()){
        if(Date.now() - events.peek() >= maxTime){
            events.dequeue();
        } else {
            break;
        }
    }
}

module.exports = {
    receiveCount: receiveCount, 
    reportCount: reportCount};