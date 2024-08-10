import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    params: {
                        apiKey,
                        query: 'vegan',
                        number: 15
                    }
                });
                setRecipes(response.data.results);
                setLoading(false);
            } catch (error) {
                setError('Error fetching recipes');
                setLoading(false);
            }
        };
        
        fetchRecipes();
    }, [apiUrl, apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
