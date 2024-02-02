import { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarCustom from "./NavbarCustom";

const DettaglioFattura = () => {
  const urlParams = useParams();

  const [dettaglio, setDettaglio] = useState(null);

  const [show, setShow] = useState(false);

  const [date, setDate] = useState(dettaglio ? dettaglio.date : "");
  const [importo, setImport] = useState(dettaglio ? dettaglio.imports : 0);
  const [stato, setStato] = useState(dettaglio ? dettaglio.statoFattura : "");

  const payload = {
    date: date,
    imports: importo,
    statoFattura: stato,
  };

  const getInvoiceDetails = () => {
    fetch("http://localhost:3009/invoice/" + urlParams.idFattura, {
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
        setDettaglio(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyInvoice = () => {
    fetch("http://localhost:3009/invoice/" + urlParams.idFattura, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenAdmin"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          console.log("dati modificati!" + res);
          setShow(true);
        } else {
          throw new Error("errore nel salvataggio dei dati");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInvoiceDetails();
  }, [urlParams]);

  return (
    <Container fluid>
      <NavbarCustom></NavbarCustom>
      {dettaglio !== null && (
        <>
          <p className="my-3">ID Fattura: {dettaglio.number}</p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              modifyInvoice();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Data emissione</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Importo</Form.Label>
              <Form.Control
                type="number"
                value={importo}
                onChange={(e) => {
                  setImport(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stato fattura</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={stato}
                onChange={(e) => {
                  setStato(e.target.value);
                }}
              >
                <option>Seleziona uno stato</option>
                <option value="Emessa">Emessa</option>
                <option value="Pagata">Pagata</option>
                <option value="Da pagare">Da Pagare</option>
              </Form.Select>
            </Form.Group>
            {show ? (
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
                Salva
              </Button>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

export default DettaglioFattura;
