import { useState , useEffect} from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch countries from API
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setLoadingCountries(false);
      })
      .catch(error => console.error('Error fetching countries:', error));
  };

  // Fetch states of selected country
  const getStates = (countryName) => {
    setLoadingStates(true);
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
      .then(response => response.json())
      .then(data => {
        setStates(data);
        setSelectedState('');
        setSelectedCity('');
        setLoadingStates(false);
      })
      .catch(error => console.error('Error fetching states:', error));
  };

  // Fetch cities of selected state
  const getCities = (stateName) => {
    setLoadingCities(true);
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`)
      .then(response => response.json())
      .then(data => {
        setCities(data);
        setSelectedCity('');
        setLoadingCities(false);
      })
      .catch(error => console.error('Error fetching cities:', error));
  };

  // Handle selection changes
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    getStates(countryName);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    getCities(stateName);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h2>Location Selector</h2>
      <select value={selectedCountry} onChange={handleCountryChange} disabled={loadingCountries}>
        <option value="" disabled={loadingCountries}>Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select value={selectedState} onChange={handleStateChange} disabled={loadingStates || !selectedCountry}>
        <option value="" disabled={loadingStates}>Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={handleCityChange} disabled={loadingCities || !selectedState}>
        <option value="" disabled={loadingCities}>Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <p>{selectedCity && `You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
    </div>
  );
}
export default App
