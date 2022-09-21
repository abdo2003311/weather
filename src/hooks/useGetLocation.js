import { useState } from "react";
import { getCurrent, getCurrentByLatAndLon, getLocation } from "../api/api";

export default function useGetLocation(location) {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);
  let fetchData = async () => {
    if (loading) {
      if (!location) {
        let res = await getLocation();
        let city;
        if (res.location.city === "") {
          city = await getCurrentByLatAndLon(
            res.location.latitude,
            res.location.longitude,
            "en"
          );
        }
        setData({
          city: res.location.city === "" ? city.data[0].city_name : res.location.city,
          country: res.country.name,
          lat: res.location.latitude,
          lon: res.location.longitude,
        });
        setLoading(false);
      }
    }
    if (location) {
      if (data.city !== location.city) {
        let res = await getCurrent(location.city, location.country, "en");
        setData({
          city: location.city,
          country: location.country,
          lat: res.data[0].lat,
          lon: res.data[0].lon,
        });
      }
    }
  };
  fetchData();
  return { loading, data };
}
