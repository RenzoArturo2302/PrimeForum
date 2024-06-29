import React, { useState } from "react";
import LoginForm from "../components/Login-Register/LoginForm";
import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LoginView = () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //   Navigate para dirigirme a la página inicial
  const navigate = useNavigate();
  // Función semana 9
  const handleValues = (ev) => {
    console.log(ev.target.name);
    const nombrePropiedad = ev.target.name;
    const valorPropiedad = ev.target.value;
    const loginUser = {
      ...values,
      [nombrePropiedad]: valorPropiedad,
    };
    setValues(loginUser);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      toast.success("Inicio de sesión exitoso!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      await delay(1000);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Los datos ingresados son incorrectos.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <LoginForm
        handleValues={handleValues}
        handleLogin={handleLogin}
        values={values}
      />
      <ToastContainer />
    </>
  );
};

export default LoginView;
