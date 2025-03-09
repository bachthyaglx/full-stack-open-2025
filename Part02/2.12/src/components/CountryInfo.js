const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>Capital: {country.capital}</div>
    <div>Area: {country.area}</div>
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
  </div>
)

export default CountryInfo