"use client"

import React, { useState, useEffect } from 'react';
import './style.css'
const Contact = () => {
  const [quote, setQuote] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, non?");
  const [author, setAuthor] = useState("lorem ipsum");

  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <p id="quote">{quote}</p>
        <h3 id="author">{author}</h3>
        <button id="btn" onClick={getQuote}>Get Quote</button>
      </div>
    </div>
  );
};

export default Contact;
