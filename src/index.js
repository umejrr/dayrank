import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useAuthContext } from "./hooks/useAuthContext";
import About from "./About";

function AppRoutes() {
  const { state, auth } = useAuthContext();
  const user = state?.user;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={user ? <App /> : <Navigate to="/login" />}
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
