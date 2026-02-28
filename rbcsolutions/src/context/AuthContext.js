import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("crm_user")) || null
  );

  const loginSuccess = (email) => {
    const userData = { email };
    localStorage.setItem("crm_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("crm_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);