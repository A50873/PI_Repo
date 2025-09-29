import {filterProperties, filterPropertiesN} from "../e1.js"


const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

const props = ['b', 'd', 'g', 'a']

const objs = [
   {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
   {x: 'Vision', y: false}
]


function main(){

    const filterResult = filterProperties(props, o)
    const filterNResult = filterPropertiesN(props, objs)

    console.log("\nfilterResult:", filterResult)
    console.log("\nfilterNResult:", filterNResult)
}


main()