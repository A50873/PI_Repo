import {expect} from 'chai';
import {filterProperties, filterPropertiesN} from "../../e1.js"


const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

const props = ['b', 'd', 'g', 'a']

const objs = [
   {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
   {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
   {x: 'Vision', y: false}
]



describe('Filter Test', () => {
    
    it('filter result test', () => {
        expect(filterProperties(props, o)).to.deep.equal( { a: 1, b: 'Thor', d: {x: 10} } );
      });
    
    it('filterN result test', () => {
        expect(filterPropertiesN(props, objs)).to.deep.equal( [
          {a: 1, b: 'Thor', d: {x: 10}},
          {b: 'Hulk', a: [1,2,3], d: {x: 10}, g: false}, 
          { }
          ] );
      });
    
    
});