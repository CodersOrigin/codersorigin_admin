import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../src/image/preloader.gif";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get(process.env.REACT_APP_GETUSER, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const isAdmin = response.data.isAdmin;

      if (isAdmin === true) {
        setIsLoggedIn(true);
        setUser(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserData(authToken);
    } else {
      navigate("/login");
    }
  }, []);

  return isLoggedIn ? (
    <div className="dashboard">
      <Header setIsLoggedIn={setIsLoggedIn} name={user.name} />
    </div>
  ) : (
    <div className="preloader">
      <img className="preloaderimg" src={Preloader} alt="preloader img" />
    </div>
  );
};

export default Dashboard;
