import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// styles principal
import "./styles.css";
import { DarkLightModeContext } from "./contexts/DarkLightModeContext.jsx";
import { SidebarUnfoldedContext } from "./contexts/SidebarUnfoldedContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkLightModeContext>
      <SidebarUnfoldedContext>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SidebarUnfoldedContext>
    </DarkLightModeContext>
  </React.StrictMode>
);
