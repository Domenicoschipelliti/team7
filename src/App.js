import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";
import Home from "./components/Home";
import GestioneFatture from "./components/GestioneFatture";
import DettaglioFattura from "./components/DettaglioFattura";
import PaginaClienti from "./components/PaginaClienti";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrazione" element={<Registrazione />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fatture" element={<GestioneFatture />} />
        <Route
          path="/dettaglio_fattura/:idFattura"
          element={<DettaglioFattura />}
        />
        <Route path="/clienti" element={<PaginaClienti />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
