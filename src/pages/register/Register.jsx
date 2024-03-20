import React, { useState } from "react";
import { auth, database, googleProvider, refdb } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { update } from "firebase/database";
import "./style.scss";
import BackgroundImage3 from "../../assets/Screenshot 2024-03-20 171703.png";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (userName == "") {
      setErr("Username cannot be empty");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setErr("");
        setEmail("");
        setPassword("");
        setUserName("");

        await updateProfile(userCredential.user, {
          displayName: userName,
        });

        await update(refdb(database, "user/" + userCredential.user.uid), {
          userName,
          email,
        });

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setErr(errorMessage);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setErr("");
        setEmail("");
        setPassword("");

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setErr(errorMessage);
      });
  };

  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErr("");
        alert("Password reset link send to the email address");
      })
      .catch((error) => {
        const errorMessage = error.message.substring(
          22,
          error.message.length - 2
        );
        setErr(errorMessage);
      });
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider).then(async (userCredential) => {
      setErr("");
      await update(refdb(database, "user/" + userCredential.user.uid), {
        userName: userCredential.user.displayName,
        email: userCredential.user.email,
      });

      navigate("/");
    });
  };

  const handleSwitchMode = () => {
    setLogin((prev) => !prev);
    setEmail("");
    setPassword("");
    setUserName("");
    setErr("");
  };

  return (
    <div className="register">
      <div className="wrapper">
        <img src={BackgroundImage3} />
      </div>
      <div className="name">ShortestPathFinder</div>
      <div className="mode">{login ? "Login" : "Signup"}</div>
      <div className="content">
        <form onSubmit={login ? (e) => handleLogin(e) : (e) => handleSignup(e)}>
          {!login && (
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {login && (
            <span onClick={handleForgetPassword}>Forget Password ?</span>
          )}
          <button>{login ? "Login" : "SignUp"}</button>

          {err && <p>{err}</p>}
        </form>

        {login ? (
          <p className="registerState">
            Not a member ?<span onClick={handleSwitchMode}> SignUp</span>
          </p>
        ) : (
          <p className="registerState">
            Already a member ?<span onClick={handleSwitchMode}> Login</span>
          </p>
        )}

        <div className="icon" onClick={handleGoogleAuth}>
          <FaGoogle />
        </div>
      </div>
    </div>
  );
};

export default Register;
