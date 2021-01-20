import React, { useCallback } from "react";
import { StyledNavLink } from "../nav";

const Login = () => {
  const handleStravaLogin = useCallback(async () => {
    const qParams = [
      "client_id=45862",
      "response_type=code",
      `redirect_uri=http://localhost:3000/oauth_callback`,
      "scope=read_all,activity:read_all",
      "approval_prompt=auto",
    ].join("&");
    try {
      window.location.assign(
        `https://www.strava.com/oauth/authorize?${qParams}`
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <StyledNavLink to="" onClick={handleStravaLogin}>
      Login
    </StyledNavLink>
  );
};

export default Login;
