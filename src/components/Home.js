import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GitHubAuthContext } from "../App";
import "./Styles/Home.css";
import GithubRepos from "./UserRepos";

export default function Home() {
  const { state, dispatch } = useContext(GitHubAuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const {login, avatar_url } = state.user;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  //console.log(login);

  return (
    <div className="home-container">
      <button onClick={() => handleLogout()}>Logout</button>

      <div className="content-block">
        <img src={avatar_url} alt="Avatar" />
        <h1>Welcome, {login}</h1>

        <h6>Top Twenty Repositories:</h6>

        <GithubRepos  />
      </div>
    </div>
  );
}
