export default function validateArrayElements(arr, elementValidator) {

    if(arr.length <= 0) {
        throw new Error("Array must have a valid length!"); // tests if array is not empty
    }

    if( typeof elementValidator(arr[0]) !== "boolean" ) {
        throw new Error("elementValidator must return a boolean!"); // tests if elementValidator returns a boolean
    }

    const res = []; // array to store the results

    for (let i = 0; i < arr.length; i++) {  // iterates through the input array
        res[i] = {
            value: arr[i],
            isValid: elementValidator(arr[i])
        };  // applies the elementValidator function to each element and stores the result
    }

    return res; // returns the array of results
}