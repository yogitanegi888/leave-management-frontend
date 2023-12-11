import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ApplyLeave } from "./components/ApplyLeave";
import { Home } from './components/Home';
import { UserDashboard } from "./components/UserDashboard";
import { AddUser } from "./components/AddUser";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<Home/>} />
        <Route path="apply-leave" element={<ApplyLeave />} />
        <Route path="dashboard/:userId" element={<UserDashboard />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
