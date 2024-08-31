import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { PokeProvider } from "./contexts/PokeContext";
import "./index.css";
import "./styles/main.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PokeProvider>
        <App />
      </PokeProvider>
    </AuthProvider>
  </React.StrictMode>
);
