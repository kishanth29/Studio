import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.main.css";
import store from "./store";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
    // </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
