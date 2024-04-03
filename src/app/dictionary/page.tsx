"use client"
import React, { useState, useEffect } from 'react';
import './style.css'
const Product = () => {
  const [inputWord, setInputWord] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchWord = async () => {
      if (inputWord.trim() !== '') {
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
          const jsonData = await response.json();
          setData(jsonData);
          setError(null);
        } catch (error) {
          setData([]);
          setError("Error fetching data from API");
        }
      }
    };

    searchWord();
  }, [inputWord]);

  const handlePlaySound = () => {
    if (data.length > 0 && data[0]?.phonetics && data[0]?.phonetics[0]) {
      console.log("data", data);
      const audioUrl = `https:${data[0].phonetics[0].audio}`;
      const audioElement = document.getElementById('sound') as HTMLAudioElement;
      if (audioElement) {
        audioElement.setAttribute('src', audioUrl);
        audioElement.play();
      }
    }
  };

  return (
    <>
      <audio id="sound"></audio>
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Type the word here.."
            id="inp-word"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
          <button id="search-btn" onClick={handlePlaySound}>Search</button>
        </div>
        <div className="result">
          {data.length > 0 && (
            <div className="word">
              <h3>{inputWord}</h3>
              <button onClick={handlePlaySound}>Play Sound</button>
            </div>
          )}
          {data.length > 0 && (
            <div className="details">
              <p>{data[0]?.meanings[0]?.partOfSpeech}</p>
              <p>/{data[0]?.phonetic}/</p>
            </div>
          )}
          {data.length > 0 && (
            <div>
              <p className="word-meaning">{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
              <p className="word-example">{data[0]?.meanings[0]?.definitions[0]?.example || ""}</p>
            </div>
          )}
          {error && <h3>{error}</h3>}
        </div>
      </div>
    </>
  );
}

export default Product;