import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import FilterSearch from './components/FilterSearch'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);
      
  const countriesFilter = searchCountry === ""
    ? []
    : countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
  
  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value);
  }

  return (
    <div>
      <FilterSearch input={searchCountry} handleSearchCountry={handleSearchCountry} />
      <Countries countries={countriesFilter}/>
    </div>
  )
}

export default App