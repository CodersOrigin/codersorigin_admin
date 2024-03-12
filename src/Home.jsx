import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getGoogleOauthUrl from "./lib/getGoogleOauthUrl";
const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);

      if (response.data.success) {
        toast.success("Login successful");
        localStorage.setItem("authToken", response.data.authtoken);
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Invalid username or password");
      console.log(error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <p className="atext">Admin login</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input className="btn" type="submit" value="Submit" />
      </form>
      {/* <a href={getGoogleOauthUrl()}>Login with Google</a> */}
      <a type="button" class="login-with-google-btn" href={getGoogleOauthUrl()}>
        Sign in with Google
      </a>
    </div>
  );
};

export default Home;
