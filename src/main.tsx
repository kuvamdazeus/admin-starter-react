import Dashboard from "./screens/Dashboard";
import LoginPage from "./screens/Login";
import RegisterPage from "./screens/Register";
import XXXXXPage from "./screens/XXXXX/XXXXX";
import EditXXXXXPage from "./screens/XXXXX/EditXXXXX";
import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LayoutProvider } from "./layout/context/layoutcontext";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/layout/layout.scss";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        loader={() => {
          const token = localStorage.getItem("auth_token");

          if (token) return null;
          else return redirect("/");
        }}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="xxxxx" element={<XXXXXPage />} />
        <Route path="xxxxx/create" element={<CreateXXXXXPage />} />
        <Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />
        {/* --ROUTES-- */}
      </Route>
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
