"use client"
import React, { useState } from 'react';
import './style.css'
const RandomJokes = () => {
    const [joke, setJoke] = useState("Loading...");
    const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

    const getJoke = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setJoke(data.joke);
            })
            .catch(error => {
                console.error('Error fetching joke:', error);
                setJoke('Error fetching joke');
            });
    };

    return (
        <div className="wrapper">
            <span role="img" aria-label="laughing">&#128514;</span>
            <p id="joke" className="fade">{joke}</p>
            <button id="btn" onClick={getJoke}>Get Random Joke</button>
            <style jsx>{`
                .wrapper {
                    text-align: center;
                    margin-top: 50px;
                }

                #joke {
                    margin-top: 20px;
                }

                .fade {
                    transition: opacity 0.5s;
                    opacity: 1;
                }

                .fade.fadeout {
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}

export default RandomJokes;
