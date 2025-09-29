import {expect} from 'chai';
import validateArrayElements from "../e1.js"
import validateAndCorrectArray from "../e2.js"
import "../e3.js"

const numbers = [1, 2, 3, 4, 5, 6];

const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];

const users = [
   { name: "Alice", age: 25 },
   { name: "Bob", age: 17 },
   { name: "Charlie", age: 30 }
];

const defaultProduct = { name: "Unknown", category: "Misc" };

describe('Part 1 Test', () => {

    it('Exercise 1 Number Test', () => {
        expect(validateArrayElements(numbers, n => n % 2 === 0)).to.deep.equal( [
            { value: 1, isValid: false },
            { value: 2, isValid: true },
            { value: 3, isValid: false },
            { value: 4, isValid: true },
            { value: 5, isValid: false }, 
            { value: 6, isValid: true }
        ]);
    });

    it('Exercise 1 Product Test', () => {
        expect(validateArrayElements(products, p => p.category.length > 0)).to.deep.equal( [
            { value: { name: "Laptop", category: "Electronics" }, isValid: true },
            { value: { name: "Shirt", category: "" }, isValid: false },
            { value: { name: "Chair", category: "Furniture" }, isValid: true }
        ]);
    });

    it('Exercise 2 Number Test', () => {
        expect(validateAndCorrectArray(numbers, n => n % 2 === 0, 0)).to.deep.equal( {
            correctedArray: [0, 2, 0, 4, 0, 6], 
            invalidElements: [1, 3, 5]
        });
    });

    it('Exercise 2 Product Test', () => {
        expect(validateAndCorrectArray(products, p => p.category.length > 0, defaultProduct)).to.deep.equal( {
            correctedArray: [
                { name: "Laptop", category: "Electronics" },
                { name: "Unknown", category: "Misc" },
                { name: "Chair", category: "Furniture" }
            ],
            invalidElements: [
                { name: "Shirt", category: "" }
            ]
        });
    });

    it('Exercise 3 Number Test', () => {
        const [evens, odds] = numbers.partitionBy(n => n % 2 === 0);
        expect(evens).to.deep.equal([2, 4, 6]);
        expect(odds).to.deep.equal([1, 3, 5]);
    });

    it('Exercise 3 User Test', () => {
        const [adults, minors] = users.partitionBy(u => u.age >= 18);
        expect(adults).to.deep.equal([
            { name: "Alice", age: 25 },
            { name: "Charlie", age: 30 }
        ]);
        expect(minors).to.deep.equal([
            { name: "Bob", age: 17 }
        ]);
    });
})