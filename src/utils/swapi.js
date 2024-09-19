
export async function httpFetchRoot() {
    try {
        const response = await fetch(`https://swapi.dev/api/`);
        const list = await response.json();
        return list;
    } catch(err) {
        console.log('[swapi]',{err})
        return err
    }
}

export async function httpFetchCategory(listName) {
    const fetchCategoryData = async (endpoint, categoryData=[]) => {
      const response = await fetch(endpoint);
      const { results, count, next } = await response.json();
      categoryData.push(...results);
      if (count > categoryData.length) {
        await fetchCategoryData(next, categoryData);
      }
      return categoryData;
    }    

    try {
        return await fetchCategoryData(`https://swapi.dev/api/${listName}`);
    } catch(err) {
        console.log('[swapi]',{err})
        return err
    } 
}