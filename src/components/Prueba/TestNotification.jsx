import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestNotification = () => {
  const notify = () => toast("¡Hola, esto es una prueba!");

  return (
    <div>
      <button onClick={notify}>Mostrar notificación</button>
      <ToastContainer />
    </div>
  );
};

export default TestNotification;
