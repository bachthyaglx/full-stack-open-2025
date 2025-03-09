import CountryInfo from './CountryInfo'
import CountryButton from './CountryButton'

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        <span>Too many matches, specify another filter.</span>
      </div>
    )
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(i => <CountryButton country={i} />)}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map(i => (
          <CountryInfo key={i.tld} country={i} />
        ))}
      </div>
    )
  } else {
    return <></>;
  }
};

export default Countries