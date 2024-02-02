import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import NavbarCustom from "./NavbarCustom";

const PaginaClienti = () => {
  const [businessType, setBusinessType] = useState("");
  const [P_IVA, setP_IVA] = useState("");
  const [email, setEmail] = useState("");
  const [lastcontactDate, setLastcontactDate] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [PEC, setPEC] = useState("");
  const [companyNumber, setCompanyNumber] = useState(0);
  const [contactMail, setContactMail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactSurname, setContactSurname] = useState("");
  const [contactNumber, setContactNumber] = useState(0);

  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [provinciaCode, setProvinciaCode] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [idCity, setIdCity] = useState(0);

  const [clientid, setClientId] = useState(null);
  const [datiProvince, setDatiprovince] = useState(null);
  const [datComuni, setDatiComuni] = useState(null);

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);

  const payloadCliente = {
    businessType: businessType,
    P_IVA: P_IVA,
    email: email,
    lastcontactDate: lastcontactDate,
    revenue: revenue,
    PEC: PEC,
    companyNumber: companyNumber,
    contactMail: contactMail,
    contactName: contactName,
    contactSurname: contactSurname,
    contactNumber: contactNumber,
  };

  const addresspayload = {
    street: street,
    houseNumber: houseNumber,
    provincia_code: provinciaCode,
    zipCode: zipCode,
    id_city: idCity,
    client_id: clientid,
  };

  console.log(localStorage.getItem("tokenAdmin"));

  const saveClient = () => {
    fetch("http://localhost:3009/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenAdmin"),
      },
      body: JSON.stringify(payloadCliente),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel salvataggio dei dati");
        }
      })
      .then((data) => {
        setShow(!show);
        setClientId(data.clientId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getALLProvinces = () => {
    fetch("http://localhost:3009/province/all", {
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
        setDatiprovince(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComunes = (param) => {
    fetch("http://localhost:3009/province/" + param, {
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
        setDatiComuni(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveAddress = () => {
    fetch("http://localhost:3009/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenAdmin"),
      },
      body: JSON.stringify(addresspayload),
    })
      .then((res) => {
        if (res.ok) {
          setShow2(!show2);
          console.log("salvato!");
        } else {
          throw new Error("errore nel salvataggio dei dati");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getALLProvinces();
  }, []);

  return (
    <Container className="pb-4">
      <NavbarCustom />
      <Row className="flex-column">
        <h3>Registra un nuovo cliente</h3>
        <Col>
          <p className="mb-3">Dati anagrafici</p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              saveClient();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Tipo Business</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es. SPA, SRL.."
                onChange={(e) => setBusinessType(e.target.value)}
                value={businessType}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Partita IVA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es. 1278ABG"
                onChange={(e) => setP_IVA(e.target.value)}
                value={P_IVA}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data ultimo contatto</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setLastcontactDate(e.target.value)}
                value={lastcontactDate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fatturato</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setRevenue(e.target.value)}
                value={revenue}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PEC</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setPEC(e.target.value)}
                value={PEC}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero tel. azienda</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setCompanyNumber(e.target.value)}
                value={companyNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email contatto</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setContactMail(e.target.value)}
                value={contactMail}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setContactName(e.target.value)}
                value={contactName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setContactSurname(e.target.value)}
                value={contactSurname}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero tel. contatto</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setContactNumber(e.target.value)}
                value={contactNumber}
              />
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
              <Button type="submit">Salva Dati</Button>
            )}
          </Form>
        </Col>
        <hr className="my-4"></hr>
        {datiProvince && (
          <Col>
            <p className="mb-3">Indirizzo</p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                saveAddress();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Via</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numero civico</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setHouseNumber(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  getComunes(e.target.value);
                  setProvinciaCode(e.target.value);
                }}
              >
                <option>Provincia</option>
                {datiProvince.map((prov, i) => {
                  return (
                    <option key={i} value={prov.provinceCode}>
                      {prov.nomeProvincia}
                    </option>
                  );
                })}
              </Form.Select>
              {datComuni ? (
                <Form.Select
                  className="mt-3"
                  onChange={(e) => {
                    setIdCity(e.target.value);
                  }}
                >
                  <option>Comune</option>
                  {datComuni.map((comune, i) => {
                    return (
                      <option key={i} value={comune.id}>
                        {comune.name}
                      </option>
                    );
                  })}
                </Form.Select>
              ) : (
                <Form.Select className="mt-3">
                  <option>Comune</option>
                </Form.Select>
              )}

              <Form.Group className="mb-3">
                <Form.Label>CAP</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </Form.Group>
              {show2 ? (
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
                <Button type="submit">Salva Indirizzo</Button>
              )}
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PaginaClienti;
