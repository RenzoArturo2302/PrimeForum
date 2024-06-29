import { Link } from "react-router-dom";
import "./loginform.css";

const LoginForm = ({ handleValues, values, handleLogin }) => {
  return (
    <div className="container-login">
      <Link to="/" className="regresar">
        <ion-icon name="arrow-back-outline"></ion-icon>
        <span>Inicio</span>
      </Link>
      <div className="login-form ">
        <div className="logo">
          <ion-icon name="globe-outline"></ion-icon>
          <span>Prime Forum</span>
        </div>
        <form onSubmit={handleLogin}>
          {/*   <form onSubmit={handleSubmit}> */}
          <h1>Welcome!</h1>
          <h3>Ingresa a tu cuenta</h3>
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
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleValues}
              required
            />
          </div>

          <div className="link-register">
            <span>
              ¿Ya tienes una cuenta? <Link to="/register">Registrar</Link>
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
