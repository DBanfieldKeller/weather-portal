import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../login/login";
import login from "../../utils/loginAPI";

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});

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
  })

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      username: loginInfo.username,
      password: loginInfo.password
    })
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login to Goatnet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login to Goatnet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
          loginInfo={loginInfo}
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput}
           />
        </Modal.Body>
        <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}>
          Login
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}