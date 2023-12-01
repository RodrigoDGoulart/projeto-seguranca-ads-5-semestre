import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContexto } from "./hooks/useContexto";

import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Backups from "./pages/Backups";

import './index.css';

export default function AppRoutes() {
  const { token } = useContexto();

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          {token && <>
            <Route path='/home' element={<Header element={<Home />} />} />
            <Route path='/backups' element={<Header element={<Backups />} />} />
          </>}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}