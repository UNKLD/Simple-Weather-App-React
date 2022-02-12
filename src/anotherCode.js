import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    ifClicked();
  }, []);

  async function ifClicked() {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=6f29b335b91ab50b166193a109b60c43&units=metric`
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (error) {
      alert("OOPS, someting went wrong");
      console.log(error);
    }

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${locations}&client_id=dtWfpSQIjfK1LeekqsEA_Gz_w7OWfVxwOheNYgVneHw`
      );
      const data = res.ok && (await res.json());
      setPhotos(data?.results[0]?.urls?.raw);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={() => ifClicked()}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}
