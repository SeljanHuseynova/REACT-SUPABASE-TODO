import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style/style.css";
import MyProviderr from "./context/MyProviderr";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyProviderr>
    <App />
  </MyProviderr>
);
