export default function validateArrayElements(arr, elementValidator) {

    if(arr.length <= 0) {
        throw new Error("Array must have a valid length!");
    }

    if( typeof elementValidator(arr[0]) !== "boolean" ) {
        throw new Error("elementValidator must return a boolean!");
    }

    const res = [];

    for (let i = 0; i < arr.length; i++) {
        res[i] = {
            value: arr[i],
            isValid: elementValidator(arr[i])
        };
    }

    return res;
}

console.log("\n\nTesting validateArrayElements:\n");

const numbers = [2, 3, 4, 5];
console.log(validateArrayElements(numbers, n => n % 2 === 0));
/*
[
 { value: 2, isValid: true },
 { value: 3, isValid: false },
 { value: 4, isValid: true },
 { value: 5, isValid: false }
]
*/

const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];
console.log(validateArrayElements(products, p => p.category.length > 0));
/*
[
 { value: { "name:" "Laptop", category: "Electronics" }, isValid: true },
 { value: { "name:" "Shirt", category: "" }, isValid: false },
 { value: { "name:" "Chair", category: "Furniture" }, isValid: true }
]
*/