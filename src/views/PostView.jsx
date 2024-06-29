import React, { useContext, useEffect, useState } from "react";
import { SidebarUnfolded } from "../contexts/SidebarUnfoldedContext";

//
import { ColorRing } from "react-loader-spinner";

//
import { useParams } from "react-router";
//
import { obtenerDocumentoPorID } from "../utils/realTimeDatabaseFunctions";
import parse from "html-react-parser";
//
import { convertDateToLocal } from "../utils/utils";

const PostView = () => {
  const { sidebarState } = useContext(SidebarUnfolded);
  const [loading, setLoading] = useState(true);
  const { uid, id } = useParams();
  const [dataPost, setDataPost] = useState({
    title: "",
    src: "",
    category: "",
    date: "",
    content: "",
  });

  const getData = async () => {
    try {
      const data = await obtenerDocumentoPorID(uid, id);
      setDataPost(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={sidebarState ? "page min-page" : "page"}>
      <div className="home-view">
        {!loading ? (
          <div className="post-view">
            <h1>{dataPost.title}</h1>

            <h2>{dataPost.category}</h2>
            <h3>{convertDateToLocal(dataPost.date)}</h3>

            <div className="img-post">
              <img
                src={dataPost.src}
                style={{ maxWidth: "800px", height: "auto" }}
              />
            </div>
            <div className="content-post-view">{parse(dataPost.content)}</div>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="loader-two">
            <ColorRing
              visible={true}
              height="150"
              width="150"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostView;
