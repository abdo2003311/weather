import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getDailyForecast } from "../api/api";

export default function useDailyForecast({ city, country, lang, lat, lon }) {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState({
    city_name: "",
    timezone: "",
    country_code: "",
    data: [{ app_max_temp: 0, app_min_temp: 0 }],
  });
  let { i18n } = useTranslation();
  if (i18n.language !== localStorage.getItem("lang")) {
    localStorage.setItem('lang', i18n.language);
    setLoading(true);
  }
  let fetchData = async () => {
    if (loading) {
      let res = await getDailyForecast(city, country, lang);
      setData(res);
      setLoading(false);
    } else if (
      Number(data.lat).toFixed(1) !== lat.toFixed(1) &&
      Number(data.lon).toFixed(1) !== lon.toFixed(1)
    ) {
      setLoading(true);
      if (loading) {
        let res = await getDailyForecast(city, country, lang);
        setData(res);
        setLoading(false);
      }
    }
  };
  fetchData();
  return { loading, data };
}
