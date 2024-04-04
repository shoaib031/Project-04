"use client"
import './style.css';
import React, { useState, useEffect } from 'react';

const Page = () => {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState<any>(null); // Set any as type for countryData
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const searchBtn = document.getElementById("search-btn");
        const countryInp = document.getElementById("country-inp") as HTMLInputElement; // Cast to HTMLInputElement

        const handleSearch = async () => {
            const name = countryInp.value.trim();

            if (!name) {
                setErrorMessage('Please enter a country name');
                return;
            }

            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${name}?fullText=true`
                );
                const data = await response.json();

                if (data && data.length > 0) {
                    setCountryData(data[0]);
                    setErrorMessage('');
                } else {
                    setCountryData(null);
                    setErrorMessage('Country not found');
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
                setErrorMessage('An error occurred while fetching data');
            }
        };

        if (searchBtn) { // Add null check for searchBtn
            searchBtn.addEventListener("click", handleSearch);
        }

        return () => {
            if (searchBtn) { // Add null check for searchBtn
                searchBtn.removeEventListener("click", handleSearch);
            }
        };
    }, []);

    return (
        <div className='container'>
            <div className="search-wrapper">
                <input
                    type='text'
                    id='country-inp'
                    placeholder='Enter a country name here'
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
                <button id='search-btn'>Search</button>
            </div>
            <div id='result'>
                {errorMessage && <p>{errorMessage}</p>}
                {countryData && (
                    <div>
                        <img src={countryData.flags.svg} className="flag-img" alt={`${countryData.name.common} flag`} />
                        <h2>{countryData.name.common}</h2>
                        <div className="wrapper">
                            <div className="data-wrapper">
                                <h4>Capital</h4>
                                <span>{countryData.capital[0]}</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="data-wrapper">
                                <h4>Continent:</h4>
                                <span>{countryData.continents[0]}</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="data-wrapper">
                                <h4>Population:</h4>
                                <span>{countryData.population}</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="data-wrapper">
                                <h4>Currencies:</h4>
                                <span>{countryData.currencies[Object.keys(countryData.currencies)[0]].name} - {Object.keys(countryData.currencies)[0]}</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="data-wrapper">
                                <h4>Common Language:</h4>
                                <span>{Object.values(countryData.languages).join(', ')}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
