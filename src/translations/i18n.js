import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// arabic translation
import ArabicSideNav from "./langs/arabic/sideNav.json";
import ArabicSixteenDayForecast from "./langs/arabic/sixteenDayForecast.json";
import ArabicForecast from "./langs/arabic/forecast.json";
import ArabicNavbar from "./langs/arabic/navbar.json";
import ArabicAlerts from "./langs/arabic/alerts.json";
import ArabicFooter from "./langs/arabic/footer.json";
import ArabicUiConfigurator from "./langs/arabic/uiConfigurator.json";

// english translation
import EnglishForecast from "./langs/english/forecast.json";
import EnglishNavbar from "./langs/english/navbar.json";
import EnglishSideNav from "./langs/english/sideNav.json";
import EnglishSixteenDayForecast from "./langs/english/sixteenDayForecast.json";
import EnglishAlerts from "./langs/english/alerts.json";
import EnglishFooter from "./langs/english/footer.json";
import EnglishUiConfigurator from "./langs/english/uiConfigurator.json";

const resources = {
  en: {
    translation: {
      forecast: EnglishForecast,
      navbar: EnglishNavbar,
      sideNav: EnglishSideNav,
      sixteenDayForecast: EnglishSixteenDayForecast,
      alerts: EnglishAlerts,
      footer: EnglishFooter,
      uiConfigurator: EnglishUiConfigurator,
    },
  },
  ar: {
    translation: {
      forecast: ArabicForecast,
      navbar: ArabicNavbar,
      sideNav: ArabicSideNav,
      sixteenDayForecast: ArabicSixteenDayForecast,
      alerts: ArabicAlerts,
      footer: ArabicFooter,
      uiConfigurator: ArabicUiConfigurator,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
