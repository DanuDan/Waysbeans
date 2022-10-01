import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function LoginAuth() {
  const [state, dispatch] = useContext(UserContext);
  const [alertLogin, setAlertLogin] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const navigate = useNavigate();

  console.log(state);

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

      // Data body

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", Body, config);

      console.log(response.data.data);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status == "admin") {
          navigate("/IncomeTransaction");
        } else {
          navigate("/");
        }
      }
    } catch(error) {
      const alertLogin = (
          <Alert variant='danger' className=''>
              Failed Login
          </Alert>
      );
      setAlertLogin(alertLogin);
      console.log(error);
  }
  });

  // console.log(state.isLogin);

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
      {alertLogin && alertLogin}
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ borderColor: "brown" }}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ borderColor: "brown" }}
            autoFocus
          />
        </Form.Group>

        <Button type="submit" style={{ width: "100%"}} className="btn btn-auth-brown">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginAuth;
