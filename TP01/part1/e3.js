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

const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = numbers.partitionBy(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(odds);  // [1, 3, 5]

const users = [
   { name: "Alice", age: 25 },
   { name: "Bob", age: 17 },
   { name: "Charlie", age: 30 }
];
const [adults, minors] = users.partitionBy(u => u.age >= 18);
console.log(adults);
/*
[
 { "name:" "Alice", age: 25 },
 { "name:" "Charlie", age: 30 }
]
*/
console.log(minors);
/*
[
 { "name:" "Bob", age: 17 }
]
*/