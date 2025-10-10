import {expect} from 'chai';
import timeExecution from "../e5.js"

const obj = {
    compute(x) {
        return x * 2;
    },
    add(a, b) {
        return a + b;
    }
};

describe('Part 1 Exercise 5 Tests', () => {

    it('Should wrap method and change its behavior', () => {
        const originalMethod = obj.compute;
        timeExecution(obj, 'compute');
        
        // Method should be different after wrapping
        expect(obj.compute).to.not.equal(originalMethod);
        expect(obj.compute).to.be.a('function');
    });

    it('Should make wrapped method return execution time instead of original result', () => {
        const testObj = {
            getValue() {
                return 42; // Original returns 42
            }
        };
        
        // Before wrapping - returns original value
        expect(testObj.getValue()).to.equal(42);
        
        // After wrapping - should return execution time
        timeExecution(testObj, 'getValue');
        const result = testObj.getValue();
        expect(result).to.be.a('number');
        expect(result).to.not.equal(42); // Should NOT be original return value
        expect(result).to.be.at.least(0); // Should be valid time
    });

    it('Should preserve original method execution (side effects)', () => {
        let counter = 0;
        const testObj = {
            increment() {
                counter++;
                return counter;
            }
        };
        
        timeExecution(testObj, 'increment');
        
        // Original function should still execute (side effect happens)
        const executionTime = testObj.increment();
        expect(counter).to.equal(1); // Side effect happened
        expect(executionTime).to.be.a('number'); // But returns time
    });

    it('Should handle methods with arguments', () => {
        let receivedArgs = [];
        const testObj = {
            saveArgs(...args) {
                receivedArgs = args;
                return args.length;
            }
        };
        
        timeExecution(testObj, 'saveArgs');
        
        // Arguments should still be passed to original method
        const executionTime = testObj.saveArgs('hello', 42, true);
        expect(receivedArgs).to.deep.equal(['hello', 42, true]);
        expect(executionTime).to.be.a('number'); // But returns time
    });

    it('Should return different times for different calls', () => {
        const testObj = {
            doWork() {
                return Math.random();
            }
        };
        
        timeExecution(testObj, 'doWork');
        
        // Multiple calls should return execution times
        const time1 = testObj.doWork();
        const time2 = testObj.doWork();
        
        expect(time1).to.be.a('number');
        expect(time2).to.be.a('number');
        expect(time1).to.be.at.least(0);
        expect(time2).to.be.at.least(0);
    });

    it('Should accurately measure execution time with deliberate delay', () => {
        const testObj = {
            delayedMethod() {
                // Create a 5ms delay using a busy wait loop
                const start = performance.now();
                while (performance.now() - start < 5) {
                    // Busy wait for ~5ms
                }
                return 'done';
            }
        };
        
        timeExecution(testObj, 'delayedMethod');
        const measuredTime = testObj.delayedMethod();
        
        // Should measure approximately 5ms (with some tolerance for timing precision)
        expect(measuredTime).to.be.at.least(4); // At least 4ms
        expect(measuredTime).to.be.at.most(10); // At most 10ms (allowing for overhead)
    });

    it('Should measure different times for fast vs slow operations', () => {
        const testObj = {
            fastMethod() {
                return 1 + 1; // Very fast
            },
            slowMethod() {
                // Deliberate 3ms delay
                const start = performance.now();
                while (performance.now() - start < 3) {
                    // Busy wait
                }
                return 'slow done';
            }
        };
        
        timeExecution(testObj, 'fastMethod');
        timeExecution(testObj, 'slowMethod');
        
        const fastTime = testObj.fastMethod();
        const slowTime = testObj.slowMethod();
        
        // Slow method should take significantly longer than fast method
        expect(slowTime).to.be.greaterThan(fastTime);
        expect(slowTime).to.be.at.least(2); // Should be at least 2ms
        expect(fastTime).to.be.at.most(2);  // Should be at most 2ms
    });
})