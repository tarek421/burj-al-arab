import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import "./Login.css";
import { CreateUserWithEmailPassword, signInWithEmailPassword, firebaseInitialize, handleFacebookSignIn, handleGoogleSignIn } from "./LoginManager";

import {getAuth} from "firebase/auth";


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);


  const history = useHistory();
  const Location = useLocation();
  let { from } = Location.state || { from: { pathname: "/" } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const loading = toast.loading('Please wait...');
    const {name, email, password} = data;
    if(newUser && name && email && password){
      firebaseInitialize();
      CreateUserWithEmailPassword(name, email, password)
      .then(res => {
        toast.success("Successfully SignIn");
        toast.dismiss(loading);
      })
      .catch(err => {
        toast.error(err.message);
        toast.dismiss(loading);
      })
    };

    if(!newUser && email && password) {
      firebaseInitialize();
      signInWithEmailPassword(email, password)
      .then(res => {
        toast.dismiss(loading)
        handleResponse(res)
      })
      .catch(err => {
        toast.error(err.message);
        toast.dismiss(loading);
      })
    }
  }

  const HandleGoogleSignIn = (res) => {
    const loading = toast.loading('Please wait...');
    firebaseInitialize();
    handleGoogleSignIn(res)
    .then(res => {
      toast.dismiss(loading);
      handleResponse(res)
      })
      .catch((err) => {
        toast.dismiss(loading)
        toast.error(err.message);;
      });
  };

  const HandleFacebookSignIn = (res) => {
    const loading = toast.loading('Please wait...');
    firebaseInitialize();
    handleFacebookSignIn(res)
    .then(res => {
      toast.dismiss(loading);
      handleResponse(res)
      })
      .catch((err) => {
        toast.dismiss(loading)
        toast.error(err.message);;
      });
  }


const firebaseIdToken = () => {
  getAuth().currentUser.getIdToken(true)
  .then(function(idToken) {
    console.log(idToken);
    sessionStorage.setItem('idToken', idToken);
  }).catch(function(error) {
    console.log(error)
  });
}



  const handleResponse = (res) => {
    setLoggedInUser(res);
    toast.success("Successfully LogIn");
    firebaseIdToken();
    history.replace(from);
  }

  return (
    <div className="container">
      <div className="box-1">
        <div className="content-holder">
          <h2>Hello!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          <button onClick={() => setNewUser(!newUser)} className="button-1" >
            {newUser ? "Log In" : "Sign up"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box-2">
          <div className="login-form-container">
            <h1>Login Form</h1>

            {
              newUser && <input
              placeholder="Enter Your Name"
              {...register("name", {required: true })}
              required
            />
            }

            <input
              placeholder="Enter Your Email"
              {...register("email", { pattern: /\S+@\S+\.\S+/, required: true })}
            />
            {errors.email && <span className="wrong">Email is required</span>}

            <input style={{transition:"all 4s"}}
              placeholder="Enter Your Password"
              {...register("password", { pattern: /^(?=.*[a-z]).{8,}$/, required: true })}
            />
            {errors.password && (
              <span className="wrong">Password is required</span>
            )}

            <input className="login-button" type="submit" />

            <div className="social-login">
              <p>Login with</p>
              <br />
              <li onClick={HandleGoogleSignIn} className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </li>
              <li onClick={HandleFacebookSignIn} className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </li>
            </div>
          </div>
        </div>
        </form>
    </div>
  );
};

export default Login;
