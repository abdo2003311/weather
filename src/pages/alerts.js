import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import useAlerts from "hooks/useAlerts";
import Loading from "components/Loading";
import { Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

function Alerts({ location }) {
  let { i18n, t } = useTranslation();
  let { data, loading } = useAlerts({
    lang: i18n.language,
    lat: location.lat,
    lon: location.lon,
  });
  if (loading) return <Loading width={100} height={100} />;

  const alertContent = (props) => (
    <MDTypography variant={props.severity} color="white">
      <MDTypography component="h2" variant={props.severity} color="white">
        {props.title}
      </MDTypography>
      <MDTypography color="white">
        {t('alerts.regions')} :{" "}
        {props.regions.map((region, i) => (
          <span>
            {i !== 0 && ","}
            {region}
          </span>
        ))}
        .{" "}
      </MDTypography>
      <Divider light />
      {t('alerts.time')} : {props.effective_local}
      <Divider light />
      <MDTypography variant={props.severity} fontWeight="medium" color="white">
      {t('alerts.description')} : {props.description}
      </MDTypography>
      <MDTypography variant={props.severity} fontWeight="medium" color="white"></MDTypography>
    </MDTypography>
  );

  return (
    <MDBox>
      <Grid container mb={2}>
        <Grid item xs={12}>
          <Card>
            <MDBox pt={2} pl={2}>
              <MDTypography variant="h5">{t('alerts.alerts')}</MDTypography>
            </MDBox>
            <MDBox>
              {data.alerts.map((alert) => (
                <Box m={2}>
                  <MDAlert color="primary">{alertContent(alert)}</MDAlert>
                </Box>
              ))}
              {!data.alerts[0] && (
                <Box m={2}>
                  <MDAlert color="success">{t('alerts.thereIsNoAlerts')}</MDAlert>
                </Box>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Alerts;
