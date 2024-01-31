import { Col, Container, Alert, Row, Form, Button } from "react-bootstrap";
import NavbarCustom from "./NavbarCustom";
import { useEffect, useState } from "react";

const GestioneFatture = () => {
  const [clients, setClients] = useState(null);
  console.log(clients);
  const [show, setShow] = useState(false);

  const [clientSelected, setClientSelected] = useState(null);
  const [date, setDate] = useState(null);
  const [importo, setImporto] = useState(null);

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
          setShow(true);
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
                    <option value={client.clientId}>{client.p_IVA}</option>
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
              <Button className="btn-success" type="submit">
                Salva Fattura
              </Button>
            </Form>
          )}
        </Col>
        <Col className="mt-4">
          <Alert
            variant="success"
            onClose={() => setShow(!show)}
            dismissible
            show={show}
          >
            <Alert.Heading>Gestione Fatture</Alert.Heading>
            <p>Fattura salvata con successo</p>
          </Alert>
        </Col>
        <Col>{/* DA INSERIRE GESTIONE FATTURE ESISTENTI */}</Col>
      </Row>
    </Container>
  );
};

export default GestioneFatture;
