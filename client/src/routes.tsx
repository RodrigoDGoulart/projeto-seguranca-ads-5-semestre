import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import UsuarioForm from "./pages/UsuarioForm";
import TermVerifier from "./components/TermVerifier";
import Header from "./components/Header";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TermVerifier page={<Login />} />} />
        <Route path='/usuarios' element={<TermVerifier page={<Header element={<Usuarios />} />} />} />
        <Route path='/cadastro' element={<TermVerifier page={<Header element={<UsuarioForm />} />} />} />
        <Route path='/perfil/:id' element={<TermVerifier page={<Header element={<Perfil />} />} />} />
        <Route path='/editar-dados' element={<TermVerifier page={<Header element={<UsuarioForm />} />} />} />
      </Routes>
    </BrowserRouter>
  );
}