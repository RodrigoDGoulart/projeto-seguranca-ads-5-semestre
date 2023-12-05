import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useContexto } from "../../hooks/useContexto";

import './index.css';

interface Props {
  element: React.ReactElement;
}

const links: { label: string; url: string }[] = [
  { label: "Usuários", url: "/usuarios" },
  { label: "Meu perfil", url: "/perfil/meu-perfil" },
];

export default function Header({ element }: Props) {
  const {setUsuario} = useContexto();
  const nav = useNavigate();

  const sair = () => {
    api.setToken(null);
    sessionStorage.removeItem('usuario')
    setUsuario(undefined);
    nav('/');
  }

  return (
    <>
      <div className="header-container">
        <div className="header-btns">
          {links.map((item) => (
            <Button
              key={item.url}
              onClick={() => nav(item.url)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="header-exit-btn">
            <Button
              onClick={() => sair()}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sair
            </Button>
        </div>
      </div>
      {element}
    </>
  );
}
