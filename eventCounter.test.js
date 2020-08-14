jest.useFakeTimers();
describe('Basic Functionality', () => {
    beforeEach(() => {
        jest.resetModules();
        const eventCounter = require('./eventCounter.js');
    });
    test('Tests 0 Counts', () => {
        const eventCounter = require('./eventCounter.js');
        expect(eventCounter.reportCount(1)).toBe(0);       
    });
    test('Tests a Single Count', () => {     
        const eventCounter = require('./eventCounter.js');
        eventCounter.receiveCount();
        expect(eventCounter.reportCount(1)).toBe(1);
    });  
    test('Tests Seconds over Maximum Time', () => {
        const eventCounter = require('./eventCounter.js');
        eventCounter.receiveCount();
        expect(eventCounter.reportCount(1000000)).toBe(1);
    });  
    test('Tests Several Counts', () => {
        const eventCounter = require('./eventCounter.js');
        for(var i = 0; i < 100; i++){
            eventCounter.receiveCount();
        }        
        expect(eventCounter.reportCount(1)).toBe(100);
    });      
    test('Test Counts Over Time', () => {
        const eventCounter = require('./eventCounter.js');
        const dateMock = require('jest-date-mock');
        var twentySecondsBefore = new Date();
        twentySecondsBefore.setSeconds(twentySecondsBefore.getSeconds() - 20);
        dateMock.advanceTo(twentySecondsBefore);
        var interval = setInterval(function() {
            eventCounter.receiveCount();
            dateMock.advanceBy(1000);            
        }, 1000);
        setTimeout(function () {
            clearInterval(interval);
            expect(eventCounter.reportCount(5)).toBe(5);
        }, 20000);
        jest.advanceTimersByTime(20000);
        setTimeout(function () {
            expect(eventCounter.reportCount(300)).toBe(20);
        }, 20000)
        jest.advanceTimersByTime(20000);
    });
    test('Test Pruning', () => {
        const eventCounter = require('./eventCounter.js');
        const dateMock = require('jest-date-mock');
        var tenMinutesBefore = new Date();
        tenMinutesBefore.setSeconds(tenMinutesBefore.getMinutes() - 10);
        dateMock.advanceTo(tenMinutesBefore);
        var interval = setInterval(function() {
            eventCounter.receiveCount();
            dateMock.advanceBy(60000);            
        }, 60000);
        setTimeout(function () {
            clearInterval(interval);
            expect(eventCounter.reportCount(300)).toBe(10);
        }, 300000);
        jest.advanceTimersByTime(20000);
    });    
});

describe('Stress Testing', () => {
    test('Request Overload', () => {
        const eventCounter = require('./eventCounter.js');        
        for(var i = 0; i < 10000000000; i++){
            eventCounter.receiveCount();
        }
    });
});
