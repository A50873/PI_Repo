import validateArrayElements from "./e1.js"

export default function validateAndCorrectArray(arr, elementValidator, defaultValue) {

    if(arr.length <= 0) {
        throw new Error("Array must have a valid length!"); // tests if array is not empty
    }

    if( typeof elementValidator(arr[0]) !== "boolean" ) {
        throw new Error("elementValidator must return a boolean!"); // tests if elementValidator returns a boolean
    }

    if( typeof defaultValue != typeof arr[0] ) {
        throw new Error("defaultValue must have the same type of arr!"); // tests if defaultValue has the same type as the array elements
    }

    const res = {
        correctedArray: [],
        invalidElements: []
    };  // object to store the corrected array and invalid elements

    let invalid_idx = 0;    // index to track the position in invalidElements array

    const temp = validateArrayElements(arr, elementValidator);  // validate the array elements

    for( let i = 0; i < temp.length; i++) { // iterate through the validated results

        if( temp[i].isValid == true ){
            res.correctedArray[i] = temp[i].value;  // if valid, keep the original value
        }
        else {
            res.correctedArray[i] = defaultValue;   // if not valid, replace with defaultValue
            res.invalidElements[invalid_idx++] = temp[i].value; // store the invalid element
        }
    }

    return res;
}