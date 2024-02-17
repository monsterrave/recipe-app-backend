import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY as string;

export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  const url = new URL(baseURL);
  
  const queryParams = {
    apiKey: API_KEY,
    query: searchTerm,
    number: 10,
    offset: (page - 1) * 10,
  };

  let offset = Number(queryParams.offset);
  if (isNaN(offset)) {
    offset = 0;
  }

  let params = new URLSearchParams({
    apiKey: queryParams.apiKey,
    query: queryParams.query,
    number: queryParams.number.toString(),
    offset: offset.toString()
  });

  url.search = params.toString();

  try {
    const searchRecipesResponse = await fetch(url.toString());
    const resultsJson = await searchRecipesResponse.json();
    return resultsJson;
  } catch (error) {
    console.error(error);
  }
};

export const searchRecipeSummaryById = async (recipeId: string) => {
  const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/summary`;
  const url = new URL(baseURL);

  const queryParams = {
    apiKey: API_KEY,
  };

  let params = new URLSearchParams({
    apiKey: queryParams.apiKey,
  });
  
  url.search = params.toString();

  try {
    const searchRecipeSummaryByIdResponse = await fetch(url.toString());
    const resultsJson = await searchRecipeSummaryByIdResponse.json();
    return resultsJson;
  } catch (error) {
    console.error(error);
  }
}
  