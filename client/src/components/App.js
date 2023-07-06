import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Main from "./Main";
import Quiz from "./Quiz";
import Waiting from "./Waiting";
import Result from "./Result";
import { CheckUserExist } from "../helper/helper";
import "../styles/App.css";

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/wait",
    element: (
        <Waiting />
    ),
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
