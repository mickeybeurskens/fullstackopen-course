import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ShowSearchResult = ({countries}) => {
  if (countries.length > 10){
    return <p>Too many matches, be more specific</p>
  } else if (countries.length > 1) {
    return countries.map(c => <p key={c.name.common}>{c.name.common}</p>)
  } else if (countries.length === 1){
    const details = countries[0]
    const languages = Object.values(details.languages)
    return <div>
    <h1>{details.name.common}</h1>
    <p>capital: {details.capital}</p>
    <p>population: {details.population}</p>
    <h2>languages</h2>
    <ul>
      {languages.map(lan => <li key={lan}>{lan}</li>)}
    </ul>
    <img src={details.flags.png} alt="Country flag"/>
    </div>
  }
  return <p>No country found</p>
}

const App = () => {
  const [country, setCountry] = useState('')
  const [countryData, setAllCountries] = useState([])

  const getCountry = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(responce => setAllCountries(responce.data))
  }
  useEffect(getCountry, [])

  const changeCountry = (event) => setCountry(event.target.value)
  const getFilteredCountries = () => {
    if (country.length!==0){
      return countryData.filter((entry) =>  entry.name.common.match(country))
    } 
    return countryData
  }

  return <div>
    <p>Find countries: <input value={country} onChange={changeCountry}/></p>
    <ShowSearchResult countries={getFilteredCountries()}/>
  </div>
}

export default App