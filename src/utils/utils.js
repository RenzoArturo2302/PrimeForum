import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const nameFileUUID = (image) => {
  const header = image.split(";")[0]; // "data:image/jpeg"
  // Obtener el tipo de imagen (jpeg, png, etc.)
  const imageType = header.split("/")[1]; // "jpeg"
  const newUUID = uuidv4();
  const newName = `${newUUID}.${imageType}`;
  return newName;
};

const convertDateToLocal = (fechaYHora, zonaHoraria = "es-ES") => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const fecha = new Date(fechaYHora);
  return fecha.toLocaleDateString(zonaHoraria, options).replace(/\//g, "-");
};

// Para que no se cierre inmediatamente al crear o editar un post.
const mensajeToastConPromesa = (message, options) => {
  return new Promise((resolve) => {
    toast(message, {
      ...options,
      onClose: resolve,
    });
  });
};

export { convertDateToLocal, nameFileUUID, mensajeToastConPromesa };
