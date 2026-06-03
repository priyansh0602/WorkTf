import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

/**
 * React 18 entry point.
 * Mounts the root <App /> component into the #root div defined in index.html.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
