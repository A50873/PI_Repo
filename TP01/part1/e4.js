export default function checkItemsExist(validItems, key) {
  
  const validKeys = validItems.map(item => item[key]);  // extract the valid keys from the objects in validItems array

  return function(itemsToCheck) { 
    return itemsToCheck.every(item => validKeys.includes(item[key])); // check if every item in itemsToCheck has its key in validKeys
  };

}
