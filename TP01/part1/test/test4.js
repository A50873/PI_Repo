import {expect} from 'chai';
import checkItemsExist from "../e4.js"

const validProducts = [
   { sku: "A123", name: "Laptop" },
   { sku: "B456", name: "Mouse" },
   { sku: "C789", name: "Keyboard" }
];

describe('Part 1 Exercise 4 Tests', () => {

    it('Basic Product SKU Check Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([{ sku: "A123" }, { sku: "B456" }])).to.be.true;
        expect(checkProducts([{ sku: "A123" }, { sku: "X999" }])).to.be.false;
    });

    it('Single Item Check Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([{ sku: "A123" }])).to.be.true;
        expect(checkProducts([{ sku: "X999" }])).to.be.false;
    });

    it('Empty Array Check Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([])).to.be.true; // every() returns true for empty arrays
    });

    it('All Valid Items Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([
            { sku: "A123" }, 
            { sku: "B456" }, 
            { sku: "C789" }
        ])).to.be.true;
    });

    it('User ID Check Test', () => {
        const validUsers = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" }
        ];
        const checkUsers = checkItemsExist(validUsers, "id");
        expect(checkUsers([{ id: 1 }, { id: 3 }])).to.be.true;
        expect(checkUsers([{ id: 1 }, { id: 999 }])).to.be.false;
    });

    it('String Key Check Test', () => {
        const validCategories = [
            { category: "electronics", description: "Tech items" },
            { category: "clothing", description: "Apparel" },
            { category: "books", description: "Literature" }
        ];
        const checkCategories = checkItemsExist(validCategories, "category");
        expect(checkCategories([
            { category: "electronics" }, 
            { category: "books" }
        ])).to.be.true;
        expect(checkCategories([
            { category: "electronics" }, 
            { category: "food" }
        ])).to.be.false;
    });

    it('Complex Object Check Test', () => {
        const validEmployees = [
            { empId: "EMP001", department: "IT", salary: 50000 },
            { empId: "EMP002", department: "HR", salary: 45000 },
            { empId: "EMP003", department: "Finance", salary: 55000 }
        ];
        const checkEmployees = checkItemsExist(validEmployees, "empId");
        expect(checkEmployees([
            { empId: "EMP001", department: "IT" },
            { empId: "EMP003", department: "Finance" }
        ])).to.be.true;
        expect(checkEmployees([
            { empId: "EMP001" },
            { empId: "EMP999" }
        ])).to.be.false;
    });

    it('Numeric Code Check Test', () => {
        const validCodes = [
            { code: 100, type: "A" },
            { code: 200, type: "B" },
            { code: 300, type: "C" }
        ];
        const checkCodes = checkItemsExist(validCodes, "code");
        expect(checkCodes([{ code: 100 }, { code: 300 }])).to.be.true;
        expect(checkCodes([{ code: 100 }, { code: 999 }])).to.be.false;
    });

    it('Mixed Valid and Invalid Items Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([
            { sku: "A123" },
            { sku: "INVALID" },
            { sku: "B456" }
        ])).to.be.false;
    });

    it('Duplicate Items Check Test', () => {
        const checkProducts = checkItemsExist(validProducts, "sku");
        expect(checkProducts([
            { sku: "A123" },
            { sku: "A123" },
            { sku: "B456" }
        ])).to.be.true; // Duplicates of valid items should still be valid
    });

    it('Different Key Property Test', () => {
        const validItems = [
            { identifier: "ID1", value: "Value1" },
            { identifier: "ID2", value: "Value2" },
            { identifier: "ID3", value: "Value3" }
        ];
        const checkByIdentifier = checkItemsExist(validItems, "identifier");
        expect(checkByIdentifier([
            { identifier: "ID1" },
            { identifier: "ID2" }
        ])).to.be.true;
        expect(checkByIdentifier([
            { identifier: "ID1" },
            { identifier: "INVALID_ID" }
        ])).to.be.false;
    });
})