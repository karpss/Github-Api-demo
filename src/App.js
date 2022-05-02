import React, {useState, useEffect, createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./redux/index";
import Loadingscreen from "./components/Loadingscreen";


export const GitHubAuthContext = createContext();

function App() {
  
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <>
    {loading === false ? (
    <GitHubAuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </GitHubAuthContext.Provider>

) : (
  <Loadingscreen />
)}


    </>
   
    
  );
  
  
}

export default App;
