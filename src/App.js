/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import React from "react";
// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import useGetLocation from "hooks/useGetLocation";
import Loading from "components/Loading";
import Navbar from "examples/Navbars/Navbar";
import Forecast from "pages/forecast";
import SixteenDayForecast from "pages/sixteenDayForecast";
import Alerts from "pages/alerts";
import Layout from "examples/LayoutContainers/Layout";
import Footer from "examples/Footer";
import { useTranslation } from "react-i18next";
import { setDirection } from "context";
import { Box } from "@mui/material";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [location, setLocation] = useState(null);
  const { data, loading } = useGetLocation(location);
  const { i18n, t } = useTranslation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    const cacheLtr = createCache({
      key: "ltr",
    });

    setRtlCache(i18n.language === "ar" ? cacheRtl : cacheLtr);
  }, [i18n.language]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    if (i18n.language === "ar") {
      setDirection(dispatch, "rtl");

      return () => setDirection(dispatch, "ltr");
    }
  }, [dispatch, i18n.language]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = useMemo(
    () => (
      <Box display={{ xs: "none", md: "flex" }}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.25rem"
          height="3.25rem"
          bgColor="white"
          shadow="sm"
          borderRadius="50%"
          position="fixed"
          right="2rem"
          bottom="2rem"
          zIndex={99}
          color="dark"
          sx={{ cursor: "pointer" }}
          onClick={handleConfiguratorOpen}
        >
          <Icon fontSize="small" color="inherit">
            settings
          </Icon>
        </MDBox>
      </Box>
    ),
    [handleConfiguratorOpen]
  );
  const route = useLocation().pathname.split("/").slice(1)[0];

  const routeName = () => {
    if (route === "forecast") return t("sideNav.forecast");
    else if (route === "sixteenDayForecast")
      return t("sideNav.sixteenDayForecast");
    else if (route === "alerts") return t("sideNav.alerts");
    else return route;
  };
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(data));
  }, [data]);
  const navbar = useMemo(
    () => <Navbar setLocation={setLocation} routeName={routeName()} />,
    [routeName]
  );

  const configurator = useMemo(() => <Configurator />, []);
  const forecast = useMemo(() => <Forecast location={data} />, [data]);
  const sixteenDayForecast = useMemo(
    () => <SixteenDayForecast location={data} />,
    [data]
  );
  const alerts = useMemo(() => <Alerts location={data} />, [data]);
  const Theme = useMemo(() => {
    if (darkMode) {
      if (i18n.language === "ar") return themeDarkRTL;
      else return themeDark;
    } else {
      if (i18n.language === "ar") return themeRTL;
      else return theme;
    }
  }, [darkMode, i18n.language]);

  if (loading) return <Loading width={100} height={100} />;

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Sidenav
          brandName={t("sideNav.weather")}
          color={sidenavColor}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          routes={[
            {
              type: "collapse",
              name: t("sideNav.forecast"),
              key: "forecast",
              icon: <Icon fontSize="small">wb_sunny</Icon>,
              route: "/forecast",
            },
            {
              type: "collapse",
              name: t("sideNav.sixteenDayForecast"),
              key: "sixteenDayForecast",
              icon: <Icon fontSize="small">cloud</Icon>,
              route: "/sixteenDayForecast",
            },
            {
              type: "collapse",
              name: t("sideNav.alerts"),
              key: "alerts",
              icon: <Icon fontSize="small">notifications</Icon>,
              route: "/alerts",
            },
          ]}
        />
        <Layout>
          {navbar}
          <Routes>
            <Route exact path="/forecast" element={forecast} />
            <Route
              exact
              path="/sixteenDayForecast"
              element={sixteenDayForecast}
            />
            <Route exact path="/alerts" element={alerts} />
            <Route exact path="/" element={<h2>404 Not Found</h2>} />
          </Routes>
          <Footer />
        </Layout>
        {configurator}
        {configsButton}
      </ThemeProvider>
    </CacheProvider>
  );
}
