import React, { useContext, useEffect, useState } from "react";
import "../../src/styles.css";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";

//
import Saludo from "../components/Homeview/Saludo";
import PostCard from "../components/Homeview/PostCard";
//
import { auth } from "../config/Firebase";
import { useAuth } from "../contexts/AuthContext";

//
import { obtenerTodosLosDocumentos } from "../utils/realTimeDatabaseFunctions";
const HomeView = () => {
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(auth);
  const { sidebarState } = useContext(SidebarUnfolded);

  const getPosts = async () => {
    const allDocuments = await obtenerTodosLosDocumentos();
    setDataPost(allDocuments);
    setLoading(false);
  };

  useEffect(() => {
    try {
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={sidebarState ? "page min-page" : "page"}>
      <div className="home-view">
        <Saludo currentUser={currentUser} msg={"Welcome to PRIME FORUM!"} />
        <PostCard dataPost={dataPost} loading={loading} />
      </div>
    </div>
  );
};

export default HomeView;
