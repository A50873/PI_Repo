export default Array.prototype.partitionBy = function partitionBy(predicate) {
    const [r1, r2] = this.reduce(
        (acc, element) => {
            if(predicate(element)) {
                acc[0].push(element);
            }
            else {
                acc[1].push(element);
            }
            return acc;
        }, 
        [ [], [] ] // acumulador inicial: dois arrays vazios
    );
    return [r1, r2]; // Return the partitioned arrays
}