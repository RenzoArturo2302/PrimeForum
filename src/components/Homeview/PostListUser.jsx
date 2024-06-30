import React from "react";
import { convertDateToLocal } from "../../utils/utils";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const PostListUser = ({ postsUser, loading, handleEliminar, currentUser }) => {
  return (
    <div className="user-post">
      <h2 className="reep">REVISE, EDITE o ELIMINE sus publicaciones</h2>
      {!loading && postsUser.length > 0
        ? postsUser.map((obj) => {
            return (
              <div className="container" key={obj.id}>
                <div className="image-container">
                  <img src={obj.src} alt="" />
                </div>
                <div className="contenido">
                  <div className="fondo"></div>
                  <div className="title-category-date">
                    <div className="category-date">
                      <h2 className="category">
                        <Link to={`/categories/${obj.category}`}>
                          {obj.category}
                        </Link>
                      </h2>
                      <h3>{convertDateToLocal(obj.date)}</h3>
                    </div>
                    <h1 className="title">
                      <Link to={`/post-view/${currentUser.uid}/${obj.id}`}>
                        {obj.title}
                      </Link>
                    </h1>
                  </div>
                  <div className="edit-eliminate">
                    <Link to={`/edit-post/${obj.id}`} className="btn-edit">
                      <ion-icon name="create-outline"></ion-icon>
                    </Link>
                    <button
                      onClick={() => {
                        handleEliminar(obj.id);
                      }}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
      {loading ? (
        <div className="loader">
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
      {!loading & (postsUser.length == 0) ? (
        <div>Aún no ha creado publicaciones</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostListUser;
