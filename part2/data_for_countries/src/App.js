import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ShowWeather = ({countries, weatherInfo}) => {
  if (countries.length === 1 && typeof weatherInfo.main !== 'undefined'){
    return <div>
      <h1>Weather in {countries[0].name.common}</h1>
      <p>temperature: {weatherInfo.main.temp}</p>
      <p>wind: {weatherInfo.wind.speed}</p>
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

const ShowSearchResult = ({countries, setSearchField, getWeather}) => {
  if (countries.length > 10){
    return <p>Too many matches, be more specific</p>
  } else if (countries.length > 1) {
    return countries.map(c => <p key={c.name.common}>
      {c.name.common}
      <button onClick={()=>setSearchField(c.name.common)}>pick</button>
    </p>)
  } else if (countries.length === 1){
    getWeather(countries[0].name.common)
    return ShowCountryStats(countries[0])
  }

  return <></>
}

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [countryData, setAllCountries] = useState([])
  const [weatherInfo, setWeatherInfo] = useState('')

  const getCountryData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(responce => setAllCountries(responce.data))
  }
  useEffect(getCountryData, [])

  const searchInput = (event) => setSearchField(event.target.value)
  const getWeatherInfo = (cityName) => {
    const APIKey = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
      .then(responce => setWeatherInfo(responce.data))
  }
  const getFilteredCountries = () => {
    if (searchField.length!==0){
      return countryData.filter((entry) =>  entry.name.common.match(searchField))
    } 
    return countryData
  }

  const getWeatherIfNew = (countryName) => {
    if (countryName !== weatherInfo.name){
      if (countryData.find(data => data.name.common === countryName)){
        getWeatherInfo(countryName)
      }
    }
  }

  return <div>
    <p>Find countries: <input value={searchField} onChange={searchInput}/></p>
    <ShowSearchResult countries={getFilteredCountries()} setSearchField={setSearchField} getWeather={getWeatherIfNew}/>
    <ShowWeather countries={getFilteredCountries()} weatherInfo={weatherInfo}/>
  </div>
}

export default App