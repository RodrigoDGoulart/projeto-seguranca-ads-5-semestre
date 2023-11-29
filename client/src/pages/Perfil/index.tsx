import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";
import { Button } from "@mui/material";
import { Usuario as UsuarioType } from "../../types";

import './index.css';

export default function Perfil() {
  const { id } = useParams();
  const nav = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioType>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ownUser, setOwnUser] = useState(false);

  const excluir = async () => {
    await Usuario.delete(Number(id))
    nav(-1);
  }

  useEffect(() => {
    setLoading(true);
    if (!isNaN(Number(id))) {
      Usuario.getUsuario(Number(id)).then(res => {
        setUsuario(res);
      }).catch(e => console.log(e));
    } else {
      setError(true);
      console.log('id inválido');
    }
    setLoading(false);
  }, [id]);
  return (
    <>
      <Button variant="text" className="novousuario-voltar" onClick={() => nav(-1)}>Voltar</Button>
      <div className="perfil-container">
        {usuario && !loading && !error &&
          <>
            <h1 className="perfil-nome">{usuario.nome}</h1>
            <h4 className="perfil-email">{usuario.email}</h4>
            <div className="perfil-desc">
              {usuario.descricao}
            </div>
            {ownUser && <div className="perfil-btn-container">
              <Button variant="contained">Editar</Button>
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
            Algo errado aconteceu. Tente novamente mais tarde
          </div>
        </>}
      </div>
    </>
  );
}