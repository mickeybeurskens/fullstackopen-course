import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ShowCountryStats = (countryDetails) => {
  const languages = Object.values(countryDetails.languages)
  return <div>
    <h1>{countryDetails.name.common}</h1>
    <p>capital: {countryDetails.capital}</p>
    <p>population: {countryDetails.population}</p>
    <h2>languages</h2>
    <ul>
      {languages.map(lan => <li key={lan}>{lan}</li>)}
    </ul>
    <img src={countryDetails.flags.png} alt="Country flag"/>
  </div>
}

const ShowSearchResult = ({countries}) => {
  const [country, setCountry] = useState('')

  if (country != ''){
    return ShowCountryStats(country)
  }

  if (countries.length > 10){
    return <p>Too many matches, be more specific</p>
  } else if (countries.length > 1) {
    return countries.map(c => <p key={c.name.common}>
      {c.name.common}
      <button onClick={()=>setCountry(c)}>pick</button>
    </p>)
  } else if (countries.length === 1){
    return ShowCountryStats(countries[0])
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