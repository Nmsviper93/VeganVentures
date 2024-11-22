import "./App.css";
import { FormEvent, useEffect, useRef, useState } from 'react';
import * as api from './api';
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModel from "./components/RecipeModel";
import { AiOutlineSearch } from "react-icons/ai";

// type for different tabs in app
type Tabs = "search" | 'favorites';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe| undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  // useRef to keep track of current page for paginated search results
  const pageNumber = useRef(1);


  // effect hook to fetch favorite recipes when app is mounted
  useEffect(() => {
    const fetchFavoriteRecipes = async() => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteRecipes();
    // empty dependecy array ensures only one run after first render
  }, []);


  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      // call API to search recipes with given term, set results in state, reset page to 1
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };


  const handleViewMoreClick = async () => {
    // increment page number
    const nextPage = pageNumber.current + 1;
    try {
      // fetch next page of recipes and append new recipes to existing list
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage)
      setRecipes([...recipes, ...nextRecipes.results])
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };


  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      // call API to add recipe to favorites
      await api.addFavoriteRecipe(recipe);
      // add recipe to local favorites state
      setFavoriteRecipes([...favoriteRecipes, recipe])
    } catch (error) {
      console.log(error);
    }
  };


  const removeFavoriteRecipe = async(recipe: Recipe) => {
    try {
      // call the API to remove recipe from favorites
      await api.removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter(
        // filter out recipe from local favorites
        (favRecipe) => recipe.id !== favRecipe.id
      );
      // update state with new list of favorites
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };


  return(
    <div className="app-container">
      <div className="header">
        <img src="/food.jpg"></img>
        <div className="title">Vegan Ventures</div>
      </div>
      <div className="tabs">
        <h1 
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        > 
          Recipe Search
        </h1>
        <h1 
          className={selectedTab === "favorites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favorites")}
          > 
            Favorites
          </h1>
      </div>

      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input 
              type="text" 
              required 
              placeholder="Enter a search term..."
              value={searchTerm}
              onChange={(event)=> setSearchTerm(event.target.value)}
          ></input>
          <button type="submit"><AiOutlineSearch size={40}/>Submit</button>
          </form>
        
        <div className="recipe-grid">
        {/* render each recipe card */}
        {recipes.map((recipe) => {
          const isFavorite = favoriteRecipes.some(
            // check if recipe is in favorites
            (favRecipe) => recipe.id === favRecipe.id
          );

          return (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteButtonClick={
                isFavorite ? removeFavoriteRecipe : addFavoriteRecipe} 
              isFavorite={isFavorite}
            />
          );
        })}
        </div>
        
          <button 
            className="view-more-button" onClick={handleViewMoreClick}>
              View More
          </button>
      </>)}
      
      {selectedTab === "favorites" && (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard 
              recipe={recipe} 
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteButtonClick={removeFavoriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {/* display RecipeModel componenet if recipe is selected */}
      {selectedRecipe ? (
        <RecipeModel 
          recipeId={selectedRecipe.id.toString()} 
          onClose={()=> setSelectedRecipe(undefined)}
        /> 
      ) : null}
       

    </div>
  );
};

export default App;
