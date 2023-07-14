import { StrictMode } from "react";
import { render } from 'react-dom';
import App from "./client/App";
import React from "react";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
