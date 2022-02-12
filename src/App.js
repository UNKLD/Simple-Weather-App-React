import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [locations, setLocations] = useState("dubai");
  const [weatherData, setWeatherData] = useState([]);
  const [photos, setPhotos] = useState([]);

  const weather = async () => {
    // Fetching weather Data from openweather.org
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID={API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeatherData(await data);
    } catch (error) {
      console.log(error);
    }
    //Fetching location Image from unsplash.com
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${locations}&client_id={API_KEY}`
      );
      const data = res.ok && (await res.json());
      setPhotos(data?.results[0]?.urls?.raw);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    weather();
  };

  useEffect(() => {
    weather();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <header className="App-header">
        <div className="findCity">
          <input
            type="text"
            required
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
          />
          <button onClick={handleClick}>Submit</button>
        </div>
        {weatherData && weatherData.weather && (
          <div className="card">
            <div className="card-img">
              <img height={200} width={300} src={photos} alt={photos.toString()} />
            </div>
            <div className="card-info">
              <div>
                <p>City : {weatherData.name}</p>
                <p>Weather : {weatherData.weather[0].description}</p>
                <p>
                  Temprature : {weatherData.main.temp} <span>&#176;</span>C
                </p>
              </div>
            </div>
            <div className="card-icon">
              {/* Weather icon fom openweather.org */}
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                width={200}
                height={200}
                alt={weatherData.weather[0].description}
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
