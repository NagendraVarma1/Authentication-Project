import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
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
