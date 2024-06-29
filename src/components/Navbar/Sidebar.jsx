import React, { useContext, useState } from "react";
import "./sidebar.css";
import { DarkLightMode } from "../../contexts/DarkLightModeContext";
import { SidebarUnfolded } from "../../contexts/SidebarUnfoldedContext";
import { menuList, menuCond } from "../../utils/menuElements";
import { Link, useNavigate } from "react-router-dom";

// Para el logOut
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/Firebase";
// Se utilizó ion-icons https://ionic.io/ionicons
import imgUser from "../../assets/img/Default_pfp.png";

const Sidebar = () => {
  const { darkModeState, setDarkModeState } = useContext(DarkLightMode);
  // Estado para alterar el estilo de la sibedar. Classname condicional
  const { sidebarState, setSidebarState } = useContext(SidebarUnfolded);
  // Para mantener estado del navbar cuando no esta desplegado
  const [miniSidebarState, setMiniSidebarState] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const menuElements = menuList(currentUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={menuCond(sidebarState, miniSidebarState)}>
      <div
        className="menu"
        onClick={() => {
          setMiniSidebarState(!miniSidebarState);
        }}
      >
        <div className={miniSidebarState ? "change-display" : ""}>
          <ion-icon name="grid-outline"></ion-icon>
        </div>
        <div className={miniSidebarState ? "" : "change-display"}>
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </div>
      <div>
        <div
          className="logo"
          onClick={() => {
            setSidebarState(!sidebarState);
          }}
        >
          <ion-icon name="globe-outline"></ion-icon>
          <span className={!sidebarState ? "" : "dissapear"}>PRIME FORUM</span>
        </div>
        {currentUser ? (
          <Link to="/create-post">
            <button className="button-sidebar">
              <ion-icon name="add-outline"></ion-icon>
              <span className={!sidebarState ? "" : "dissapear"}>
                Nueva publicación
              </span>
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
      <nav className="Navbar">
        <ul>
          {menuElements.map(({ id, iconName, menuElementName, link }) => {
            return (
              <li key={id}>
                <Link to={link}>
                  <i></i>
                  <ion-icon name={iconName}></ion-icon>
                  <span className={!sidebarState ? "" : "dissapear"}>
                    {menuElementName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div>
        <div className="sidebar-linea"></div>
        <div className="dark-mode-sidebar">
          <div className="info">
            <ion-icon name="moon-outline"></ion-icon>
            <span className={!sidebarState ? "" : "dissapear"}>
              Modo oscuro
            </span>
          </div>
          <div
            className="switch-sidebar"
            onClick={() => {
              setDarkModeState(!darkModeState);
            }}
          >
            <div className="base">
              <div
                className={darkModeState ? "circle prendido" : "circle"}
              ></div>
            </div>
          </div>
        </div>
        <div className="usuario">
          {currentUser ? (
            <>
              <img src={imgUser} alt="" />
              <div className="info-usuario">
                <div className="nombre-email">
                  <span className="nombre">{currentUser.displayName}</span>
                  <span className="config">Configurar cuenta</span>
                </div>

                <ion-icon
                  name="log-out-outline"
                  onClick={handleLogout}
                ></ion-icon>
              </div>
            </>
          ) : (
            <>
              <div className="login-register">
                <Link to="/login">
                  <div className="login">
                    <ion-icon name="log-in-outline"></ion-icon>
                    <span className={!sidebarState ? "" : "dissapear"}>
                      Iniciar Sesión
                    </span>
                  </div>
                </Link>
                <Link to="/register">
                  <div className="register">
                    <ion-icon name="person-add-outline"></ion-icon>
                    <span className={!sidebarState ? "" : "dissapear"}>
                      Registrarse
                    </span>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
