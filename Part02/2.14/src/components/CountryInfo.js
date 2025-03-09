import WeatherData from "./WeatherData"

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h3>languages:</h3>
    <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
    </ul>
    <img
      src={country.flags.svg}
      width="100px"
      height="100px"
      alt={`Flag of ${country.name.common}`}
    />
    <WeatherData city={country.capital} />
  </div>
)

export default CountryInfo