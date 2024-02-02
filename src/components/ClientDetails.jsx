import { useEffect, useState } from "react";
import { Col, Card, ListGroup, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClientDetails = ({ data }) => {
  console.log(localStorage.getItem("tokenAdmin"));

  const navigate = useNavigate();

  return (
    <Col>
      <h3>Dettagli cliente:</h3>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={data.businessLogo} />
        <Card.Body>
          <Card.Title>{data.email}</Card.Title>
          <Card.Text>
            <p>P.IVA: {data.p_IVA}</p>
            <p>Tipo: {data.businessType}</p>
            <p>Numero tel: {data.companyNumber}</p>
            <p>Mail: {data.contactMail}</p>
            <p>Name: {data.contactName}</p>
            <p>Surname: {data.contactSurname}</p>
            <p>Fatturato: {data.revenue}</p>
            <p>Id cliente:: {data.clientId}</p>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush"></ListGroup>
      </Card>
      <Button
        onClick={() => {
          navigate("/dettaglio_cliente/" + data.clientId);
        }}
      >
        Modifica
      </Button>
    </Col>
  );
};

export default ClientDetails;
