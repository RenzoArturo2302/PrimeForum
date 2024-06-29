import React, { useContext, useEffect, useState } from "react";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";
import "../../src/styles.css";
//
import Saludo from "../components/Homeview/Saludo";
import CreatePostForm from "../components/Homeview/CreatePostForm";
//
//
import { auth } from "../config/Firebase";
import { useAuth } from "../contexts/AuthContext";

//
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//
import { storageServiceImg } from "../utils/storageService";
//
import { crearDocumento } from "../utils/realTimeDatabaseFunctions";
//
import { mensajeToastConPromesa } from "../utils/utils";
import Swal from "sweetalert2";

const CreatePostView = () => {
  const { currentUser } = useAuth(auth);
  const { sidebarState } = useContext(SidebarUnfolded);
  const [buttonState, setButtonState] = useState(false);
  const [dataPost, setDataPost] = useState({
    title: "",
    src: "",
    category: "",
    date: "",
    content: "",
  });

  const navigate = useNavigate();
  const [image, setImage] = useState(dataPost.src);

  const handleContent = (content) => {
    const data = {
      ...dataPost,
      ["content"]: content,
    };

    setDataPost(data);
  };

  const handleData = (ev) => {
    const nombrePropiedad = ev.target.name;
    const valorPropiedad = ev.target.value;
    const data = {
      ...dataPost,
      [nombrePropiedad]: valorPropiedad,
    };

    setDataPost(data);
  };

  const handleImage = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Por favor, selecciona un archivo de imagen.",
        });
        return;
      }
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = function (e) {
        const img = new Image();

        img.src = e.target.result;

        img.onload = function () {
          if (this.width >= 800 || this.height >= 500) {
            setImage(e.target.result);
          } else {
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "La imagen debe tener dimensiones mayores a 800x500.",
            });
          }
        };
      };
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { title, category, content } = dataPost;
    //validando el formulario

    if (title === "" || category === "" || content === "") {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Faltan campos por llenar",
      });
      return;
    }
    if (image === "") {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se ha seleccionado una imagen",
      });
      return;
    }

    try {
      const loading = Swal.fire({
        title: "Creando post",
        text: "Espere por favor...",
        icon: "info",
        showConfirmButton: false,
      });
      setButtonState(true);
      const imageURL = await storageServiceImg(image, "imagePost");
      if (imageURL === "") {
        setButtonState(false);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Error al subir la imagen",
        });
        return;
      }
      let newPost = {
        ...dataPost,
        src: imageURL,
        date: new Date().toISOString(),
      };
      await crearDocumento(newPost, currentUser.uid);

      loading.close();
      await Swal.fire({
        title: "¡Éxito!",
        text: "¡Tu post ha sido creado!",
        icon: "success",
      });
      setButtonState(false);
      navigate("/myPosts");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al crear el post",
      });

      return;
    }
  };

  return (
    <div className={sidebarState ? "page min-page" : "page"}>
      <div className="home-view">
        <Saludo currentUser={currentUser} msg={"Create a new post!"} />
        <CreatePostForm
          dataPost={dataPost}
          handleData={handleData}
          image={image}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          buttonState={buttonState}
          handleContent={handleContent}
          msgButton="Crear publicación"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePostView;
