import {expect} from 'chai';
import validateArrayElements from "../e1.js"

const numbers = [1, 2, 3, 4, 5, 6];

const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];

describe('Part 1 Exercise 1 Tests', () => {

    it('Number Test', () => {
        expect(validateArrayElements(numbers, n => n % 2 === 0)).to.deep.equal( [
            { value: 1, isValid: false },
            { value: 2, isValid: true },
            { value: 3, isValid: false },
            { value: 4, isValid: true },
            { value: 5, isValid: false }, 
            { value: 6, isValid: true }
        ]);
    });

    it('Product Test', () => {
        expect(validateArrayElements(products, p => p.category.length > 0)).to.deep.equal( [
            { value: { name: "Laptop", category: "Electronics" }, isValid: true },
            { value: { name: "Shirt", category: "" }, isValid: false },
            { value: { name: "Chair", category: "Furniture" }, isValid: true }
        ]);
    });

    it('Single Element Array Test', () => {
        const singleNumber = [42];
        expect(validateArrayElements(singleNumber, n => n > 40)).to.deep.equal([
            { value: 42, isValid: true }
        ]);
    });

    it('All Valid Elements Test', () => {
        const evenNumbers = [2, 4, 6, 8];
        expect(validateArrayElements(evenNumbers, n => n % 2 === 0)).to.deep.equal([
            { value: 2, isValid: true },
            { value: 4, isValid: true },
            { value: 6, isValid: true },
            { value: 8, isValid: true }
        ]);
    });

    it('All Invalid Elements Test', () => {
        const oddNumbers = [1, 3, 5, 7];
        expect(validateArrayElements(oddNumbers, n => n % 2 === 0)).to.deep.equal([
            { value: 1, isValid: false },
            { value: 3, isValid: false },
            { value: 5, isValid: false },
            { value: 7, isValid: false }
        ]);
    });

    it('String Array Test', () => {
        const words = ["hello", "world", "test", "javascript"];
        expect(validateArrayElements(words, str => str.length > 4)).to.deep.equal([
            { value: "hello", isValid: true },
            { value: "world", isValid: true },
            { value: "test", isValid: false },
            { value: "javascript", isValid: true }
        ]);
    });

    it('Mixed Data Types Test', () => {
        const mixedArray = [10, "hello", true, 5.5];
        expect(validateArrayElements(mixedArray, item => typeof item === 'number')).to.deep.equal([
            { value: 10, isValid: true },
            { value: "hello", isValid: false },
            { value: true, isValid: false },
            { value: 5.5, isValid: true }
        ]);
    });

    it('Complex Objects Test', () => {
        const users = [
            { name: "Alice", age: 25, active: true },
            { name: "Bob", age: 17, active: false },
            { name: "Charlie", age: 30, active: true },
            { name: "Diana", age: 22, active: false }
        ];
        expect(validateArrayElements(users, user => user.age >= 18 && user.active)).to.deep.equal([
            { value: { name: "Alice", age: 25, active: true }, isValid: true },
            { value: { name: "Bob", age: 17, active: false }, isValid: false },
            { value: { name: "Charlie", age: 30, active: true }, isValid: true },
            { value: { name: "Diana", age: 22, active: false }, isValid: false }
        ]);
    });

    it('Negative Numbers Test', () => {
        const negativeNumbers = [-5, -2, 0, 3, -1];
        expect(validateArrayElements(negativeNumbers, n => n < 0)).to.deep.equal([
            { value: -5, isValid: true },
            { value: -2, isValid: true },
            { value: 0, isValid: false },
            { value: 3, isValid: false },
            { value: -1, isValid: true }
        ]);
    });

    // Error handling tests
    it('Should throw error for empty array', () => {
        expect(() => validateArrayElements([], n => n > 0)).to.throw('Array must have a valid length!');
    });

    it('Should throw error for non-boolean validator return', () => {
        const numbers = [1, 2, 3];
        expect(() => validateArrayElements(numbers, n => n)).to.throw('elementValidator must return a boolean!');
    });

    it('Should throw error for validator returning string', () => {
        const numbers = [1, 2, 3];
        expect(() => validateArrayElements(numbers, n => "valid")).to.throw('elementValidator must return a boolean!');
    });

    it('Should throw error for validator returning number', () => {
        const numbers = [1, 2, 3];
        expect(() => validateArrayElements(numbers, n => n * 2)).to.throw('elementValidator must return a boolean!');
    });
})