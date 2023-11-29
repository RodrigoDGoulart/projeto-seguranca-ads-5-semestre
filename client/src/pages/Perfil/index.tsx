import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";
import { Button } from "@mui/material";
import { Usuario as UsuarioType } from "../../types";
import { useContexto } from "../../hooks/useContexto";

import './index.css';

export default function Perfil() {
  const { id } = useParams();
  const nav = useNavigate();
  const {usuario} = useContexto();

  const [usuarioSelected, setUsuarioSelected] = useState<UsuarioType>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ownUser, setOwnUser] = useState(false);

  const excluir = async () => {
    await Usuario.delete(Number(id))
    nav(-1);
  }

  const editar = () => {
    nav(`/editar/${usuario?.id}`);
  }

  useEffect(() => {
    setLoading(true);
    if (!isNaN(Number(id))) {
      if (Number(id) === usuario?.id) {
        setOwnUser(true);
        setUsuarioSelected(usuario);
      } else {
        Usuario.getUsuario(Number(id)).then(res => {
          setUsuarioSelected(res);
        }).catch(e => console.log(e));
      }
    } else {
      setError(true);
      console.log('id inválido');
    }
    setLoading(false);
  }, [id, usuario]);
  return (
    <>
      <Button variant="text" className="novousuario-voltar" onClick={() => nav(-1)}>Voltar</Button>
      <div className="perfil-container">
        {usuarioSelected && !loading && !error &&
          <>
            <h1 className="perfil-nome">{usuarioSelected.nome}</h1>
            <h4 className="perfil-email">{usuarioSelected.email}</h4>
            <div className="perfil-desc">
              {usuarioSelected.descricao}
            </div>
            {ownUser && <div className="perfil-btn-container">
              <Button variant="contained" onClick={() => editar()}>Editar</Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => excluir()}
              >
                  Excluir conta
              </Button>
            </div>}
          </>
        }
        {loading && <div>Carregando...</div>}
        {!loading && error && <>
          <div>
            ID de usuário inválido.
          </div>
        </>}
      </div>
    </>
  );
}