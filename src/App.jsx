import React, { useState, useEffect } from "react";
import logo from "./assets/img/Logo.svg";
import { Darkimg } from "./assets/img/Darkimg";
import { SpeenIcon } from "./assets/img/Speen";
import { TepratureIcon } from "./assets/img/teprature";
import { DavlenaIcon } from "./assets/img/davlena";
import img from "./assets/icon/Cloud.png";
import { SpeenImes } from "./assets/img/SpeenImg";
const apiKey = "8446a94aba159427c75b7e43ed594827";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        setError("Joylashuvni aniqlash imkoni bo'lmadi");
        setLoading(false);
      }
    );
  }, []);

  const updateBackground = (weather, currentTime) => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 18) {
      if (weather.includes("cloud")) {
        setBgImage("url('/images/day_cloudy.jpg')");
      } else if (weather.includes("rain")) {
        setBgImage("url('/images/day_rainy.jpg')");
      } else {
        setBgImage("url('/images/day_clear.jpg')");
      }
    } else {
      if (weather.includes("cloud")) {
        setBgImage("url('/images/night_cloudy.jpg')");
      } else if (weather.includes("rain")) {
        setBgImage("url('/images/night_rainy.jpg')");
      } else {
        setBgImage("url('/images/night_clear.jpg')");
      }
    }
  };

  useEffect(() => {
    if (location.lat && location.lon) {
      const getWeatherByCoords = async () => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Ob-havo ma'lumotlari topilmadi");
          }
          const data = await response.json();
          const filteredData = data.list.filter((reading) =>
            reading.dt_txt.includes("12:00:00")
          );
          setWeatherData(filteredData);
          setCity(data.city.name);
          updateBackground(filteredData[0].weather[0].description, new Date());
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      getWeatherByCoords();
    }
  }, [location]);

  const getWeatherByCity = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Shahar topilmadi");
      }
      const data = await response.json();
      const filteredData = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setWeatherData(filteredData);
      setCity(data.city.name);
      updateBackground(filteredData[0].weather[0].description, new Date());
      setError("");
    } catch (err) {
      setError(err.message);
      setWeatherData([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherByCity(city);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={` flex items-center justify-center bg-cover bg-center transition duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
      style={{
        backgroundImage: bgImage,
      }}
    >
      <div>
        <div className="flex items-center absolute right-[130px]">
          <div
            onClick={toggleDarkMode}
            className="absolute top-4 right-[220px] p-2 bg-opacity-50 hover:bg-opacity-75 text-white rounded"
          >
            <Darkimg />
          </div>

          <form onSubmit={handleSubmit} className="mb-4 mt-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className={` p-3 border bg-[#DAE9FF] placeholder:text-black ${
                darkMode
                  ? "bg-[#DAE9FF] text-black"
                  : "bg-transparent text-black"
              } rounded mb-4 outline-none `}
            />
          </form>
        </div>

        <div className="flex-1 p-4">
          <div className="flex  items-center gap-5 mb-5">
            <img src={logo} alt="logo" />
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              vue weather
            </h1>
          </div>

          <div className="flex flex-col mb-10 md:flex-row items-center justify-center gap-6">
            <div className="text-center">
              {loading ? (
                <p className="text-[30px]">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : weatherData.length > 0 ? (
                <div
                  className={`bg-white bg-opacity-55 backdrop-blur-md w-[400px] h-[300px] rounded-lg shadow-md 
                  ${
                    darkMode
                      ? "bg-black bg-opacity-80"
                      : "bg-white bg-opacity-55"
                  }`}
                >
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h2 className="text-5xl font-bold bg-gradient-to-r bg-[#4793ff] text-transparent bg-clip-text">
                        {weatherData[0].main.temp}°C
                      </h2>
                      <h3 className="text-[20px] font-normal mt-3 text-start">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </h3>
                    </div>
                    <img
                      className="w-[150px]"
                      src={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                    />
                  </div>
                  <p
                    className={`text-[25px] font-normal text-start p-6 mt-[-40px] bg-gradient-to-r ${
                      darkMode
                        ? "bg-[#fff] text-transparent"
                        : "bg-transparent text-black"
                    } bg-clip-text`}
                  >
                    City: {city}
                  </p>
                </div>
              ) : (
                <p className="text-xl">
                  Please enter a location or we are still detecting...
                </p>
              )}
            </div>

            {weatherData.length > 0 && (
              <div>
                <div>
                  <div
                    className={`p-10 bg-white bg-opacity-60 backdrop-blur-md w-[600px] h-[300px] rounded-lg shadow-md 
                  ${
                    darkMode
                      ? "bg-black bg-opacity-80"
                      : "bg-white bg-opacity-60"
                  }`}
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="flex mb-4 gap-12 items-center">
                      <div className="flex gap-3 items-center">
                        <div className="text-center mx-auto w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center">
                          <TepratureIcon />
                        </div>
                        <p>Temperature:</p>
                      </div>
                      <p
                        className={`text-[14px] font-normal bg-gradient-to-r bg-black text-transparent bg-clip-text ${
                          darkMode ? "text-white" : "text-[#000]"
                        }`}
                      >
                        {weatherData[0].main.temp} °C
                      </p>
                    </div>

                    <div className="flex mb-4 gap-12 items-center">
                      <div className="flex gap-3 items-center">
                        <div className="text-center mx-auto w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center">
                          <DavlenaIcon />
                        </div>
                        <p>Precipitation:</p>
                      </div>
                      <p
                        className={`text-[14px] font-normal bg-black bg-gradient-to- text-transparent bg-clip-text ${
                          darkMode ? "text-white" : "text-[#000]"
                        }`}
                      >
                        {weatherData[0].rain ? weatherData[0].rain["1h"] : 0} mm
                      </p>
                    </div>

                    <div className="flex mb-4 gap-[75px] items-center">
                      <div className="flex gap-3 items-center">
                        <div className="text-center mx-auto w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center">
                          <SpeenImes />
                        </div>
                        <p>Pressure:</p>
                      </div>
                      <p
                        className={`text-[14px] font-normal bg-gradient-to-r bg-black text-transparent bg-clip-text ${
                          darkMode ? "text-white" : "text-[#000]"
                        }`}
                      >
                        {weatherData[0].main.pressure} hPa
                      </p>
                    </div>

                    <div className="flex ml-[-10px] gap-[95px] items-center">
                      <div className="flex gap-1 items-center">
                        <SpeenIcon />
                        <p>Speed</p>
                      </div>
                      <p
                        className={`text-[14px] font-normal bg-gradient-to-r bg-black text-transparent bg-clip-text ${
                          darkMode ? "text-white" : "text-[#000]"
                        }`}
                      >
                        {weatherData[0].wind.speed} m/s
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {weatherData.map((weather, index) => (
              <div
                key={index}
                style={{ background: "rgba(71, 147, 255, 0.2)" }}
                className={`bg-opacity-55 backdrop-blur-md rounded p-6 flex flex-col text-start`}
              >
                <h6
                  className={`font-normal text-[16px] mb-2 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  {new Date(weather.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </h6>
                <h6
                  className={`text-[14px] ${
                    darkMode ? "text-white" : "text-[#000]"
                  }`}
                >
                  {new Date(weather.dt_txt).toLocaleDateString()}
                </h6>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="ml-[-30px]"
                />
                <p
                  className={`text-[18px] font-medium ${
                    darkMode ? "text-gray-200" : "text-black"
                  }`}
                >
                  {weather.main.temp}°C
                </p>
                <p
                  className={`text-[13px] mt-2 font-normal ${
                    darkMode ? "text-white" : "text-[#000]"
                  }`}
                >
                  {weather.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
