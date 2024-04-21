const searchInStringProperties = (element: any, query: string): boolean => {
  try{
    if (typeof element === 'string')    
      return element.toLowerCase().includes(query)
    if (typeof element === 'object') {
      const properties = Object.getOwnPropertyNames(element).filter(property => typeof element[property] == 'string');
      return properties.some((property: string) => element[property].toLowerCase().includes(query))
    }
    return false
  }catch(err){
    return false
  } 
}

const filterElement = (element: any, attr: any): boolean => {
  try{
    const filteredProperties = Object.getOwnPropertyNames(attr)
    return filteredProperties.every((property: string) => element[property] !== undefined && element[property] === attr[property]);
  } catch(err){
    return false
  }
}

// TODO
const filterElementBasedDate = (element: any, attr: any): boolean => {
  try {
    return true
  } catch(err) {
    return false
  }
}

export {
  searchInStringProperties,
  filterElement,
  filterElementBasedDate,
}