import axios from 'axios';
import { useState, useEffect } from 'react';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const apiCountry = async() => {
    try {
        const response = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  const apiState = async(selectedCountry) => {
    try {
        if(selectedCountry) {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
            setStates(response.data);
        }
    } catch (error) {
        console.error(error);
    }
  }

  const apiCity = async(selectedCountry ,selectedState) => {
    try {
        if(selectedState) {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            setCities(response.data);
        }
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    apiCountry();
    apiState(selectedCountry);
    apiCity(selectedCountry, selectedState);
  }, [selectedCountry, selectedState]);

  return (
    <div>
        <div>
            <h1>Select Location</h1>
        </div>
        <div>
            <label htmlFor="country-select">Select Country:</label>
            <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                <option value="">Select Country</option>
                {countries.map((country) => (
                <option key={country} value={country}>
                    {country}
                </option>
                ))}
            </select>

            <label htmlFor="state-select">Select State:</label>
            <select
                id="state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
            >
                <option value="">Select State</option>
                {states.map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
                ))}
            </select>

            <label htmlFor="city-select">Select City:</label>
            <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
            >
                <option value="">Select City</option>
                {cities.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
                ))}
            </select>

            <div>
                {selectedCountry && selectedCity && selectedCity && (
                    <div>You selected {selectedCity}, {selectedState}, {selectedCountry}</div> )}
            </div>
        </div>
    </div>
  );
}