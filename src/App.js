import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';

import './App.css';

const App = () => {
  
  const APP_ID = "b1b6d24d";

  const APP_KEY ="72d5a27ab8f62f432e9eae23806aeaf1";


const  [recipes, setRecipes] = useState([]);  
const [search, setSearch] = useState(""); 
const [query, setQuery] = useState("chiken");




    useEffect( () => {

        getRecipes();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const getRecipes = async () =>{
        const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${ APP_KEY}`); 

        const data = await response.json();
    setRecipes(data.hits);
    
    console.log(data.hits);
    }; 

const updateSearch= e => {

      setSearch(e.target.value);
    
};

const getSearch = e =>{

  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return(
    <div className ="App">

<h1 className="text"> select Reciepe</h1>
        <form 
        onSubmit={getSearch}
        className="search-form">
          <input 
          value={search}
           
           onChange={ updateSearch } 
           
           type="text" 
           
           className="search-bar"  />
          <button className="search-button" type="submit"> ;
          Search
          </button>

         
        </form>
<div className="recipes">

        {recipes.map(recipe => (
            <Recipe
            key ={recipe.recipe.label}
             title ={recipe.recipe.label} 
            calories ={recipe.recipe.calories}
            image ={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            
            />

        ))};
        </div>
    </div>

  );


}
export default App;
