import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
// 在jira-dev-tool 后面引入，覆盖已有样式
import "antd/dist/antd.less";
import { AppProviders } from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
