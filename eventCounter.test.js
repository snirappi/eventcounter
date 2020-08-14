describe('Basic Functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    test('Test 0 Counts', () => {
        const eventCounter = require('./eventCounter.js');
        expect(eventCounter.reportCount(1)).toBe(0);       
    });
    test('Test Single Count', () => {     
        const eventCounter = require('./eventCounter.js');
        eventCounter.receiveCount();
        expect(eventCounter.reportCount(1)).toBe(1);
    });  
    test('Test Seconds over Maximum Time', () => {
        const eventCounter = require('./eventCounter.js');
        eventCounter.receiveCount();
        expect(eventCounter.reportCount(1000000)).toBe(1);
    });  
    test('Test Several Counts', () => {
        const eventCounter = require('./eventCounter.js');
        for(var i = 0; i < 100000; i++){
            eventCounter.receiveCount();
        }        
        expect(eventCounter.reportCount(1)).toBe(100000);
    });      
    test('Test Counts Over Time', () => {
        const eventCounter = require('./eventCounter.js');
        const dateMock = require('jest-date-mock');
        var twentySecondsBefore = new Date();
        twentySecondsBefore.setSeconds(twentySecondsBefore.getSeconds() - 20);
        dateMock.advanceTo(twentySecondsBefore);
        for(var i = 0; i < 20; i++){
            //Add one count every 1 Second for 20 Seconds
            eventCounter.receiveCount();
            dateMock.advanceBy(1000); 
        }
        expect(eventCounter.reportCount(5)).toBe(5);
        expect(eventCounter.reportCount(20)).toBe(20);
        expect(eventCounter.reportCount(300)).toBe(20);
    });   
    test('Test Timeout', () => {
        const eventCounter = require('./eventCounter.js');
        const dateMock = require('jest-date-mock');
        var tenMinutesBefore = new Date();
        tenMinutesBefore.setSeconds(tenMinutesBefore.getMinutes() - 10);
        dateMock.advanceTo(tenMinutesBefore);
        for(var i = 0; i < 10; i++){
            //Add one Count every 1 Minute for 10 minutes
            eventCounter.receiveCount();
            dateMock.advanceBy(60000);
        }
        expect(eventCounter.reportCount(300)).toBe(5);
        //Fast Forward 5 Minutes
        dateMock.advanceBy(300000);
        expect(eventCounter.reportCount(300)).toBe(0);
    });   
    test('Run For One Year', () => {
        const eventCounter = require('./eventCounter.js');
        const dateMock = require('jest-date-mock');
        var yearBefore = new Date();
        yearBefore.setDate(yearBefore.getYear() - 1);
        dateMock.advanceTo(yearBefore);
        for(var i = 0; i < 31556925; i++){
            //Add one Count every 1 Second for 1 Year
            eventCounter.receiveCount();
            dateMock.advanceBy(1000);
            //Check Count for last 5 seconds every 30 seconds
            if(i % 30000 === 0 && i > 0){
                expect(eventCounter.reportCount(5)).toBe(5);
            }
        }
    });      
});

describe('Stress Tests', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    test('Send 10 Billion Counts', () => {
        const eventCounter = require('./eventCounter.js');        
        for(var i = 0; i < 10000000000; i++){
            eventCounter.receiveCount();
        }
        expect(eventCounter.reportCount(300)).toBe(10000000000);
    });
});
