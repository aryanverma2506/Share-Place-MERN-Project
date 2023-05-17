import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import AllContextProvider from "./shared/context/AllContextProvider";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  </BrowserRouter>
);
