import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListaFatture = ({ clientsList }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const [clientId, setClientId] = useState("");
  const [anno, setAnno] = useState(0);
  const [stato, setStato] = useState("");
  const [importo, setImporto] = useState({ min: 0, max: 0 });

  const [fatture, setFatture] = useState(null);

  const navigate = useNavigate();

  const checkChange = () => {
    let url = "";

    switch (selectedOption) {
      case "clientId":
        if (clientId !== "") {
          url = "http://localhost:3009/invoice/filter?clientId=" + clientId;
        }
        break;
      case "anno":
        if (anno !== 0) {
          url = "http://localhost:3009/invoice/filter/date?data=" + anno;
        }
        break;
      case "stato":
        if (stato !== "") {
          url = "http://localhost:3009/invoice/filter/state?state=" + stato;
        }
        break;
      case "importo":
        if (importo.min !== 0 && importo.max !== 0) {
          url =
            "http://localhost:3009/invoice/filter/imports?min=" +
            importo.min +
            "&max=" +
            importo.max;
        }
        break;
      default:
        break;
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

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    // Resetting other fields when a checkbox is selected
    switch (option) {
      case "clientId":
        setAnno(0);
        setStato("");
        setImporto({ min: 0, max: 0 });
        break;
      case "anno":
        setClientId("");
        setStato("");
        setImporto({ min: 0, max: 0 });
        break;
      case "stato":
        setClientId("");
        setAnno(0);
        setImporto({ min: 0, max: 0 });
        break;
      case "importo":
        setClientId("");
        setAnno(0);
        setStato("");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    checkChange();
  }, [selectedOption, clientId, anno, stato, importo]);

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
                  onChange={() => handleCheckboxChange("clientId")}
                  checked={selectedOption === "clientId"}
                  style={{ width: "80%" }}
                />
                {selectedOption === "clientId" && (
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
                )}
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per anno di emissione"
                  onChange={() => handleCheckboxChange("anno")}
                  checked={selectedOption === "anno"}
                  style={{ width: "80%" }}
                />
                {selectedOption === "anno" && (
                  <Form.Control
                    type="number"
                    placeholder="Anno"
                    onChange={(e) => {
                      setAnno(e.target.value);
                    }}
                  />
                )}
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per stato fattura"
                  onChange={() => handleCheckboxChange("stato")}
                  checked={selectedOption === "stato"}
                  style={{ width: "80%" }}
                />
                {selectedOption === "stato" && (
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
                )}
              </div>
              <div className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  label="Per fatturato (min e max)"
                  onChange={() => handleCheckboxChange("importo")}
                  checked={selectedOption === "importo"}
                  style={{ width: "50%" }}
                />
                {selectedOption === "importo" && (
                  <>
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
                  </>
                )}
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
                  <Button
                    className="mb-5 mt-2"
                    style={{ width: "20%" }}
                    onClick={() => {
                      navigate("/dettaglio_fattura/" + fattura.number);
                    }}
                  >
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

