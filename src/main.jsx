import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TravelProvider } from "./context/TravelContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TravelProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TravelProvider>
  </React.StrictMode>
);
