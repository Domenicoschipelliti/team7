import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Registrazione = () => {
  const [emailUsed, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const payload = {
    email: emailUsed,
    name: name,
    surname: surname,
    username: username,
    password: password,
  };

  const registerUser = () => {
    fetch("http://localhost:3009/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        console.log(data);
        alert("registrato correttamente!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Registrati</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            >
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
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
  );
};

export default Registrazione;
