import React from "react";
import "./home-view.css";

const Saludo = ({ currentUser, msg }) => {
  return (
    <div className="saludo-hv">
      {currentUser ? (
        <h1>
          <span className="username">{currentUser.displayName}</span>, {msg}
        </h1>
      ) : (
        <h1> {msg}</h1>
      )}
    </div>
  );
};

export default Saludo;
