import axios from "axios";
import { createContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { User } from "../types/types";

const AuthContext = createContext({
  user: null as User | null,
  token: "" as string,
  login: (token: string, userData: User) => {},
  logout: () => {},
  flushUsers: () => {},
  isAuthenticated: false as boolean,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize with null
  const [token, setToken] = useState<string>("");

  const apiUrl = import.meta.env.VITE_API_URL;

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  useEffect(() => {
    // Check for an existing token in localStorage when the app loads
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async (token: string, userData: User) => {
    // Save token and user data
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    // Clear the token and user data
    setToken("");
    setUser(null); // Set to null
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setTimeout(() => {
      toast.dismiss("You are successfully logged out!");
    }, 1000);
  };

  const flushUsers = () => {
    axios
      .delete(`${apiUrl}api/auth/deleteusers`)
      .then((res) => {
        if (!res.data) {
          toast.error("Something went wrong! Try again...");
        }
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      flushUsers,
      isAuthenticated,
    }),
    [user, token, login, logout, flushUsers, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
