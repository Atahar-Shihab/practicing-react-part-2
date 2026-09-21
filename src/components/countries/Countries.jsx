// import React from 'react';
import { use } from 'react';
import Country from '../Country/Country';
import './Countries.css'
import { useState } from 'react';

import count_visited from '../Country/Country.jsx'
const Countries = ({ countriesPromise }) => {

    const [visitedCountries, setVisitedCountries] = useState(0);

    const handleVisitedCountries = (visitedCountries) => {
        setVisitedCountries(visitedCountries);
    }
const countriesData = use(countriesPromise);

const countries = countriesData.status === true ? countriesData.countries : "Failed to fetch countries data";

console.log(countries);
    return (
        <div >
            <h1>Total Countries: {countries.length}</h1>
            <br />
            <h1>Visited Countries: {visitedCountries}</h1>
            <div  id='countries'>
            {
                countries.map(country => <Country key={country.ccn3.ccn3} country={country} handleVisitedCountries={handleVisitedCountries}></Country>)
            }
            </div>
            
        </div>
    );
};


export default Countries;