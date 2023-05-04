import React from "react";
import Form from "react-bootstrap/Form";
import "./style.css"

export default function Login(props) {

  if (props.authMode === "login") {
    // login screen
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={props.loginInfo.username}
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
            value={props.loginInfo.password}
            onChange={props.handlePasswordInput} />
        </Form.Group>
        <div className="error-message">
          {props.errorMessage}
        </div>
        <div>
          {props.successMessage}
        </div>
        <br />
        <div>Not registered yet?{" "}
          <span id="link" onClick={props.changeAuthMode} >Sign Up</span>
        </div>
      </Form>
    );
  };

  // register screen
  return (
    <Form>
      <Form.Group className="mb-4" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={props.loginInfo.name}
          onChange={props.handleNameInput} />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={props.loginInfo.username}
          onChange={props.handleUsernameInput} />
        <Form.Text className="text-muted">
          Are you sure it's wise to give your name to a goat?
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="pwd"
          value={props.loginInfo.password}
          onChange={props.handlePasswordInput} />
      </Form.Group>
      <div className="error-message">
        {props.errorMessage}
      </div>
      <div>
        {props.successMessage}
      </div>
      <br />
      <div>Already registered?{" "}
        <span id="link" onClick={props.changeAuthMode} >Login</span>
      </div>
    </Form>
  )
}
