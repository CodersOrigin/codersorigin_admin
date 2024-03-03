const getGoogleOauthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const params = new URLSearchParams(options);
  return `${rootUrl}?${params.toString()}`;
};

export default getGoogleOauthUrl;
