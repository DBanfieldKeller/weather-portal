import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../login/login";
import login from "../../utils/loginAPI";
import register from "../../utils/registerAPI";

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    name:"",
    username: "",
    password: ""
  });
  const [authMode, setAuthMode] = useState("login");
  const [errorMessage, setErrorMessage] = useState("")

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
  }

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

  const handleNameInput = (e) => setLoginInfo(prevLoginInfo=> {
    return {
      ...prevLoginInfo,
      name: e.target.value
    }
  })

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res) =>{
      console.log(typeof res.response)
      console.log(res)
      res.isError?setErrorMessage(res.response):setErrorMessage("")})
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(loginInfo)
    register({
      name: loginInfo.name,
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res)=>{
      res.isError?setErrorMessage(res.response):setErrorMessage("")
    })
  };
  
  // prevents error message from carrying over between login and register screens
  useEffect(()=>{
    setErrorMessage("")
  },[authMode])

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login to Goatnet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Goatnet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            loginInfo={loginInfo}
            authMode={authMode}
            errorMessage={errorMessage}
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