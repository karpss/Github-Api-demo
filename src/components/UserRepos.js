import React, { useEffect } from "react";
import "./Styles/UserRepos.css";
import { getUserRepo } from "../redux/repoSlice";
import {useSelector, useDispatch} from 'react-redux';


const GithubRepos = () => {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(getUserRepo());
  }, [dispatch]);
  

  return (
    <div className="repos-container">
      {person ? (
        <div>
          {person.slice(0, 20).map((p) => (
            <div key={p.id} className="repos-box">
              <hr />
              <h2>
                <a className="repos-name" href={p.html_url}>
                  {p.name}
                </a>
              </h2>
              <p>Id : {p.id}</p>

              <p>Size: {p.size}</p>
              <p>Language: {p.language}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data in the state</p>
      )}
    </div>
  );
};

export default GithubRepos;
