import axios from "axios";
import { createContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { User } from "../types/types";

interface AuthContextType {
  user: User | null;
  token: string;
  login: (token: string, userData: User) => void;
  logout: () => void;
  flushUsers: () => void;
  flushFavourites: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, // Initialize with null
  token: "",
  login: (token: string, userData: User) => {},
  logout: () => {},
  flushUsers: () => {},
  flushFavourites: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize with null
  const [token, setToken] = useState<string>("");

  console.log("User ", user);

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
      .delete("https://my-pokedex-api.onrender.com/api/auth/deleteusers")
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

  const flushFavourites = () => {
    axios
      .delete("https://my-pokedex-api.onrender.com/api/auth/deletefavourites")
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
      flushFavourites,
      isAuthenticated,
    }),
    [user, token, login, logout, flushUsers, flushFavourites, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
