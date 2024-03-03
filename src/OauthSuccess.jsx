import React, { useEffect } from "react";
import Cookies from "js-cookie";

const OauthSuccess = () => {
  useEffect(() => {
    // Get the token from the cookies
    const token = Cookies.get("authtoken");

    // Now you can use the token
    console.log(token);
  }, []);
  return <div>Welcome to CodersOrigin Admin panel</div>;
};

export default OauthSuccess;
