import {expect} from 'chai';
import "../e3.js"

const numbers = [1, 2, 3, 4, 5, 6];

const users = [
   { name: "Alice", age: 25 },
   { name: "Bob", age: 17 },
   { name: "Charlie", age: 30 }
];

describe('Part 1 Exercise 3 Tests', () => {

    it('Number Test', () => {
        const [evens, odds] = numbers.partitionBy(n => n % 2 === 0);
        expect(evens).to.deep.equal([2, 4, 6]);
        expect(odds).to.deep.equal([1, 3, 5]);
    });

    it('User Test', () => {
        const [adults, minors] = users.partitionBy(u => u.age >= 18);
        expect(adults).to.deep.equal([
            { name: "Alice", age: 25 },
            { name: "Charlie", age: 30 }
        ]);
        expect(minors).to.deep.equal([
            { name: "Bob", age: 17 }
        ]);
    });

    it('Single Element Array Test', () => {
        const singleElement = [42];
        const [passing, failing] = singleElement.partitionBy(n => n > 40);
        expect(passing).to.deep.equal([42]);
        expect(failing).to.deep.equal([]);
    });

    it('Empty Array Test', () => {
        const emptyArray = [];
        const [first, second] = emptyArray.partitionBy(n => n > 0);
        expect(first).to.deep.equal([]);
        expect(second).to.deep.equal([]);
    });

    it('All Elements Match Predicate Test', () => {
        const evenNumbers = [2, 4, 6, 8, 10];
        const [evens, odds] = evenNumbers.partitionBy(n => n % 2 === 0);
        expect(evens).to.deep.equal([2, 4, 6, 8, 10]);
        expect(odds).to.deep.equal([]);
    });

    it('No Elements Match Predicate Test', () => {
        const oddNumbers = [1, 3, 5, 7, 9];
        const [evens, odds] = oddNumbers.partitionBy(n => n % 2 === 0);
        expect(evens).to.deep.equal([]);
        expect(odds).to.deep.equal([1, 3, 5, 7, 9]);
    });

    it('String Array Test', () => {
        const words = ["apple", "banana", "cherry", "date", "elderberry"];
        const [longWords, shortWords] = words.partitionBy(word => word.length > 5);
        expect(longWords).to.deep.equal(["banana", "cherry", "elderberry"]);
        expect(shortWords).to.deep.equal(["apple", "date"]);
    });

    it('Boolean Array Test', () => {
        const booleans = [true, false, true, true, false, false];
        const [trueValues, falseValues] = booleans.partitionBy(bool => bool === true);
        expect(trueValues).to.deep.equal([true, true, true]);
        expect(falseValues).to.deep.equal([false, false, false]);
    });

    it('Complex Objects Array Test', () => {
        const products = [
            { name: "Laptop", price: 1200, inStock: true },
            { name: "Mouse", price: 25, inStock: false },
            { name: "Keyboard", price: 80, inStock: true },
            { name: "Monitor", price: 300, inStock: false },
            { name: "Headphones", price: 150, inStock: true }
        ];
        const [inStock, outOfStock] = products.partitionBy(product => product.inStock);
        expect(inStock).to.deep.equal([
            { name: "Laptop", price: 1200, inStock: true },
            { name: "Keyboard", price: 80, inStock: true },
            { name: "Headphones", price: 150, inStock: true }
        ]);
        expect(outOfStock).to.deep.equal([
            { name: "Mouse", price: 25, inStock: false },
            { name: "Monitor", price: 300, inStock: false }
        ]);
    });

    it('Mixed Data Types Test', () => {
        const mixedArray = [10, "hello", true, 5.5, null, 42, "world"];
        const [numbers, nonNumbers] = mixedArray.partitionBy(item => typeof item === 'number');
        expect(numbers).to.deep.equal([10, 5.5, 42]);
        expect(nonNumbers).to.deep.equal(["hello", true, null, "world"]);
    });

    it('Negative Numbers Test', () => {
        const numbers = [-5, -2, 0, 3, -1, 7, -8];
        const [positiveOrZero, negative] = numbers.partitionBy(n => n >= 0);
        expect(positiveOrZero).to.deep.equal([0, 3, 7]);
        expect(negative).to.deep.equal([-5, -2, -1, -8]);
    });

    it('Grade Classification Test', () => {
        const grades = [95, 87, 76, 92, 68, 81, 59, 94];
        const [excellentGrades, otherGrades] = grades.partitionBy(grade => grade >= 90);
        expect(excellentGrades).to.deep.equal([95, 92, 94]);
        expect(otherGrades).to.deep.equal([87, 76, 68, 81, 59]);
    });
})