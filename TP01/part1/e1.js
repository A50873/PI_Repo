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