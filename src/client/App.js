import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage, RegisterPage, GamePage, HomePage } from "./pages/index.jsx";
import axios from "axios";
import { UserContextProvider, UserContext } from "./components/index.jsx";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function ProtectedRoute({ children }) {
  const { user } = React.useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
