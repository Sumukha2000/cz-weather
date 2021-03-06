import React from 'react';
import { useState } from 'react';
import "./home.css"

const api = {
    key: "eecc5a874c113843214c7087bf907f6a",
    base: "https://api.openweathermap.org/data/2.5/",
}
function Home() {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setQuery('');
                    setWeather(result);
                    console.log(weather);
                });
        }

    }
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ?
            "home-warm" : "home") : "home"} >
            <main>
                <div className="welcome">
                    Welcome to Z-Weather App! 
                    </div>
                <div className="search-box">
                  
                    <input type="search"
                        className="search-bar"
                        placeholder="Search for the location..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search }
                        />

          
                </div>
                {(typeof weather.main != "undefined" )?(
                <div>
                <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country }</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>

                <div className="weather-box">
                            <div className="temp">{ weather.main.temp }<span >&#176;</span>c</div>
                            <div className="weather">
                                
                                <p>{weather.weather[0].description}</p>
                              
                                </div>
                    </div>
                </div>
                ):('')}
            </main>
            

       
       
      </div>
    );
}

export default Home;
