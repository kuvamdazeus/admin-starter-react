import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import ProductsPage from "./screens/Products/Products";
import EditProductPage from "./screens/Products/EditProduct";
import CreateProductPage from "./screens/Products/CreateProduct";
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
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/create" element={<CreateProductPage />} />
      <Route path="products/edit/:id" element={<EditProductPage />} />
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
