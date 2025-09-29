//console.log("\nStarting first part... \n")

const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

const props = ['b', 'd', 'g', 'a']

export function filterProperties (propNames, obj) {

    const r = {}

    for (let o in obj) {
        
        for (let p in propNames) {

            if(propNames[p] == o) {
                //console.log(propNames[p] + " found!")
                r[o] = obj[o]
            }
        }
    }

    return r
}

/*
const oFiltered = filterProperties(props, o)

console.log("\noFiltered:", oFiltered);

// oFiltered: {a: 1, b: 'Thor', d: {x: 10}}
*/


//console.log("\nStarting first part with reduce()...\n")

function filterProperties_reduce(propNames, obj) {

  return propNames.reduce((acc, prop) => {

    if (prop in obj) {
      //console.log(prop + " found!")
      acc[prop] = obj[prop]
    }

    return acc

  }, {})
}

/*
//Using this version of the function, the prints are ordered and the 
// original array remains unchanged so it can be used again

function filterProperties_reduce(propNames, obj) {
  return propNames
    .slice()                // copy so we don’t mutate the original
    .sort()                 // alphabetical order
    .reduce((acc, prop) => {
      if (prop in obj) {
        console.log(prop + " found!")
        acc[prop] = obj[prop]
      }
      return acc
    }, {})
}
*/

/*
const oFiltered_reduce = filterProperties_reduce(props, o)

console.log("\noFiltered_reduce:", oFiltered_reduce)
*/




//console.log("\nStarting second part...\n")


const objs = [
   {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
   {x: 'Vision', y: false}
]

export function filterPropertiesN(propNames,objs) {

    const obj_filt = objs.map(objs => filterProperties(props, objs))

    return obj_filt

}

/*
const objsFiltered = filterPropertiesN(props, objs)

console.log("\nobjsFiltered:", objsFiltered)
*/

/*
 objsFiltered: [
   {a: 1, b: 'Thor', d: {x: 10}},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, g: false}, 
   { }
*/

