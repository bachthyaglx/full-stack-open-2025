import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};


const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchCountry = async () => {
      try {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        console.log(`🔍 Fetching country: ${formattedName}`);

        // Try this new API endpoint
        const response = await axios.get(`https://restcountries.com/v3.1/name/${formattedName}`);

        console.log("API Response:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCountry({ found: true, data: response.data[0] });
        } else {
          setCountry({ found: false });
        }
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) return null;

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>🌍 {country.data.name.common}</h3>
      <div>🏛 Capital: {country.data.capital?.[0] || "N/A"}</div>
      <div>👥 Population: {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    console.log(`Searching for country: ${nameInput.value}`);
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
