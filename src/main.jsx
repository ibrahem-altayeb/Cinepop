import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import GlobalState from "./Components/Context.jsx";
import "./index.css"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>
  </React.StrictMode>
);
