import React from 'react';
import './Country.css'

import {useState} from 'react';
let count_visited = 0;
const Country = ({ country,handleVisitedCountries }) => {
    const handleVisited = () =>
        {
            if(!visited){
            count_visited++;
            }
            else if(visited){
                count_visited--;
            }
            setVisited(!visited)
            handleVisitedCountries(count_visited);
            
    
        
    }

      const [visited,setVisited] = useState(false);
    if(country.name.common !== "Israel"){

    return (
        <div className={`country1 ${visited ? "country-visited" : "country1"}`}>
            <h3>Country Name: {country.name.common === "Israel"? "Avoid" : country.name.common} </h3>
        <img src={country.name.common === "Israel"? "Avoid" : country.flags.flags.png} alt={country.flags.flags.alt} />
        <p>Population: {country.name.common === "Israel"? "Avoid":country.population.population}</p>
        <p>Region: {country.region.region}</p>
        <h3>Country Code: {country.ccn3.ccn3}</h3>
        <p>Capital: {country.capital.capital}</p>
        <p>Area: {country.area.area} sq km</p>

        <button  className={visited ? "country-visited" : "not-visited"} onClick={handleVisited}>{visited ? "visited" :"Not Visited"}</button>
        </div>
    );}
};
export default Country;