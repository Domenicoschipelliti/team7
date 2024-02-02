import { Col, Container, Alert, Row, Form, Button } from "react-bootstrap";
import NavbarCustom from "./NavbarCustom";
import { useEffect, useState } from "react";
import ListaFatture from "./ListaFatture";

const GestioneFatture = () => {
  const [clients, setClients] = useState(null);
  console.log(clients);

  const [clientSelected, setClientSelected] = useState(null);
  const [date, setDate] = useState(null);
  const [importo, setImporto] = useState(null);

  const [showCheck, setShowCheck] = useState(false);

  const payload = {
    client_id: clientSelected,
    date: date,
    imports: importo,
  };

  const getAllClients = () => {
    fetch("http://localhost:3009/clients", {
      headers: {
        Authorization: localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        setClients(data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveFattura = () => {
    fetch("http://localhost:3009/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenAdmin"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          setShowCheck(!showCheck);
        } else {
          throw new Error("errore nel salvataggio");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <Container fluid>
      <NavbarCustom />
      <Row className="flex-column">
        <Col>
          {clients && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                saveFattura();
              }}
            >
              <h3>Inserisci nuova fattura:</h3>
              <Form.Label>P.IVA Cliente</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setClientSelected(e.target.value);
                }}
              >
                <option>Seleziona cliente</option>
                {clients.map((client, i) => {
                  return (
                    <option key={i} value={client.clientId}>
                      {client.p_IVA}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Group
                className="mb-3"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              >
                <Form.Label>Data inserimento</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                onChange={(e) => {
                  setImporto(e.target.value);
                }}
              >
                <Form.Label>Importo</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              {showCheck ? (
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
                <Button className="btn-success" type="submit">
                  Salva Fattura
                </Button>
              )}
            </Form>
          )}
        </Col>
        <ListaFatture clientsList={clients} />
      </Row>
    </Container>
  );
};

export default GestioneFatture;
