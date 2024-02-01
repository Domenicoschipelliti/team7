import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, ListGroup } from "react-bootstrap";

const ListaFatture = ({ clientsList }) => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const [clientId, setClientId] = useState("");

  const [anno, setAnno] = useState(0);

  const [stato, setStato] = useState("");

  const [importo, setImporto] = useState({
    min: 0,
    max: 0,
  });

  const [fatture, setFatture] = useState(null);

  const checkChange = () => {
    let url = "";

    if (checked && clientId !== "") {
      url = "http://localhost:3009/invoice/filter?clientId=" + clientId;
    }
    if (checked2 && anno !== 0) {
      url = "http://localhost:3009/invoice/filter/date?data=" + anno;
    }
    if (checked3 && stato !== "") {
      url = "http://localhost:3009/invoice/filter/state?state=" + stato;
    }
    if (checked4 && importo.min !== 0 && importo.max !== 0) {
      url =
        "http://localhost:3009/invoice/filter/imports?min=" +
        importo.min +
        "&max=" +
        importo.max;
    }

    fetch(url, {
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
        setFatture(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      (checked && clientId !== "") ||
      (checked2 && anno !== 0) ||
      (checked3 && stato !== "") ||
      (checked4 && importo.min !== 0 && importo.max !== 0)
    ) {
      checkChange();
    }
  }, []);

  return (
    <Col>
      <h3> Visualizza tutte le fatture presenti</h3>
      <Row>
        {clientsList && (
          <Col className="col-12">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                checkChange();
              }}
            >
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Per id cliente"
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                  style={{ width: "80%" }}
                />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setClientId(e.target.value);
                  }}
                >
                  <option>Open this select menu</option>
                  {clientsList.map((client, i) => {
                    return (
                      <option key={i} value={client.clientId}>
                        {client.clientId}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per anno di emissione"
                  style={{ width: "80%" }}
                  onChange={(e) => {
                    setChecked2(e.target.checked);
                  }}
                />
                <Form.Control
                  type="number"
                  placeholder="Anno"
                  onChange={(e) => {
                    setAnno(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per stato fattura"
                  style={{ width: "80%" }}
                  onChange={(e) => {
                    setChecked3(e.target.checked);
                  }}
                />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setStato(e.target.value);
                  }}
                >
                  <option value="Emessa">Emessa</option>
                  <option value="Pagata">Pagata</option>
                  <option value="Da%20Pagare">Da Pagare</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per fatturato (min e max)"
                  style={{ width: "50%" }}
                  onChange={(e) => {
                    setChecked4(e.target.checked);
                  }}
                />
                <Form.Control
                  type="number"
                  style={{ width: "29%" }}
                  placeholder="min"
                  className="mx-2"
                  onChange={(e) => {
                    setImporto({ min: e.target.value, max: importo.max });
                  }}
                />
                <Form.Control
                  type="number"
                  style={{ width: "29%" }}
                  placeholder="max"
                  onChange={(e) => {
                    setImporto({ max: e.target.value, min: importo.min });
                  }}
                />
              </div>
              <div className="mt-3">
                <Button type="submit">Cerca</Button>
              </div>
            </Form>
          </Col>
        )}
        {fatture && (
          <Col className="mt-5 col-md-8">
            <h3>Fatture selezionate:</h3>
            {fatture.map((fattura, i) => {
              return (
                <>
                  <Card key={i}>
                    <Card.Body>
                      <Card.Text>N. Fattura: {fattura.number}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Data emissione: {fattura.date}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Importo: {fattura.imports} €
                      </ListGroup.Item>
                      <ListGroup.Item>
                        id cliente: {fattura.client.clientId}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Stato fattura: {fattura.statoFattura}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <Button className="mb-5 mt-2" style={{ width: "20%" }}>
                    Modifica
                  </Button>
                </>
              );
            })}
          </Col>
        )}
      </Row>
    </Col>
  );
};

export default ListaFatture;
