import React, { useEffect, useState } from "react";
import usersService from "../services/usersService";

export const authContext = React.createContext(null);
authContext.displayName = "Auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const createUser = (user) => {
    return usersService.createUser(user);
  };

  const login = async (credentials) => {
    const response = await usersService.loginUser(credentials);
    refreshUser();
    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout, createUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
