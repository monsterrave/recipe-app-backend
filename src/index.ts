import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req: express.Request, res: express.Response) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
  
    const results = await RecipeAPI.searchRecipes(searchTerm, page);
    return res.json(results);
});

app.get("/api/recipe/searchSummaryByRecipeId", async (req: express.Request, res: express.Response) => {
  const recipeId = req.query.recipeId as string;

  const results = await RecipeAPI.searchRecipeSummaryById(recipeId);
  return res.json(results);
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});