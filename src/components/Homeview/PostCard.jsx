import React from "react";
import { convertDateToLocal } from "../../utils/utils";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const PostCard = ({ dataPost, loading }) => {
  return (
    <>
      <div className="main-post-view">
        {!loading && dataPost.length > 0
          ? dataPost.map((obj) => {
              return (
                <div className="card" key={obj.id}>
                  <img src={obj.src} alt="" />
                  <div className="fondo"></div>
                  <div className="metadatos">
                    <div className="category-date">
                      <h2 className="category">
                        <Link to={`/categories/${obj.category}`}>
                          {obj.category}
                        </Link>
                      </h2>
                      <h3 className="date">{convertDateToLocal(obj.date)}</h3>
                    </div>

                    <h1 className="titulo">
                      <Link to={`/post-view/${obj.uid}/${obj.id}`}>
                        {obj.title}
                      </Link>
                    </h1>
                  </div>
                </div>
              );
            })
          : ""}

        {!loading & (dataPost.length == 0) ? (
          <div>Aún no ha creado publicaciones</div>
        ) : (
          ""
        )}
      </div>
      {loading ? (
        <div className="loader loader-up ">
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
    </>
  );
};

export default PostCard;
