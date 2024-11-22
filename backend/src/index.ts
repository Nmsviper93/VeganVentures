import express from 'express';
import cors from 'cors';
import "dotenv/config";
import * as RecipeAPI from './recipe_api';
import {PrismaClient} from "@prisma/client";

const app = express();
const prismaClient = new PrismaClient();

// middleware to parse JSON and enable CORS
app.use(express.json())
app.use(cors())

// endpoint to search for recipes, querying by search term and page number
app.get("/api/recipes/search", async (req, res) => {
    // extract query params from request
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);

    try {
        // call external API to search for recipes
        const results = RecipeAPI.searchRecipes(searchTerm, page);
        return res.json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error fetching recipes" });
    }
});

// endpoint to fetch detailed summary for specific recipe by its ID
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    // extract recipe ID from URL params
    const recipeId = req.params.recipeId;

    try {
        // call external API to get recipe summary
        const results = await RecipeAPI.getRecipeSummary(recipeId);
        return res.json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error fetching recipe summary" });
    }
})

// endpoint to add recipe to user's favorites
app.post("/api/recipes/favorite", async (req, res) =>{
    // extract recipe ID from request body
    const recipeId = req.body.recipeId;

    try {
        // use Prisma to create new favorite recipe entry in database
        const favoriteRecipe = await prismaClient.favoriteRecipes.create({
            data: {
                // save recipe ID in favorites table
                recipeId: recipeId
            }
        })
        // return created favorite recipe as a response
        return res.status(201).json(favoriteRecipe)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"})
    }
});

// endpoint to fetch all the user's favorite recipes
app.get("/api/recipes/favorite", async (req, res) => {
    try {
        // use Prisma to retrieve all favorite recipes from database
        const recipes = await prismaClient.favoriteRecipes.findMany();
        // extract recipe IDs as strings
        const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

        // call external API to fetch detailed information about favorite recipes
        const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);

        return res.json(favorites);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error fetching favorite recipes" });
    }
});

// endpoint to remove recipe from user's favorites
app.delete('/api/recipes/favorite', async (req, res) => {
    // extract recipe ID from request body
    const recipeId = req.body.recipeId;

    try {
        // use Prisma to delete favorite recipe entry from database
        await prismaClient.favoriteRecipes.delete ({
            where: {
                // specify the recipe ID to delete
                recipeId: recipeId
            }
        });
        // return 204 status code (no content) to indicate successful deletion
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error removing favorite recipe" });
    }
});


app.listen(5001, () => {
    console.log("server running on localhost 5000")
});