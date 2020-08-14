var maxTime = 300000; //5 minutes in ms
var eventTime = [];
var eventCount = [];

for(let i = 0; i < maxTime; i++){
    eventCount[i] = 0;
}

function receiveCount(){
    var now = Date.now();
    var index = now % maxTime;
    if(eventTime[index] != now){
        eventTime[index] = now;
        eventCount[index] = 1;
    } else {
        eventCount[now % maxTime]++;
    }    
}

function reportCount(seconds){
    var ms = seconds * 1000;
    if(ms > maxTime){
        ms = maxTime;
    }
    var count = 0;
    var now = Date.now();
    for(let i = 0; i < maxTime; i++){
        if(now - eventTime[i] <= ms){
            count = count + eventCount[i];
        }
    }
    return count;
}

module.exports = {
    receiveCount: receiveCount, 
    reportCount: reportCount};