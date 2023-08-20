// src/components/SearchForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchForm.css';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import FlightList from './FlightList';
import ReactDOM from 'react-dom';

const API_KEY = '8583a34440e6a3be7516a98563dbe7aa';
const API_URL = 'http://api.aviationstack.com/v1/flights';

const SearchForm = () => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [oneWay, setOneWay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);


  const handleSearch = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(API_URL, {
        params: {
          access_key: API_KEY,
          dep_iata: departureAirport,
          arr_iata: arrivalAirport,
          flight_date: departureDate, 
          return_flight_date: arrivalDate, 
        },
      });

      setFlights(response.data.data);

      // Save local storage flights infos
      localStorage.setItem('flights', JSON.stringify(response.data.data));

      setLoading(false);

    // FlightList bileşenini render etmek için
    ReactDOM.render(<FlightList />, document.getElementById('flight-list'));
    setLoading(false);
  } catch (error) {
    setError('An error occurred while fetching flights.');
    setLoading(false);
  }
};


  return (
    <div className="container-flight-search">
      <div className="input-container">
        <div>
          <FaPlaneDeparture className="icon" />
          <input type="text" placeholder="Departure Airport" value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
        </div>
        <div>
          <FaPlaneArrival className="icon" />
          <input type="text" placeholder="Arrival Airport" value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} />
        </div>
      </div>
      <input className="date-input" type="date" placeholder="Departure Date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
      {!oneWay && <input className="date-input" type="date" placeholder="Arrival Date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />}
      <label className="checkbox-label">
        <input type="checkbox" checked={oneWay} onChange={() => setOneWay(!oneWay)} />
        One-way
      </label>
      <button className="button" onClick={handleSearch}>Search</button>
      <div id="flight-list"></div> {/* FlightList bileşenini render etmek için */}
    
    </div>
  );
};

export default SearchForm;


