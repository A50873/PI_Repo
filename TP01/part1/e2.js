import validateArrayElements from "./e1.js"

export default function validateAndCorrectArray(arr, elementValidator, defaultValue) {

    if(arr.length <= 0) {
        throw new Error("Array must have a valid length!");
    }

    if( typeof elementValidator(arr[0]) !== "boolean" ) {
        throw new Error("elementValidator must return a boolean!");
    }

    /*
    if( typeof defaultValue != typeof arr[0] ) {
        throw new Error("defaultValue must have the same type of arr!");
    }
    */

    const res = {
        correctedArray: [],
        invalidElements: []
    };

    let invalid_idx = 0;

    const temp = validateArrayElements(arr, elementValidator);

    for( let i = 0; i < temp.length; i++) {

        if( temp[i].isValid == true ){
            res.correctedArray[i] = temp[i].value;
        }
        else {
            res.correctedArray[i] = defaultValue;
            res.invalidElements[invalid_idx++] = temp[i].value;
        }
    }

    return res;
}

console.log("\n\nTesting validateAndCorrectArray:\n");

const numbers = [2, 3, 4, 5];

const result = validateAndCorrectArray(numbers, n => n % 2 === 0, 0);

console.log(result.correctedArray);  // [2, 0, 4, 0]
console.log(result.invalidElements); // [3, 5]


const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];

const defaultProduct = { name: "Unknown", category: "Misc" };

const resultProducts = validateAndCorrectArray(products, p => p.category.length > 0, defaultProduct);

console.log(resultProducts.correctedArray);
/*
[
 { "name:" "Laptop", category: "Electronics" },
 { "name:" "Unknown", category: "Misc" },
 { "name:" "Chair", category: "Furniture" }
]
*/

console.log(resultProducts.invalidElements);
/*
[
 { "name:" "Shirt", category: "" }
]
*/