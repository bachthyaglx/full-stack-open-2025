import { useState } from 'react'
import CountryInfo from './CountryInfo'

const CountryButton = ({country}) => {
    const [display, setDisplay] = useState(false)
    const handleButtonClick = () => setDisplay(!display)

    if (display) {
        return (
          <div>
            {country.name.common} {" "}
            <button onClick={handleButtonClick}>{display ? "Hide" : "Show"}</button>
            <CountryInfo country={country} />
          </div>
        )
    }
    
    return (
      <div>
        {country.name.common} {" "}
        <button onClick={handleButtonClick}>{display ? "Hide" : "Show"}</button>
      </div>
    )
}

export default CountryButton