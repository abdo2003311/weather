import React from "react";
import { useState, useEffect } from "react";

// react-router components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/Navbar/styles";
// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDButton from "components/MDButton";
import { Grid, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "Arabic" },
};
function Navbar({ absolute, light, isMini, setLocation, routeName }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  let [transparentNavbar, setTransparentNavbar] = useState(false);
  let [l, setL] = useState(null);
  let { i18n, t } = useTranslation();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => {
            i18n.changeLanguage(lng);
            location.reload();
          }}
        >
          {lngs[lng].nativeName}
        </MenuItem>
      ))}
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item xs={4}>
            <MDBox color="inherit" mb={{ xs: 1 }}>
              <Breadcrumbs
                icon="home"
                title={routeName}
                route={route}
                light={light}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} container justifyContent="flex-end">
            {isMini ? null : (
              <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                <MDBox pr={1}>
                  <MDInput
                    label={t("navbar.searchHere")}
                    placeholder={t("navbar.placeholder")}
                    onChange={(e) => {
                      setL({
                        city: e.target.value.substr(
                          0,
                          e.target.value.indexOf("/")
                        ),
                        country: e.target.value.substr(
                          e.target.value.indexOf("/") + 1,
                          e.target.value.length
                        ),
                      });
                    }}
                  />
                </MDBox>
                <MDBox pr={1}>
                  <MDButton
                    onClick={() => {
                      setLocation(l);
                    }}
                  >
                    {t("navbar.search")}
                  </MDButton>
                </MDBox>
                <MDBox color={light ? "white" : "inherit"}>
                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarMobileMenu}
                    onClick={handleMiniSidenav}
                  >
                    <Icon sx={iconsStyle} fontSize="medium">
                      {miniSidenav ? "menu_open" : "menu"}
                    </Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarIconButton}
                    onClick={handleConfiguratorOpen}
                  >
                    <Icon sx={iconsStyle}>settings</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarIconButton}
                    aria-controls="notification-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleOpenMenu}
                  >
                    <Icon sx={iconsStyle}>translate</Icon>
                  </IconButton>
                  {renderMenu()}
                </MDBox>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of navbar
Navbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
Navbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default Navbar;
