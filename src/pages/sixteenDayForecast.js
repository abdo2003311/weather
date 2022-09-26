import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

// Data
import useDailyForecast from "hooks/useDailyForecast";
import Loading from "components/Loading";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

let SixteenDayForecast = ({ location }) => {
  let { t, i18n } = useTranslation();
  let { data, error, loading } = useDailyForecast({
    city: location.city,
    country: location.country,
    lang: i18n.language,
    lat: location.lat,
    lon: location.lon,
  });
  let [slidesToShow, setSlidesToShow] = useState(
    window.innerWidth <= 786 ? 1 : 4
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (slidesToShow === 4 && window.innerWidth <= 900) setSlidesToShow(1);
      if (slidesToShow === 1 && window.innerWidth >= 900) setSlidesToShow(4);
    });

    return window.removeEventListener("resize", () => {
      if (slidesToShow === 4 && window.innerWidth <= 900) setSlidesToShow(1);
      if (slidesToShow === 1 && window.innerWidth >= 900) setSlidesToShow(4);
    });
  });
  if (error) return <h2>error</h2>;
  if (loading) return <Loading width={100} height={100} />;
  let { city_name, timezone, country_code } = data;
  let { app_max_temp, app_min_temp } = data.data[0];

  let maxTempDailyChart = {
    labels: data.data.map((data) => data.datetime.substr(5, 5)),
    datasets: {
      label: t("sixteenDayForecast.temp"),
      data: data.data.map((data) => data.app_max_temp),
    },
  };
  let minTempDailyChart = {
    labels: data.data.map((data) => data.datetime.substr(5, 5)),
    datasets: {
      label: t("sixteenDayForecast.temp"),
      data: data.data.map((data) => data.app_min_temp),
    },
  };
  let sunrise = {
    labels: data.data.map((data) => data.datetime.substr(5, 5)),
    datasets: {
      label: t("sixteenDayForecast.sunrise"),
      data: data.data.map((data) => {
        let d = new Date(data.sunrise_ts);
        return d.getUTCHours() + (d.getUTCMinutes() * 100) / 60 / 100;
      }),
    },
  };
  let sunset = {
    labels: data.data.map((data) => data.datetime.substr(5, 5)),
    datasets: {
      label: t("sixteenDayForecast.sunset"),
      data: data.data.map((data) => {
        let d = new Date(-data.sunset_ts);
        return d.getUTCHours() + (d.getUTCMinutes() * 100) / 60 / 100 - 12;
      }),
    },
  };
  let updatedAt =
    new Date().getHours() > 12
      ? new Date().getHours() -
        12 +
        `:${new Date().getMinutes()} ${t("sixteenDayForecast.pm")}`
      : new Date().getHours() +
        `:${new Date().getMinutes()}${
          new Date().getHours() === 12
            ? ` ${t("sixteenDayForecast.pm")}`
            : ` ${t("sixteenDayForecast.am")}`
        }`;

  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3} width="100vw">
          <Grid item xs={12} md={6}>
            <MDBox>
              <ComplexStatisticsCard
                color="dark"
                icon="thermostat"
                title={t("sixteenDayForecast.temp")}
                count={`${app_max_temp}/${app_min_temp}°C`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: t("sixteenDayForecast.today"),
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox>
              <ComplexStatisticsCard
                icon="room"
                title={`${city_name}/${country_code}`}
                count={
                  data.data[0].datetime.replace(/[-]/g, "/") +
                  ":" +
                  new Date().getHours() +
                  ":" +
                  new Date().getMinutes()
                }
                color="info"
                percentage={{
                  color: "dark",
                  amount: "",
                  label: timezone,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container mt={0.5} spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1}>
            <ReportsLineChart
              color="primary"
              title={t("sixteenDayForecast.WeatherMaxTempForecast")}
              description={`${t("sixteenDayForecast.timezone")} ${
                data.timezone
              }`}
              date={`${t("sixteenDayForecast.updatedAt")} ${updatedAt}`}
              chart={maxTempDailyChart}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1}>
            <ReportsLineChart
              color="success"
              title={t("sixteenDayForecast.WeatherMinTempForecast")}
              description={`${t("sixteenDayForecast.timezone")} ${
                data.timezone
              }`}
              date={`${t("sixteenDayForecast.updatedAt")} ${updatedAt}`}
              chart={minTempDailyChart}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="warning"
              title={t("sixteenDayForecast.sunrise")}
              description={`${t("sixteenDayForecast.timezone")} ${
                data.timezone
              }`}
              date={`${t("sixteenDayForecast.updatedAt")} ${updatedAt}`}
              chart={sunrise}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="dark"
              title={t("sixteenDayForecast.sunset")}
              description={`${t("sixteenDayForecast.timezone")} ${
                data.timezone
              }`}
              date={`${t("sixteenDayForecast.updatedAt")} ${updatedAt}`}
              chart={sunset}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Swiper
        spaceBetween={1}
        pagination={{ clickable: true }}
        slidesPerView={slidesToShow}
        modules={[Navigation]}
        navigation={{ clickable: true }}
      >
        {data.data.map((data, i) => (
          <SwiperSlide>
            {" "}
            <Grid item xs={12} pr={2} key={i}>
              <MDBox mb={1.5}>
                <DefaultInfoCard
                  // eslint-disable-next-line jsx-a11y/alt-text
                  icon={
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      style={{
                        position: "absolute",
                        display: "block",
                        width: 50,
                        height: 50,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
                    />
                  }
                  title={t("sixteenDayForecast.weather")}
                  value={data.weather.description}
                  color="info"
                  description={data.datetime}
                  action={{
                    type: "",
                    route: "/",
                    label: "navigate",
                    color: "dark",
                  }}
                />
              </MDBox>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SixteenDayForecast;
