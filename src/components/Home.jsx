import { Col, Container, ListGroup, Navbar, Row, Form } from "react-bootstrap";
import NavbarCustom from "./NavbarCustom";
import { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";

const Home = () => {
  const [clients, setClients] = useState(null);

  const [singleClient, setSingleClient] = useState(null);

  const [parametri, setparametri] = useState({
    page: 0,
    size: 10,
    order: "clientId",
  });

  console.log(parametri);

  const getAllClients = () => {
    fetch(
      "http://localhost:3009/clients" +
        "?page=" +
        parametri.page +
        "&size=" +
        parametri.size +
        "&order=" +
        parametri.order,
      {
        headers: {
          Authorization: localStorage.getItem("tokenAdmin"),
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel caricamento dei dati");
        }
      })
      .then((data) => {
        console.log(data);
        setClients(data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllClients();
  }, [parametri]);

  return (
    <Container fluid>
      <NavbarCustom />
      {clients && (
        <Row className="mt-5 justify-content-center">
          <Col>
            <h3>Lista clienti:</h3>
            <div className="d-flex mb-3 align-items-center">
              <div>
                {" "}
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setparametri({
                      size: parseInt(e.target.value),
                      page: parametri.page,
                      order: parametri.order,
                    });
                  }}
                >
                  <option value="10">Numero elementi</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Select>
              </div>
              <div>
                <Form.Control
                  type="number"
                  placeholder="N. Pagina"
                  onChange={(e) => {
                    setparametri({
                      size: parametri.size,
                      page: parseInt(e.target.value),
                      order: parametri.order,
                    });
                  }}
                />
              </div>
              <div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setparametri({
                      size: parametri.size,
                      page: parametri.page,
                      order: e.target.value,
                    });
                  }}
                >
                  <option>Ordina per:</option>
                  <option value="revenue">Fatturato</option>
                  <option value="contactName">Nome contatto</option>
                  <option value="registerDate">Data registrazione</option>
                  <option value="lastcontactDate">Data ult. contatto</option>
                  <option value="addressList.province.nomeProvincia">
                    Prov. Sede legale
                  </option>
                </Form.Select>
              </div>
            </div>
            <ListGroup>
              {clients.map((client, i) => {
                return (
                  <ListGroup.Item
                    className="d-flex justify-content-between"
                    key={i}
                    onClick={() => {
                      setSingleClient(client);
                    }}
                  >
                    {i + 1}-{client.contactName}
                    {client.addressList && (
                      <p>
                        {client.addressList.length > 0
                          ? client.addressList[0].province.nomeProvincia
                          : ""}
                      </p>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          {singleClient && <ClientDetails data={singleClient} />}
        </Row>
      )}
    </Container>
  );
};

export default Home;
