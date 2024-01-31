import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../image/luce.png";
import { useNavigate } from "react-router-dom";
const NavbarCustom = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-primary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Nav.Link>
              <NavDropdown title="Categorie" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/fatture");
                  }}
                >
                  Fatture
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/clienti");
                  }}
                >
                  Clienti
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  Utenti
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavbarCustom;
