import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine(props) {
  let [temperature, setTemperature] = useState(null);
  let [location, setLocation] = useState(" ");
  let [humidity, setHumidity] = useState(" ");
  let [wind, setWind] = useState(" ");
  let [icon, setIcon] = useState(" ");
  let [message, setMessage] = useState("");

  function ShowWeather(response) {
    setWind(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setTemperature(response.data.main.temp);
    setIcon(response.data.weather[3].icon);
    setMessage(
      <div className="message">
        <div>{response.data.name}</div>
        <div> temperature: {Math.round(response.data.main.temp)}</div>
        <div> humidity: {response.data.main.humidity}%</div>
        <div> wind: {Math.round(response.data.wind.speed)}km/h</div>
        <img
          src={`http://openweathermap.org/img/wn/${response.data.weather[3].icon}@2x.png`}
        />
      </div>
    );
  }

  let ApiKey = `18a1ec75f53ba1a0a864da5b6480a3f8`;
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(ShowWeather);

  function HandleSubmit(event) {
    event.preventDefault();
    if (location.length > 1) {
      setMessage(
        <h1>
          The temperature in {location} is {Math.round(temperature)}°C
        </h1>
      );
    } else {
      return <p>Fetching data...</p>;
    }
  }

  function DisplayInput(event) {
    setLocation(event.target.value);
  }
  return (
    <div className="SearchEngine">
      <h1>Search engine</h1>
      <form onClick={HandleSubmit}>
        <input type="search" onChange={DisplayInput} />
        <input type="submit" value="Search" />
      </form>
      <h2> {message} </h2>
    </div>
  );
}
