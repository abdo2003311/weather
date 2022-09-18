import { useState } from "react";
import { getCurrentByCityAndCountry } from "../api/api";

export default function useCurrentByCityAndCountry(
  city ,
  country,
  lang
) {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);

  let fetchData = async () => {
    if (loading) {
      let res = await getCurrentByCityAndCountry(city, country, lang);
      setData(res.data);
      setLoading(false);
    }
  };
  fetchData();
  return { loading, data };
}
