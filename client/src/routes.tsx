import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";

export default function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Usuarios />} />
                <Route path='/cadastro' element={<NovoUsuario />} />
                <Route path='/login' element={<Login />} />
                <Route path='/perfil/:id' element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}