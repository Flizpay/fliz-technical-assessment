import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { LoginPage, RegisterPage, GamePage } from "./pages/index";
import axios from "axios";
//import { UserContextProvider } from "./components/index";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<>Hi how are you</>} />
          <Route path="/register" element={<></>} />
          <Route path="/game" element={<></>} />
        </Routes>
      </Router>
    </>
  );
}
