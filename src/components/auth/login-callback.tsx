import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { client } from "../../utils/api-client";
import { useDispatch } from "react-redux";
import { logIn } from "./userSlice";
import { Dispatch } from "redux";

const LoginCallback: FC<RouteComponentProps> = ({ location }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    login(code, dispatch);
    setLoggedIn(true);
  }, [location, dispatch]);

  if (loggedIn) {
    return <Redirect to="/"></Redirect>;
  } else {
    return <div></div>;
  }
};

function login(code: string, dispatch: Dispatch<any>) {
  const qParams = [
    `code=${code}`,
    `client_id=45862`,
    `client_secret=<client secret goes here>`,
    `grant_type=authorization_code`,
  ].join("&");
  return client(`https://www.strava.com/oauth/token?${qParams}`, { 
    data: {},
    method: "POST",
  }).then((user) => dispatch(logIn({payload: user})));
}

export default LoginCallback;
