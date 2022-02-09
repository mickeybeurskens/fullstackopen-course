import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ShowWeather = ({countries}) => {
  if (countries.length === 1){
    return <div>
      <h1>Weather in {countries[0].name.common}</h1>
    </div>
  }
  return <></>
}

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

const ShowSearchResult = ({countries, setSearchField}) => {
  if (countries.length > 10){
    return <p>Too many matches, be more specific</p>
  } else if (countries.length > 1) {
    return countries.map(c => <p key={c.name.common}>
      {c.name.common}
      <button onClick={()=>setSearchField(c.name.common)}>pick</button>
    </p>)
  } else if (countries.length === 1){
    return ShowCountryStats(countries[0])
  }

  return <p>No country found</p>
}

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [countryData, setAllCountries] = useState([])

  const getCountry = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(responce => setAllCountries(responce.data))
  }
  useEffect(getCountry, [])

  const searchInput = (event) => setSearchField(event.target.value)
  const getFilteredCountries = () => {
    if (searchField.length!==0){
      return countryData.filter((entry) =>  entry.name.common.match(searchField))
    } 
    return countryData
  }

  return <div>
    <p>Find countries: <input value={searchField} onChange={searchInput}/></p>
    <ShowSearchResult countries={getFilteredCountries()} setSearchField={setSearchField}/>
    <ShowWeather countries={getFilteredCountries()}/>
  </div>
}

export default App