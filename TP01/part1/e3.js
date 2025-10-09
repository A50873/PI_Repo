export default Array.prototype.partitionBy = function partitionBy(predicate) {
    const [r1, r2] = this.reduce(   // use reduce to partition the array
        (acc, element) => { 
            if(predicate(element)) {
                acc[0].push(element);   // if predicate is true, push to the first array
            }
            else {
                acc[1].push(element);   // if predicate is false, push to the second array
            }
            return acc;
        }, 
        [ [], [] ] // initial value: two empty arrays
    );
    return [r1, r2]; // Return the partitioned arrays
}