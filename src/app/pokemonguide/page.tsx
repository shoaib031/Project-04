"use client"
import React, { useState, useEffect } from 'react';
import './style.css';

const Page = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const getPokeData = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = `${url}${id}`;
    try {
      const response = await fetch(finalUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      generateCard(data);
    } catch (error) {
      setError('Error fetching Pokemon data');
    }
  };

  const generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    setPokemonData({
      hp,
      imgSrc,
      pokeName,
      statAttack,
      statDefense,
      statSpeed,
      types: data.types.map(type => type.type.name)
    });
  };

  const appendTypes = (types) => {
    return types.map((type, index) => (
      <span key={index}>{type}</span>
    ));
  };

  useEffect(() => {
    getPokeData();
  }, []);

  return (
    <div className={styles.container}>
      {error && <p>{error}</p>}
      <div id='card'>
        {pokemonData && (
          <>
            <p className='hp'>
              <span>HP</span>
              {pokemonData.hp}
            </p>
            <img src={pokemonData.imgSrc} alt={pokemonData.pokeName} />
            <h2 className='poke-name'>{pokemonData.pokeName}</h2>
            <div className='types'>
              {appendTypes(pokemonData.types)}
            </div>
            <div className='stats'>
              <div>
                <h3>{pokemonData.statAttack}</h3>
                <p>Attack</p>
              </div>
              <div>
                <h3>{pokemonData.statDefense}</h3>
                <p>Defense</p>
              </div>
              <div>
                <h3>{pokemonData.statSpeed}</h3>
                <p>Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
      <button id='btn' onClick={getPokeData}>Generate</button>
    </div>
  );
};

export default Page;
