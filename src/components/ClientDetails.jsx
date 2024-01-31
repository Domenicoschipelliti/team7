import { useEffect, useState } from "react";
import { Col, Card, ListGroup, Modal, Button } from "react-bootstrap";

const ClientDetails = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const [listaFattuire, setListaFatture] = useState(null);

  console.log(localStorage.getItem("tokenAdmin"));

  const getFattureCliente = () => {
    fetch("http://localhost:3009/invoice/filter?clientId=" + data.clientId, {
      headers: {
        Authorization: localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel recupero dati");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFattureCliente();
  }, [data]);

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
        <ListGroup className="list-group-flush">
          <ListGroup.Item
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Visualizza fatture di questo cliente
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {listaFattuire && (
        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          prop={listaFattuire}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {listaFattuire.length}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Col>
  );
};

export default ClientDetails;
