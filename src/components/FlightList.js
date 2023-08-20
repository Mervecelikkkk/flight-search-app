
import React from 'react';

const FlightList = () => {
  // Depolama: localStorage'dan uçuş bilgilerini al
  const flights = JSON.parse(localStorage.getItem('flights')) || [];

  return (
    <div>
      <h2>Flight List</h2>
      {flights.map((flight, index) => (
        <div key={index}>
          {/* flights list */}
       
          <p>Flight Number: {flight.flight.iata}{flight.flight.icao}</p>
          <p>Departure: {flight.departure.iata}</p>
          <p>Arrival: {flight.arrival.iata}</p>
          <p>Flight Status: {flight.flight_status}</p>
          <p>Departure Date: {flight.departure.estimated}</p> 
          <hr />
        </div>
      ))}
    </div>
  );
};

export default FlightList;
