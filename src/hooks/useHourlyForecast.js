import { useState } from "react";
import { getHourlyForecast } from "../api/api";

export default function useHourlyForecast({ city, country, lang, lat, lon }) {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [data, setData] = useState({
    city_name: "",
    timezone: "",
    country_code: "",
    data: [{ app_max_temp: 0, app_min_temp: 0 }],
  });


  let fetchData = async () => {
    if (loading) {
      let res = await getHourlyForecast(city, country, lang);
      setData(res.data);
      setLoading(false);
    } else if (
      Number(data.lat).toFixed(0) !== lat.toFixed(0) &&
      Number(data.lon).toFixed(0) !== lon.toFixed(0)
    ) {
      setLoading(true);
      if (loading) {
        let res = await getHourlyForecast(city, country, lang);
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        } else {
          setError(res.status);
          setLoading(false);
        }
      }
    }
  };
  fetchData();
  return { loading, data, error };
}
