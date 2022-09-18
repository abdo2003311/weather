import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Carousel from "nuka-carousel";
// Data

// Dashboard components
import Loading from "components/Loading";
import useHourlyForecast from "hooks/useHourlyForecast";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { useTranslation } from "react-i18next";

function Forecast({ location }) {
  let { t, i18n } = useTranslation();
  let { data, loading, error } = useHourlyForecast({
    city: location.city,
    lang : i18n.language,
    country: location.country,
    lat: location.lat,
    lon: location.lon,
  });
  if (loading) return <Loading width={100} height={100} />;
  if (error) return <h2>error</h2>;

  let templabels = [];
  let tempchartData = [];
  let windlabels = [];
  let windchartData = [];
  for (let i = 0; i < 24; i++) {
    templabels.push(
      Number(data.data[i].datetime.substr(11, 2)) > 12
        ? Number(data.data[i].datetime.substr(11, 2)) - 12 + "pm"
        : Number(data.data[i].datetime.substr(11, 2)) === 12
        ? "12pm"
        : Number(data.data[i].datetime.substr(11, 2)) + "am"
    );
    tempchartData.push(data.data[i].app_temp);
    windlabels.push(
      Number(data.data[i].datetime.substr(11, 2)) > 12
        ? Number(data.data[i].datetime.substr(11, 2)) - 12 + "pm"
        : Number(data.data[i].datetime.substr(11, 2)) === 12
        ? "12pm"
        : Number(data.data[i].datetime.substr(11, 2)) + "am"
    );
    windchartData.push(data.data[i].wind_spd);
  }
  let todayTempForecast = {
    labels: templabels,
    datasets: {
      data: tempchartData,
      label: t("forecast.temp"),
    },
  };
  let todayWindForecast = {
    labels: windlabels,
    datasets: {
      data: windchartData,
      label: t("forecast.temp"),
    },
  };
  let { city_name, timezone } = data;
  let { app_temp, clouds, weather, wind_cdir_full, wind_spd } = data.data[0];
  let { description } = weather;
  let updatedAt =
    new Date().getHours() > 12
      ? new Date().getHours() - 12 + `:${new Date().getMinutes()} ${t("forecast.pm")}`
      : new Date().getHours() +
        `:${new Date().getMinutes()}${
          new Date().getHours() === 12 ? ` ${t("forecast.pm")}` : ` ${t("forecast.am")}`
        }`;

  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                color="dark"
                icon="thermostat"
                title={t("forecast.temp")}
                count={`${app_temp}°C`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: t("forecast.today"),
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="room"
                title={city_name}
                count={new Date().getHours() + ":" + new Date().getMinutes()}
                percentage={{
                  color: "success",
                  amount: "",
                  label: timezone,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                color="success"
                icon="air"
                title={t("forecast.wind")}
                count={`${wind_spd}kmph`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: wind_cdir_full,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                color="primary"
                icon="clouds"
                title={t("forecast.clouds")}
                count={clouds}
                percentage={{
                  color: "success",
                  amount: " ",
                  label: description,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox>
              <ReportsLineChart
                color="primary"
                title={t("forecast.todaysTempForecast")}
                description={`${t("forecast.timezone")} ${data.timezone}`}
                date={`${t("forecast.updatedAt")} ${updatedAt}`}
                chart={todayTempForecast}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox>
              <ReportsLineChart
                color="success"
                title={t("forecast.todaysWindForecast")}
                description={`${t("forecast.timezone")} ${data.timezone}`}
                date={`${t("forecast.updatedAt")} ${updatedAt}`}
                chart={todayWindForecast}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Carousel slidesToShow={4} withoutControls="true">
              {data.data.map((data, i) => (
                <Grid item xs={12} pr={2} key={i}>
                  <MDBox mb={1.5}>
                    <DefaultInfoCard
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
                      title={t("forecast.weather")}
                      value={data.weather.description}
                      color="info"
                      description={
                        Number(data.datetime.substr(11, 2)) > 12
                          ? Number(data.datetime.substr(11, 2)) - 12 + `:00 ${t("forecast.pm")}`
                          : Number(data.datetime.substr(11, 2)) === 12
                          ? "12:00 pm"
                          : Number(data.datetime.substr(11, 2)) + `:00 ${t("forecast.am")}`
                      }
                      action={{
                        type: "",
                        route: "/",
                        label: "navigate",
                        color: "dark",
                      }}
                    />
                  </MDBox>
                </Grid>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default Forecast;
