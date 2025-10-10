export default function timeExecution(object, method) {

    const original_method = object[method];  // store reference to the original method

    object[method] = function(...args) {     // replace the method adding timer Execution
        const timer_init = performance.now(); // record start time
        original_method.apply(this, args);    // execute the original method with correct context and arguments
        return performance.now() - timer_init; // return execution time instead of original result
    }
}