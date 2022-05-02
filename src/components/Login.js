import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { GitHubAuthContext } from "../App";
import "./Styles/Login.scss";
import Logo from "../Assets/Logo.png";

export default function Login() {
  const { state, dispatch } = useContext(GitHubAuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        client_id: state.client_id,
        redirect_uri: state.redirect_uri,
        client_secret: state.client_secret,
        code: newUrl[1],
      };

      const proxy_url = state.proxy_url;

     
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true },
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1>Welcome</h1>
      <h5>Github Login App</h5>
      <img src={Logo} alt="" />
      <p>{data.errorMessage}</p>
      <div className="login-block">
        {data.isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <a
              className="login-link"
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              onClick={() => {
                setData({ ...data, errorMessage: "" });
              }}
            >
              <h6>Login with GitHub</h6>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
