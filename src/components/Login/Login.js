import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { firebaseInitialize, handleGoogleSignIn } from "./LoginManager";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  console.log(loggedInUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onSubmit2 = (data) => console.log(data);

  const signup = () => {
    document.querySelector(".login-form-container").style.cssText =
      "display: none;";
    document.querySelector(".signup-form-container").style.cssText =
      "display: block;";
    document.querySelector(".container").style.cssText =
      "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";
  };

  const login = () => {
    document.querySelector(".signup-form-container").style.cssText =
      "display: none;";
    document.querySelector(".login-form-container").style.cssText =
      "display: block;";
    document.querySelector(".container").style.cssText =
      "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";
  };

  const HandleGoogleSignIn = (res) => {
    firebaseInitialize();
    handleGoogleSignIn(res)
      .then((res) => setLoggedInUser(res))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div class="container">
      <div class="box-1">
        <div class="content-holder">
          <h2>Hello!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          <button class="button-1" onClick={signup}>
            Sign up
          </button>
          <button class="button-2" onClick={login}>
            Login
          </button>
          <img src="../images/Double.png" alt="" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="box-2">
          <div class="login-form-container">
            <h1>Login Form</h1>
            <input
              placeholder="Enter Your Email"
              {...register("Email", { required: true })}
            />
            {errors.Email && <span className="wrong">Name is required</span>}

            <input
              placeholder="Enter Your Name"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="wrong">Password is required</span>
            )}


            <input class="login-button" type="submit" />

            <div className="social-login">
              <p>Login with</p>
              <br />
              <li onClick={HandleGoogleSignIn} className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </li>
              <li className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </li>
            </div>
          </div>
        </div>
        </form>

        <form onSubmit={handleSubmit(onSubmit2)}>
        <div class="signup-form-container">
          <h1>Sign Up Form</h1>
          <input
            placeholder="Enter Your Name"
            {...register("Name", { required: true })}
          />
          {errors.Name && <span className="wrong">Name is required</span>}
          <br />

          <input
            placeholder="Enter Your Name"
            {...register("Name", { required: true })}
          />
          {errors.Name && <span className="wrong">Name is required</span>}

          <br />
          <input
            placeholder="Enter Your Name"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="wrong">Password is required</span>
          )}

          <br />
          <input class="signup-button" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
