import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { login } from "../../utils/loginAPI";

export default function Login(props) {

  const [authMode, setAuthMode] = useState("login");
  

  const changeAuthMode =() => {
    setAuthMode(authMode === "login"?"register":"login")
  }

  if (authMode === "login") {
  // login screen
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={props.handleUsernameInput} />
          <Form.Text className="text-muted">
            Are you sure it's wise to give your name to a goat?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="pwd"
            onChange={props.handlePasswordInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check inline="true" type="checkbox" label="Remember Me" />
        </Form.Group>
        <div>Not registered yet? 
          <span id="link" onClick={changeAuthMode} >Sign Up</span>
        </div>
      </Form>
    );
  };

// register screen
  return(
    <Form>
       <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="name"
        placeholder="Name"
        name="name"
        onChange={props.handlePasswordInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Username"
        name="username"
        onChange={props.handleUsernameInput} />
      <Form.Text className="text-muted">
        Are you sure it's wise to give your name to a goat?
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        name="pwd"
        onChange={props.handlePasswordInput} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check inline="true" type="checkbox" label="Remember Me" />
    </Form.Group>
    <div>Already registered? 
          <span id="link" onClick={changeAuthMode} >Login</span>
        </div>
    <Button variant="primary" type="submit">
      Register
    </Button>
  </Form>
  )
}
