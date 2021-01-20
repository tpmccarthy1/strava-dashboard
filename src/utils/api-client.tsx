import { queryCache } from "react-query";
import {  logOut } from "../components/auth/userSlice";
import { useDispatch } from "react-redux";

async function client(
  endpoint: any,
  { data, token, headers: customHeaders, ...customConfig }: any = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : null,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      queryCache.clear();
      const dispatch = useDispatch();
      dispatch(logOut);

      // refresh the page for them
      window.location.assign(window.location.toString());
      return Promise.reject({ message: "Please re-authenticate." });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
