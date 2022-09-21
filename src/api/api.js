import axios from "axios";

const getCurrent = async (city, country, lang) => {
  let data = await axios.get(
    `http://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&lang=${lang}&key=${process.env.REACT_APP_API_KEY}&units=M`
  );
  return data.data;
};

const getCurrentByLatAndLon = async (lat, lon, lang) => {
  let data = await axios.get(
    `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&lang=${lang}&key=${process.env.REACT_APP_API_KEY}&units=M`
  );
  return data.data;
};

const getDailyForecast = async (city, country, lang) => {
  let data = await axios.get(
    `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&lang=${lang}&key=${process.env.REACT_APP_API_KEY}&units=M`
  );
  return data.data;
};

const getHourlyForecast = async (city, country, lang) => {
  let data = await axios.get(
    `http://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&country=${country}&lang=${lang}&key=${process.env.REACT_APP_API_KEY}&units=M`
  );
  return data;
};

const getAlerts = async (lat, lon, lang) => {
  let data = await axios.get(
    `http://api.weatherbit.io/v2.0//alerts?lat=${lat}&lon=${lon}&lang=${lang}&key=${process.env.REACT_APP_API_KEY}&units=M`
  );
  return data.data;
};

const getLocation = async () => {
  let data = await axios.get(
    `https://api.bigdatacloud.net/data/ip-geolocation?localityLanguage=en&key=${process.env.REACT_APP_API_IP_KEY}`
  );
  return data.data;
};


export { getLocation,getCurrentByLatAndLon, getAlerts, getCurrent, getDailyForecast, getHourlyForecast };
