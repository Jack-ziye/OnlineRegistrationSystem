import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import "./styles/details.scss";
import "./styles/general.scss";
import "./styles/editor.scss";
import "antd/dist/reset.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = "叶子起点";
root.render(<App />);
