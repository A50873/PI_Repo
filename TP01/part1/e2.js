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