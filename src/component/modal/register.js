import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoginAuth from "./login";

import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function RegisterAuth() {
  const [message, setMessage] = useState(null);
  const [alertRegister, setAlertRegister] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const {email, password, name } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      if (response.data.status === "200") {
        navigate(<LoginAuth/>);
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setAlertRegister(alert);
        setForm({
          email: "",
          password: "",
          name: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="">
            Failed Register
          </Alert>
        );
        setAlertRegister(alert);
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="">
          Failed Register
        </Alert>
      );
      setAlertRegister(alert);
      console.log(error);
    }
  });

  return (
    <div>
    {alertRegister && alertRegister}
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
      
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            style={{ borderColor: "brown" }}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            value={password}
            style={{ borderColor: "brown" }}
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={name}
            placeholder="name"
            style={{ borderColor: "brown" }}
            autoFocus
          />
        </Form.Group>
        <Button type="submit" style={{ width: "100%" }} className="btn btn-auth-brown">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterAuth;
