import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  let userIsLoggedIn = !!token;

  const autoLogoutHandler = () => {
    setTimeout(() => {
      setToken(null);
      console.log("testing");
      localStorage.removeItem("token");
    }, 60000*5);
  };
 

  useEffect(() => {
    if (userIsLoggedIn) {
      autoLogoutHandler();
    }
  }, [userIsLoggedIn]);

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const authContext = {
    token: token,
    loggedIn: userIsLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
