var events = [];
var totalEvents = 0;
var maxTime = 10000;
var pruneCount = 0;
var intervalTime = 10;

function receiveCount(){
    var currentDate = new Date();
    totalEvents++;
    events.push(currentDate);
    //console.log(currentDate.getTime());
    //console.log(events.length);    
    //pruneEvents();
}

//
function reportCount(seconds){
    var ms = seconds * 1000;
    if(ms > maxTime){
        ms = maxTime;
    }
    var count = 0;
    var currentTime = Date.now();
    /*console.log('Threshold: ' + (currentTime - ms));
    if(events[0] != undefined && events[0] != null){
        console.log('FirstTime: ' + events[0].getTime());
    }*/
    events.forEach((event) => {
        if(currentTime - event.getTime() <= ms)
            count++;
    });
    pruneEvents();
    /*console.log('# of Events: ' + events.length);  
    console.log('# of Events Pruned: ' + pruneCount);  
    console.log('# of Total Events: ' + totalEvents);  
    console.log(count);
    console.log('');*/
    return count;
}

function pruneEvents(){
    var pruned = 0;
    while(events.length > 0 && events[0]){
        if(Date.now() - events[0].getTime() >= maxTime){
            events.shift();
            pruned++;
            pruneCount++;
        } else {
            break;
        }
    }
    /*if(pruned > 0){
        console.log('Pruned: ' + pruned);
        
    }*/
    //console.log('# of Events: ' + events.length);    

}

/* Test Functions*/
function resetInits(){
    events = [];
    totalEvents = 0;
    maxTime = 10000;
    pruneCount = 0;
    intervalTime = 10;    
}
function testSimpleCount(){
    resetInits();
    receiveCount();
    receiveCount();
    receiveCount();
    
    return (reportCount(1000) === 3);
}

function testNoCount(){
    resetInits();
    return (reportCount(1000) === 0);
}

function testPrune(){
    resetInits();
    var interval = setInterval(receiveCount, intervalTime);
    var count = 0;
    setTimeout( function() {
        clearInterval(interval);
        count = reportCount(10000);
        console.log('Prune Test');
        if(count === (totalEvents - pruneCount)){
            console.log(true);
        } else {
            console.log(false);
        }
    }, 20000);

}

function testSmallIntervalPrune(){
    resetInits();
    intervalTime = 10;
    var interval = setInterval(receiveCount, intervalTime);
    var count = 0;
    setTimeout( function() {
        clearInterval(interval);
        count = reportCount(10000);
        console.log('Small Interval Test');
        if(count === (totalEvents - pruneCount)){
            console.log(true);
        } else {
            console.log(false);
        }
    }, 20000);
}

function testSmallCount(){
    resetInits();
    var interval = setInterval(receiveCount, intervalTime);
    var count = 0;
    setTimeout( function() {
        clearInterval(interval);
        count = reportCount(1000);
        console.log('Small Count Test');
        console.log('Tolerance['+ Math.round(totalEvents*0.095) + ', ' + Math.round(totalEvents*.105) + ']');
        console.log('Count: ' + count + '/' + totalEvents);
        if(count >= Math.round(totalEvents*0.099) && count <= Math.round(totalEvents*.101)){
            console.log(true);
        } else {
            console.log(false);
        }
    }, 10000);
}

function testLongMs(){
    resetInits();
    var interval = setInterval(receiveCount, intervalTime);
    var count = 0;
    setTimeout( function() {
        clearInterval(interval);
        count = reportCount(100000);
        console.log('Long Ms Test');
        if(count === (totalEvents - pruneCount)){
            console.log(true);
        } else {
            console.log(false);
        }
    }, 20000);    
}


/*console.log('Simple Count Test: ' + testSimpleCount());
console.log('No Count Test: ' + testNoCount());
testPrune();
testSmallIntervalPrune();
testSmallCount();
testLongMs();*/
for(let i = 0; i < 100000000000000000; i++){
    receiveCount();
}
console.log(totalEvents);
//testSmallCount();

//var interval = setInterval(receiveCount, intervalTime);
//10000 -> 100
//var interval = null;
/*setTimeout( function() {reportCount(50);}, 100); //1

setTimeout( function() {reportCount(300);}, 500); //3

setTimeout( function() {reportCount(10000);}, 10000);//== total events

setTimeout( function() {reportCount(10000);}, 15000);//100

setTimeout( function() {reportCount(500);}, 20000);//5

setTimeout( function() {clearInterval(interval); reportCount(10000);}, 30000); //100*/