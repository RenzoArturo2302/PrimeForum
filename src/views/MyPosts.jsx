import React, { useContext, useEffect, useState } from "react";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";

import "../../src/styles.css";
//
import Saludo from "../components/Homeview/Saludo";
import PostListUser from "../components/Homeview/PostListUser";
//
//
import { auth } from "../config/Firebase";
import { useAuth } from "../contexts/AuthContext";
//
import {
  obtenerDocumentoPorUser,
  eliminarDocumentoPorID,
} from "../utils/realTimeDatabaseFunctions";
import Swal from "sweetalert2";

const MyPosts = () => {
  const [postsUser, setPostsUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(auth);
  const { sidebarState } = useContext(SidebarUnfolded);

  const getPostUser = async () => {
    const posts = await obtenerDocumentoPorUser(currentUser.uid);

    setPostsUser(posts);
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No serás capaz de recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      eliminarDocumentoPorID(currentUser.uid, id);
      await Swal.fire({
        title: "¡Éxito!",
        text: "¡Tu post ha sido eliminado!",
        icon: "success",
      });
      getPostUser();
    }
  };

  useEffect(() => {
    try {
      getPostUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={sidebarState ? "page min-page" : "page"}>
      <div className="home-view">
        <Saludo currentUser={currentUser} msg={"Check your posts!"} />
        <PostListUser
          postsUser={postsUser}
          loading={loading}
          handleEliminar={handleEliminar}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default MyPosts;
