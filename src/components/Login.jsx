import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const bodyToUse = {
    email: email,
    password: password,
  };

  const serverLogin = () => {
    fetch("http://localhost:3009/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToUse),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/home");
          return res.json();
        } else {
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("tokenAdmin", "Bearer " + data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = localStorage.getItem("tokenAdmin");

  console.log(token);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                serverLogin();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;