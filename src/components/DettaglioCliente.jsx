import { useEffect, useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Row,
  Col,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarCustom from "./NavbarCustom";

const DettaglioCLiente = () => {
  const urlParams = useParams();

  const [cliente, setCliente] = useState(null);

  const [image, setImage] = useState(null);

  const [uploaded, setUploade] = useState(false);

  console.log(image);

  const data = new FormData();
  if (image) {
    data.append("image", image[0]);
  }

  const getClientdata = () => {
    fetch("http://localhost:3009/clients/" + urlParams.idCliente, {
      headers: {
        Authorization: localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dati");
        }
      })
      .then((data) => {
        console.log(data);
        setCliente(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = () => {
    fetch("http://localhost:3009/clients/" + urlParams.idCliente + "/upload", {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("tokenAdmin"),
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la richiesta");
        }
        setUploade(!uploaded);
        return response.json();
      })
      .catch((error) => {
        console.error("Si è verificato un errore durante la richiesta:", error);
      });
  };

  useEffect(() => {
    getClientdata();
  }, [uploaded]);

  return (
    <Container>
      <NavbarCustom />
      <Row>
        <h3>Dettagli cliente:</h3>
        <Col className="col-md-8">
          {" "}
          {cliente && (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={cliente.businessLogo} />
              <Card.Body>
                <Card.Title>{cliente.email}</Card.Title>
                <Card.Text>
                  <p>P.IVA: {cliente.p_IVA}</p>
                  <p>Tipo: {cliente.businessType}</p>
                  <p>Numero tel: {cliente.companyNumber}</p>
                  <p>Mail: {cliente.contactMail}</p>
                  <p>Name: {cliente.contactName}</p>
                  <p>Surname: {cliente.contactSurname}</p>
                  <p>Fatturato: {cliente.revenue}</p>
                  <p>Id cliente:: {cliente.clientId}</p>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush"></ListGroup>
            </Card>
          )}
        </Col>
      </Row>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          uploadImage();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Seleziona avatar cliente</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setImage(e.target.files);
            }}
          />
        </Form.Group>
        {uploaded ? (
          <div className="success-animation d-flex justify-content-start">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        ) : (
          <Button type="submit">Upload</Button>
        )}
      </Form>
    </Container>
  );
};

export default DettaglioCLiente;
