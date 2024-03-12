import React, { useEffect, useState } from "react";

const GoogleError = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // get authtoken from the URL
    const messageParam = new URLSearchParams(window.location.search).get(
      "message"
    );
    setMessage(messageParam);
  }, []);
  return (
    <div>
      {message === "" ? "loading..." : message} <a href="/login">Login again</a>
    </div>
  );
};

export default GoogleError;
