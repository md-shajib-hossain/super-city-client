import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/RegisterPage/Register";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import ReportIssue from "../components/ReportIssue/ReportIssue";
import All_Issues from "../All_Issues/All-Issues";

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
      {
        path: "report-issue",
        Component: ReportIssue,
      },
      {
        path: "all-issues",
        Component: All_Issues,
        loader: () =>
          fetch("http://localhost:3000/all-issues").then((res) => res.json()),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
]);
