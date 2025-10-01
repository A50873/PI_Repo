import {expect} from 'chai';
import validateAndCorrectArray from "../e2.js"

const numbers = [1, 2, 3, 4, 5, 6];

const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];

const defaultProduct = { name: "Unknown", category: "Misc" };

describe('Part 1 Exercise 2 Tests', () => {

    it('Number Test', () => {
        expect(validateAndCorrectArray(numbers, n => n % 2 === 0, 0)).to.deep.equal( {
            correctedArray: [0, 2, 0, 4, 0, 6], 
            invalidElements: [1, 3, 5]
        });
    });

    it('Product Test', () => {
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

    it('Single Element Array Test', () => {
        const singleElement = [7];
        const result = validateAndCorrectArray(singleElement, n => n > 10, 100);
        expect(result).to.deep.equal({
            correctedArray: [100],
            invalidElements: [7]
        });
    });

    it('All Valid Elements Test', () => {
        const evenNumbers = [2, 4, 6, 8];
        const result = validateAndCorrectArray(evenNumbers, n => n % 2 === 0, -1);
        expect(result).to.deep.equal({
            correctedArray: [2, 4, 6, 8],
            invalidElements: []
        });
    });

    it('All Invalid Elements Test', () => {
        const oddNumbers = [1, 3, 5, 7];
        const result = validateAndCorrectArray(oddNumbers, n => n % 2 === 0, 0);
        expect(result).to.deep.equal({
            correctedArray: [0, 0, 0, 0],
            invalidElements: [1, 3, 5, 7]
        });
    });

    it('String Array Test', () => {
        const words = ["hi", "hello", "world", "test", "javascript"];
        const result = validateAndCorrectArray(words, str => str.length >= 5, "default");
        expect(result).to.deep.equal({
            correctedArray: ["default", "hello", "world", "default", "javascript"],
            invalidElements: ["hi", "test"]
        });
    });

    it('Boolean Array Test', () => {
        const booleans = [true, false, true, false, true];
        const result = validateAndCorrectArray(booleans, bool => bool === true, false);
        expect(result).to.deep.equal({
            correctedArray: [true, false, true, false, true],
            invalidElements: [false, false]
        });
    });

    it('Complex Objects Array Test', () => {
        const employees = [
            { name: "John", salary: 50000, department: "IT" },
            { name: "Jane", salary: 30000, department: "HR" },
            { name: "Bob", salary: 60000, department: "IT" },
            { name: "Alice", salary: 25000, department: "Marketing" }
        ];
        const defaultEmployee = { name: "Unknown", salary: 40000, department: "General" };
        const result = validateAndCorrectArray(employees, emp => emp.salary >= 40000, defaultEmployee);
        expect(result).to.deep.equal({
            correctedArray: [
                { name: "John", salary: 50000, department: "IT" },
                { name: "Unknown", salary: 40000, department: "General" },
                { name: "Bob", salary: 60000, department: "IT" },
                { name: "Unknown", salary: 40000, department: "General" }
            ],
            invalidElements: [
                { name: "Jane", salary: 30000, department: "HR" },
                { name: "Alice", salary: 25000, department: "Marketing" }
            ]
        });
    });

    it('Numeric Range Test', () => {
        const scores = [85, 92, 67, 78, 95, 54, 88];
        const result = validateAndCorrectArray(scores, score => score >= 80, 80);
        expect(result).to.deep.equal({
            correctedArray: [85, 92, 80, 80, 95, 80, 88],
            invalidElements: [67, 78, 54]
        });
    });

    it('Mixed Data Types Test', () => {
        const mixedArray = [10, "hello", true, 5.5, null];
        const result = validateAndCorrectArray(mixedArray, item => typeof item === 'number', 0);
        expect(result).to.deep.equal({
            correctedArray: [10, 0, 0, 5.5, 0],
            invalidElements: ["hello", true, null]
        });
    });

    // Error handling tests
    it('Should throw error for empty array', () => {
        expect(() => validateAndCorrectArray([], n => n > 0, 0)).to.throw('Array must have a valid length!');
    });

    it('Should throw error for non-boolean validator return', () => {
        const numbers = [1, 2, 3];
        expect(() => validateAndCorrectArray(numbers, n => n, 0)).to.throw('elementValidator must return a boolean!');
    });
})