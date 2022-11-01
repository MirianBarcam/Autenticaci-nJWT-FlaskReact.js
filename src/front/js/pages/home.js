import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleChangeEmail = (ev) => {
    actions.onchangeInputEmail(ev.target.value);
  };
  const handleChangePassword = (ev) => {
    actions.onchangeInputPassword(ev.target.value);
  };

  const handleRegisterUser = () => {
    localStorage.clear();
    const newUser = {
      email: store.inputEmailContent,
      password: store.inputPasswordContent,
    };
    if (newUser.email && newUser.password) {
      actions.registerUser(newUser);
    } else {
      alert("The fields must be complete");
    }
  };

  const handleLoginUser = () => {
    localStorage.clear();
    const newUser = {
      email: store.inputEmailContent,
      password: store.inputPasswordContent,
    };
    if (newUser.email && newUser.password) {
      actions.getLoginToken(newUser);

      setTimeout(function () {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/demo", {
            replace: true,
          }),
            [navigate];
        }
      }, 500);
    } else {
      alert("The fields must be complete");
    }
  };

  return (
    <div className="text-center mt-5 container">
      <div className="register-container">
        <h2 className="title">Enter your credentials</h2>
        <input
          maxLength={40}
          size={40}
          type="email"
          value={store.inputEmailContent}
          placeholder="Email"
          onChange={handleChangeEmail}
          className="input"
        />
        <input
          maxLength={40}
          size={40}
          type="Password"
          value={store.inputPasswordContent}
          placeholder="Password"
          onChange={handleChangePassword}
          className="input"
        />
        <button
          type="button"
          className="btn-register"
          data-bs-dismiss="modal"
          onClick={handleRegisterUser}
        >
          Register
        </button>
        <button
          type="button"
          className="btn-login"
          data-bs-dismiss="modal"
          onClick={handleLoginUser}
        >
          Login
        </button>
      </div>
    </div>
  );
};
