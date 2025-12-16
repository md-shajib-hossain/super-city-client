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
import IssueDetail from "../All_Issues/IssueDetail/IssueDetail";
import MyIssues from "../pages/Dashboard/MyIssues";

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
        path: "all-issues",
        Component: All_Issues,
      },
      {
        path: "issue/:id",
        element: (
          <PrivateRoute>
            <IssueDetail></IssueDetail>
          </PrivateRoute>
        ),
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
    children: [
      {
        path: "my-issues/:email",
        Component: MyIssues,
      },
      {
        path: "report-issue",
        Component: ReportIssue,
      },
    ],
  },
]);
