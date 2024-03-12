import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OauthSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // get authtoken from the URL
    const authtoken = new URLSearchParams(window.location.search).get(
      "authtoken"
    );

    // set token in localstorage and redirect to dashboard
    if (authtoken) {
      localStorage.setItem("authToken", authtoken);
      navigate("/");
    }
  }, []);
  return <div>Verifying</div>;
};

export default OauthSuccess;
