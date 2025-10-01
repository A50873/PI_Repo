export default function checkItemsExist(validItems, key) {
  
  const validKeys = validItems.map(item => item[key]);


  return function(itemsToCheck) { 
    return itemsToCheck.every(item => validKeys.includes(item[key]));
  };

}
