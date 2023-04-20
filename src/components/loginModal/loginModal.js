import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../login/login";
import SearchHistory from "../searchHistory/searchHistory";
import login from "../../utils/loginAPI";
import register from "../../utils/registerAPI";
import verify from "../../utils/verifyAPI";

export default function LoginModal(props) {
  const [show, setShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    username: "",
    password: ""
  });
  const [authMode, setAuthMode] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // toggle between login and register screens
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  // open and close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUsernameInput = (e) => setLoginInfo(prevLoginInfo => {
    return {
      ...prevLoginInfo,
      username: e.target.value
    };
  });

  const handlePasswordInput = (e) => setLoginInfo(prevLoginInfo => {
    return {
      ...prevLoginInfo,
      password: e.target.value
    }
  });

  const handleNameInput = (e) => setLoginInfo(prevLoginInfo => {
    return {
      ...prevLoginInfo,
      name: e.target.value
    }
  })

  // login function, sets welcome and error messages, sets token in session storage
  const handleLogin = (e) => {
    e.preventDefault();
    login({
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res) => {
      console.log(typeof res.response);
      console.log(res);
      if (res.isError) {
        setErrorMessage(res.response);
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage(`Welcome baa'ck ${res.username}!`);
        setIsLoggedIn(true);
        window.sessionStorage.setItem("token", res.token);
      }
    })
  };

  // register function, sets success and error messages
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(loginInfo)
    register({
      name: loginInfo.name,
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res) => {
      if (res.isError) {
        setErrorMessage(res.response);
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Successfully registered!");
      }
    })
  };

  // verify token function
  const verifyToken = () => {
    const token = window.sessionStorage.getItem("token");
    console.log(token);
    verify(token)
      .then((res) => {
        console.log(res);
        res.data?.verified ? setIsLoggedIn(true) : setIsLoggedIn(false);
        console.log(isLoggedIn)
      })

  };

  // logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.removeItem("token");
  };

  // prevents error and success message from carrying over between login and register screens
  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, [authMode]);

  // check for and verify token on page load
  useEffect(() => verifyToken(), [])

  return (
    <>
      <div>
        {isLoggedIn ?
          <Button
            variant="outline-danger"
            onClick={handleLogout}>
            Logout
          </Button>:
            <Button
            variant="primary"
            onClick={handleShow}>
            Login to Goatnet
          </Button>}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Goatnet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            loginInfo={loginInfo}
            authMode={authMode}
            errorMessage={errorMessage}
            successMessage={successMessage}
            changeAuthMode={changeAuthMode}
            handleUsernameInput={handleUsernameInput}
            handlePasswordInput={handlePasswordInput}
            handleNameInput={handleNameInput}

          />
        </Modal.Body>
        <Modal.Footer>
          {authMode === "login" ?
            <Button
              variant="primary"
              type="submit"
              onClick={handleLogin}>
              Login
            </Button> :
            <Button
              variant="primary"
              type="submit"
              onClick={handleRegister}>
              Register
            </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}