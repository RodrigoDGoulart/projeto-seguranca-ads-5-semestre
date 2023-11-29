import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import UsuarioForm from "./pages/UsuarioForm";

export default function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Usuarios />} />
                <Route path='/cadastro' element={<UsuarioForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/perfil/:id' element={<Perfil />} />
                <Route path='/editar/:id' element={<UsuarioForm />} />
            </Routes>
        </BrowserRouter>
    );
}