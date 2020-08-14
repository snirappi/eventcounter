var maxTime = 300000; //5 minutes in ms
var eventTime, eventCount;

//Initialize Arrays
(eventTime = []).length = maxTime;
(eventCount = []).length = maxTime;
eventCount.fill(0);

/**
 * Records current time and number of calls at that same millisecond in 
 * `eventTime` and `eventCount` respectively.
 */
function receiveCount(){
    var now = Date.now();
    var index = now % maxTime;
    if(eventTime[index] != now){    //Overwrite Old or Uninitilized Index
        eventTime[index] = now;
        eventCount[index] = 1;
    } else {
        eventCount[index]++;
    }    
}
/**
 * Returns the number of events that have occurred in the past number of seconds 
 * up to the current time, defined by the user input
 * @param {number} seconds - Number of Seconds to look back 
 * @returns {number} 
 */
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
    reportCount: reportCount}
;