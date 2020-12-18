import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import axios from 'axios';



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validationForm() {
    return setEmail.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    
    <div className="loginpage">
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Button block size="lg" type="submit" disables={!validationForm()}>
        Login
      </Button>
      </Form>
        
    </div>
  );
}

export default LoginPage;


