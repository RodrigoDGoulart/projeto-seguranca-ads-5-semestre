import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";

export default function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Usuarios />} />
                <Route path='/novo-usuario' element={<NovoUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}