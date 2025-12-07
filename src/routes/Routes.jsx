import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/RegisterPage/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
