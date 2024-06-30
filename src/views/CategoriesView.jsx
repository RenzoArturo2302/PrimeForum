import React, { useContext, useState, useEffect } from "react";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";
import "../../src/styles.css";
//
import Saludo from "../components/Homeview/Saludo";
import PostCard from "../components/Homeview/PostCard";
//
//
import { auth } from "../config/Firebase";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
//
import { obtenerTodosLosDocumentosPorCategoria } from "../utils/realTimeDatabaseFunctions";

const CategoriesView = () => {
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sidebarState } = useContext(SidebarUnfolded);
  const { category } = useParams();

  const getPosts = async () => {
    const allDocuments = await obtenerTodosLosDocumentosPorCategoria(category);
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
        <Saludo msg={category} />{" "}
        <PostCard dataPost={dataPost} loading={loading} />
      </div>
    </div>
  );
};

export default CategoriesView;
