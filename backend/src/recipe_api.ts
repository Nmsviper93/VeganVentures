const apiKey = process.env.API_KEY;

// search recipes based on search term and specific page
export const searchRecipes = async (searchTerm: string, page: number) => {
    if(!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch?")

    // define query params for API request
    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    };

    // convert query params to URL query string
    url.search = new URLSearchParams(queryParams).toString()

    try {
    //   send request to API and wait for response
      const searchResponse = await fetch(url);
    //   parse response body as JSON
      const resultsJson = await searchResponse.json();
      return resultsJson;
    } catch (error) {
        console.log(error);
    }
};

// fetch a detailed summary of specific recipe by its ID
export const getRecipeSummary = async (recipeId: string) => {
    if(!apiKey) {
        throw new Error("API Key not found");
    }

    // construct URL for recipe summary API endpoint using provided recipe ID
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);

    const params = {
        apiKey: apiKey,
    };

    // append query params to URL
    url.search = new URLSearchParams(params).toString();

    // send request to the API and wait for response
    const response = await fetch(url);
    // parse response body as JSON
    const json = await response.json();

    return json;
};

// fetch detailed information about multiple recipes by IDs
export const getFavoriteRecipesByIDs = async(ids: string[]) => {
    if(!apiKey) {
        throw new Error("API Key not found");
    }

    // construct URL for bulk recipe information API endpoint
    const url = new URL('https://api.spoonacular.com/recipes/informationBulk')

    // define query params (API key and comma-separated list of recipe IDs)
    const params = {
        apiKey: apiKey,
        ids: ids.join(",")
    }
    
    // append query params to URL
    url.search = new URLSearchParams(params).toString();

    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    return { results: json };
};
