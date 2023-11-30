import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContexto } from "./hooks/useContexto";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  const { token } = useContexto();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {token && <>
          <Route path='/home' element={<Home />} />
        </>}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}