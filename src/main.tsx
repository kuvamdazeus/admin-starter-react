import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./layout/context/layoutcontext";
import Layout from "./layout/layout";

import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/layout/layout.scss";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LayoutProvider>
      <Layout>
        <App />
      </Layout>
    </LayoutProvider>
  </React.StrictMode>
);
