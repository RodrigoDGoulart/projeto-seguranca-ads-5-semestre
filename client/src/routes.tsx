import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import UsuarioForm from "./pages/UsuarioForm";
import TermVerifier from "./components/TermVerifier";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TermVerifier page={<Login />} />} />
        <Route path='/usuarios' element={<TermVerifier page={<Usuarios />} />} />
        <Route path='/cadastro' element={<TermVerifier page={<UsuarioForm />} />} />
        <Route path='/perfil/:id' element={<TermVerifier page={<Perfil />} />} />
        <Route path='/editar/:id' element={<TermVerifier page={<UsuarioForm />} />} />
      </Routes>
    </BrowserRouter>
  );
}