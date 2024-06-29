import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import RegisterForm from "../components/Login-Register/RegisterForm";

import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../config/Firebase";

// Para las alertas (Prueba)

const RegisterView = () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Función semana 9
  const handleValues = (ev) => {
    console.log(ev.target.name);
    const nombrePropiedad = ev.target.name;
    const valorPropiedad = ev.target.value;
    const registerUser = {
      ...values,
      [nombrePropiedad]: valorPropiedad,
    };
    setValues(registerUser);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Verificar si el usuario ya existe

      // Para crear el usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: values.username });

      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, displayName: values.username })
      );
      toast.success("Usuario registrado exitosamente!");
      await delay(1000);
      navigate("/"); // Navega a la página de inicio
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("El correo electrónico ya está en uso.");
      } else if (error.code === "auth/weak-password") {
        toast.error("La contraseña es demasiado débil.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <RegisterForm
        handleValues={handleValues}
        values={values}
        handleSignup={handleSignup}
      />
      <ToastContainer />
    </>
  );
};

export default RegisterView;
