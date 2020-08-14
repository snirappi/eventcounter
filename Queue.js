/**
 * Implementation of Queue.
 * Source: https://www.nickang.com/2017-12-25-implementing-queue-javascript/
 */
class Queue {
    /**
     * Create a queue.
     */
    constructor () {
        this.store = {};
        this.front = 0;
        this.end = 0;
    }
}

/**
 * Add item to end of queue.
 * @param {*} The data to store in the position.
 */
Queue.prototype.enqueue = function (data) {
    this.store[this.end] = data;
    this.end++;
};

/**
 * Remove item from queue and return its data.
 * @return {*} The data stored in item.
 */
Queue.prototype.dequeue = function () {
    if (this.front === this.end) return null;

    const data = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    return data;
};

/**
 * Return current size of queue.
 * @return {number} Size of queue.
 */
Queue.prototype.size = function () {
    return this.end - this.front;
};

/**
 * Return item at front of queue without dequeueing.
 * @return {*} The data stored in item.
 */
Queue.prototype.peek = function () {
    if (this.size() === 0) return null;
    return this.store[this.front];
};

module.exports = {
    Queue: Queue
};