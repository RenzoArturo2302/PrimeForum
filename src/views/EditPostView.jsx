import React, { useContext, useEffect, useState } from "react";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";
import "../../src/styles.css";
//
import Saludo from "../components/Homeview/Saludo";
import CreatePostForm from "../components/Homeview/CreatePostForm";
//
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//
import { auth } from "../config/Firebase";
import { useAuth } from "../contexts/AuthContext";
//
//
import {
  storageServiceImg,
  isFirebaseStorageUrl,
} from "../utils/storageService";
//
import {
  obtenerDocumentoPorID,
  editarDocumentoPorID,
} from "../utils/realTimeDatabaseFunctions";
//

import Swal from "sweetalert2";

const EditPostView = () => {
  const { id } = useParams();
  const { currentUser } = useAuth(auth);
  const { sidebarState } = useContext(SidebarUnfolded);
  const [buttonState, setButtonState] = useState(true);
  const [dataPost, setDataPost] = useState({
    title: "",
    src: "",
    category: "",
    date: "",
    content: "",
  });

  const navigate = useNavigate();

  const [image, setImage] = useState("");

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
        title: "Editando post",
        text: "Espere por favor...",
        icon: "info",
        showConfirmButton: false,
      });
      setButtonState(true);
      let imageURL = "";
      const isAlreadyFirebase = isFirebaseStorageUrl(image);
      console.log(isAlreadyFirebase);
      if (isAlreadyFirebase) {
        imageURL = image;
      } else {
        imageURL = await storageServiceImg(image, "imagePost");
      }

      if (imageURL === "") {
        toast.dismiss("loading-toast");
        setButtonState(false);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Ha sucedido un error a la hora de subir la imagen",
          timer: 1200,
          showConfirmButton: false,
        });

        return;
      }

      let newData = {
        ...dataPost,
        src: imageURL,
        date: new Date().toISOString(),
      };

      await editarDocumentoPorID(currentUser.uid, id, newData);
      loading.close();
      await Swal.fire({
        title: "¡Éxito!",
        text: "¡Tu post ha sido editado!",
        icon: "success",
      });

      setButtonState(false);
      navigate("/myPosts");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al editar el post",
      });
      return;
    }
  };

  const getData = async () => {
    try {
      const data = await obtenerDocumentoPorID(currentUser.uid, id);
      setDataPost(data);
      setImage(data.src);
      setButtonState(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={sidebarState ? "page min-page" : "page"}>
      <div className="home-view">
        <Saludo currentUser={currentUser} msg={"Edit your post!"} />{" "}
        <CreatePostForm
          dataPost={dataPost}
          handleData={handleData}
          image={image}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          buttonState={buttonState}
          handleContent={handleContent}
          msgButton="Editar publicación"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditPostView;
