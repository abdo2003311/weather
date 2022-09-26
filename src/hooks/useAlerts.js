import { useState } from "react";
import { getAlerts } from "../api/api";

export default function useAlerts({ lat, lon, lang }) {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);

  let fetchData = async () => {
    if (loading) {
      let res = await getAlerts(lat, lon, lang);
      setData(res);
      setLoading(false);
    } else if (
      Number(data.lat).toFixed(1) !== lat.toFixed(1) &&
      Number(data.lon).toFixed(1) !== lon.toFixed(1)
    ) {
      setLoading(true);
      if (loading) {
        let res = await getAlerts(lat, lon, lang);
        setData(res.data);
        setLoading(false);
      }
    }
  };
  fetchData();
  return { loading, data };
}
