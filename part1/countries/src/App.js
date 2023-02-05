import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchCountries = () => (
  axios
    .get("https://restcountries.com/v3/all")
)

const fetchWeather = (latitude, longitude) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const params = { lat: latitude, lon: longitude, appid: API_KEY }

  return axios
    .get("https://api.openweathermap.org/data/2.5/weather", { params: params })
}

const filterCountries = (countries, name) => (
  [...countries.filter(country => country.name.common.toLowerCase().startsWith(name.toLowerCase()))]
)

const Search = ({ countries, setFiltered }) => {
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setFiltered(filterCountries(countries, event.target.value))
  }

  return (
    <div>
      Country Name: <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const CountryListElement = ({ country, setFiltered: selectCountry }) => (
  <>
    {country.name.common}
    <button onClick={selectCountry}>show</button>
    <br/>
  </>
)

const Weather = ({ weather }) => (
  <>
    temperature is {weather.main.temp - 273} degrees celsius <br/>
    wind speed is {weather.wind.speed} m/s <br/>
  </>
)

const Country = ({ country }) => {
  const languages = Object.keys(country.languages).map(key=>country.languages[key])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    fetchWeather(country.latlng[0], country.latlng[1])
      .then(response => {
        setWeather(response.data)
        console.log(Object.keys(response.data).length)
      })
  }, [country])

  return (
    <>
      <h1>{country.name.common}</h1>
      Capital: {country.capital[0]}<br/>
      Area: {country.area}<br/>
      <h2>Languages:</h2>
      <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags[1]} alt={country.name.common}/>
      <h2>Weather in {country.capital[0]}</h2>
      { Object.keys(weather).length === 0 ?
        <>No weather data available.</> :
        <Weather weather={weather} />
      }
    </>
  )
}

const Countries = ({ countries, setFiltered }) => {
  if (countries.length === 0) 
    return <p>No countries match this search.</p>

  if (countries.length > 10) 
    return <p>Too many countries. Narrow your search</p>
      
  if (countries.length === 1) 
    return countries.map((country, i) => <Country key={i} country={country} />) 

  return countries.map((country, i) => (
    <CountryListElement 
      key={i} 
      country={country} 
      selectCountry={() => setFiltered([country])}
    />
  ))
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetchCountries()
      .then(response => {
        setCountries(response.data)
        setFiltered(response.data)
      })
  }, [])

  return (
    <div>
      <Search countries={countries} setFiltered={setFiltered}/>
      <Countries countries={filtered} setFiltered={setFiltered}/>
    </div>
  )
}

export default App
