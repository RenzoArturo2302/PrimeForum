// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getStorage, saveStorage, removeStorage } from "../utils/localStorage";

// De Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
const AuthContext = createContext();

// Creamos el context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  //   Verificamos si hay o no un usuario ya existente guardado en el local storage
  const [currentUser, setCurrentUser] = useState(() => {
    const user = getStorage("currentUser");
    return user ? user : null;
  });

  //   Un loading, evitar que trabaje antes de que finalice el proceso.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;

        saveStorage("currentUser", JSON.stringify({ displayName, email, uid }));
      } else {
        removeStorage("currentUser");
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
