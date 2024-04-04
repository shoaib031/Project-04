"use client"
import React, { useState } from 'react';
import './style.css';

const Page = () => {
    const [meal, setMeal] = useState(null);
    const [ingredientsVisible, setIngredientsVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setResult(<h3>Empty</h3>);
            return;
        }

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                const myMeal = data.meals ? data.meals[0] : null;
                if (myMeal) {
                    setMeal(myMeal);
                    const ingredients = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = myMeal[`strIngredient${i}`];
                        const measure = myMeal[`strMeasure${i}`];
                        if (ingredient && measure) {
                            ingredients.push(`${measure} ${ingredient}`);
                        } else {
                            break;
                        }
                    }
                    setResult(
                        <div className='container'>
                            <img src={myMeal.strMealThumb} alt={myMeal.strMeal} />
                            <div className="details">
                                <h2>{myMeal.strMeal}</h2>
                                <h4>{myMeal.strArea}</h4>
                            </div>
                            <div id="ingredients-con">
                                <ul>
                                    {ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div id="recipe">
                                <button onClick={() => setIngredientsVisible(false)}>X</button>
                                <pre id="instructions">{myMeal.strInstructions}</pre>
                            </div>
                        </div>
                    );
                } else {
                    setResult(<h3>No meal found</h3>);
                }
            })
            .catch(error => {
                setResult(<h3>Invalid</h3>);
            });
    };

    return (
        <div className='container'>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Type A Dish Name Here..'
                    id='user-inp'
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button id="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <div id="result">{result}</div>
        </div>
    );
};

export default Page;
