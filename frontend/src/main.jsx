// Node module Imports
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Main Imports
import App from "./App";
import { store } from "./config/exports";

// Style Sheets
import "./styles/style.css";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
