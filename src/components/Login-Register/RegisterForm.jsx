import { Link } from "react-router-dom";
import "./loginform.css";

const RegisterForm = ({ handleValues, values, handleSignup }) => {
  return (
    <div className="container-login ">
      <Link to="/" className="regresar">
        <ion-icon name="arrow-back-outline"></ion-icon>
        <span>Inicio</span>
      </Link>

      <div className="login-form register">
        <div className="logo">
          <ion-icon name="globe-outline"></ion-icon>
          <span>Prime Forum</span>
        </div>
        <form onSubmit={handleSignup}>
          {/*   <form onSubmit={handleSubmit}> */}
          <h1>Welcome!</h1>
          <h3>Registra tu cuenta</h3>
          <div className="password">
            <label htmlFor="password">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={values.confirmPassword}
              onChange={handleValues}
              required
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={values.email}
              onChange={handleValues}
              required
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>{" "}
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleValues}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="link-register">
            <span>
              ¿No tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </span>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
