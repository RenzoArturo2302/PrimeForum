import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getStorage, saveStorage } from "../utils/localStorage";

const DarkLightMode = createContext();

const DarkLightModeContext = (props) => {
  // Verificar si ya existe un registre en el localState, si es así, se obtiene el valor y se asigna con useState
  const [darkModeState, setDarkModeState] = useState(() => {
    const storage = getStorage("darkMode");
    return storage ? storage : false;
  });

  const valor = { darkModeState, setDarkModeState };

  // Guardar el estado en el local storage al variar el valor de darkModeState
  useEffect(() => {
    saveStorage("darkMode", darkModeState);
  }, [darkModeState]);

  return (
    <DarkLightMode.Provider value={valor}>
      {props.children}
    </DarkLightMode.Provider>
  );
};

export { DarkLightMode, DarkLightModeContext };
