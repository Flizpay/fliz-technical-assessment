// import React from "react";

// const LoginPage = () => {
//   const googleLogin = () => {
//     window.location.href = "http://localhost:5000/api/auth/google";
//   };

//   return (
//     <div>
//       <h1>Game of Empires</h1>
//       <button onClick={googleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/getPlayer", {
        email,
        password,
      });
      console.log(response.data);
      navigate("/gamepage");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <h1>Game of Empires</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
