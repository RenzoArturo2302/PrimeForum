import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { getStorage, saveStorage } from "../utils/localStorage";

const SidebarUnfolded = createContext();

const SidebarUnfoldedContext = (props) => {
  const [sidebarState, setSidebarState] = useState(() => {
    const storage = getStorage("sidebar");
    return storage ? storage : false;
  });

  const valor = { sidebarState, setSidebarState };

  useEffect(() => {
    saveStorage("sidebar", sidebarState);
  }, [sidebarState]);

  return (
    <SidebarUnfolded.Provider value={valor}>
      {props.children}
    </SidebarUnfolded.Provider>
  );
};

export { SidebarUnfolded, SidebarUnfoldedContext };
