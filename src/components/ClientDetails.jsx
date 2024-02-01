import { useEffect, useState } from "react";
import { Col, Card, ListGroup, Modal, Button } from "react-bootstrap";

const ClientDetails = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const [listaFattuire, setListaFatture] = useState(null);

  console.log(localStorage.getItem("tokenAdmin"));

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
    </Col>
  );
};

export default ClientDetails;
