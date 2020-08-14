# eventcounter

## About
### Description
This is a small node.js library that tracks generic events up to 5 minutes and allows users to request the number of events that have occurred within a specified period of time.

### Prequisites
* Nodejs & npm (https://nodejs.org/en/download/)

### Packages used
* jest
* jest-date-mock

### Setup
`npm install`

### Testing
`npm run test`<br/>
The stress tests can take a significant amount of time to run. Test basic functionality with the following command <br/>
`npm run test:simple`

## Implementation Details
### Data Structures
eventcounter uses 2 arrays of size equal to the maximum time (5 minutes) where each index corresponds to a millisecond tick [0 - 299,999]. Indices are calculated by taking the current time and finding the remainder against the maximum time. `eventTime` records the most recent timestamp (using Javascript's `Date.now()`) and `eventCount` tracks how many events have been fired at that given time. This means that multiple calls at the same time can be counted. <br/> 
The index of each array corresponds to one another for example <br/> 
`eventTime[1000] == 1597409910926; eventCount[1000] == 2` <br/>
`eventTime[1001] == 1597409911926; eventCount[1001] == 1 `<br/>
`eventTime[1002] == 1597409099926; eventCount[1000] == 5 ...` <br/> 

### receiveCount
#### Description
Records current time and number of calls at that same millisecond in `eventTime` and `eventCount` respectively.
#### Parameters
receiveCount uses no parameters
#### Return
receiveCount does not return anything

### reportCount
#### Description
Returns the number of events that have occurred in the past number of seconds up to the current time, defined by the user input
#### Parameters
* seconds = # of seconds in the past to count from
#### Return
Returns the number of events in past # of seconds
