import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";
import Home from "./components/Home";
import GestioneFatture from "./components/GestioneFatture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrazione" element={<Registrazione />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fatture" element={<GestioneFatture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
