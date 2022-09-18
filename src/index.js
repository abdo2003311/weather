import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n";
import { MaterialUIControllerProvider } from "./context";
localStorage.setItem("lang", "en");

ReactDOM.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
