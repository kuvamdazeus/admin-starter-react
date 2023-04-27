import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import XXXXXPage from "./screens/XXXXX/XXXXX";
import EditXXXXXPage from "./screens/XXXXX/EditXXXXX";
import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { LayoutProvider } from "./layout/context/layoutcontext";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/layout/layout.scss";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="xxxxx" element={<XXXXXPage />} />
      <Route path="xxxxx/create" element={<CreateXXXXXPage />} />
      <Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LayoutProvider>
      <RouterProvider router={router} />
    </LayoutProvider>
  </React.StrictMode>
);
