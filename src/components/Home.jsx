import { Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";
import NavbarCustom from "./NavbarCustom";
import { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";

const Home = () => {
  const [clients, setClients] = useState(null);

  const [singleClient, setSingleClient] = useState(null);

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
        console.log(data);
        setClients(data.content);
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
      {clients && (
        <Row className="mt-5 justify-content-center">
          <Col>
            <h3>Lista clienti:</h3>
            <ListGroup>
              {clients.map((client, i) => {
                return (
                  <ListGroup.Item
                    key={i}
                    onClick={() => {
                      setSingleClient(client);
                    }}
                  >
                    {i + 1}-{client.contactName}
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
