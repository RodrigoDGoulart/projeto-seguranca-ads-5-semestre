import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";

import './index.css';
import { useContexto } from "../../hooks/useContexto";

export default function UsuarioForm() {
  const { usuario } = useContexto()
  const { id } = useParams();
  const nav = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');

  const [error, setError] = useState(false);
  const [unauth, setUnauth] = useState(false);

  const submit = async () => {
    if (id) {
      await Usuario.update(Number(id), { nome, email, descricao });
      nav(`/perfil/${id}`);
    } else {
      await Usuario.criar({ nome, email, senha, descricao });
      nav('/');
    }
  }

  useEffect(() => {
    if (id) {
      if (!isNaN(Number(id))) {
        console.log(id, usuario);
        if (Number(id) !== usuario?.id) {
          setUnauth(true);
        } else {
          Usuario.getUsuario(Number(id))
            .then(res => {
              setNome(res.nome);
              setEmail(res.email);
              setDescricao(res.descricao);
            })
            .catch(e => console.log(e));
        }
      } else {
        setError(true);
      }
    }
  }, [id, usuario]);

  return (
    <div>
      <Button variant="text" className="novousuario-voltar" onClick={() => nav(-1)}>Voltar</Button>
      {unauth && <p className="novousuario-error">Você não tem permissão para editar outro usuário.</p>}
      {!error && !unauth &&
        <>
          <h1 className="novousuario-title">
            {id ? 'Novo usuário' : 'Editar dados'}
          </h1>
          <form className="novousuario-form" onSubmit={() => submit()}>
            <TextField
              className="novousuario-input"
              id="nome"
              label="Nome"
              variant="standard"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <TextField
              className="novousuario-input"
              id="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
            {!id && <TextField
              className="novousuario-input"
              id="senha"
              label="Senha"
              variant="standard"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              type="password"
              required
            />}
            <TextField
              className="novousuario-input"
              id="descricao"
              label="Descrição"
              variant="standard"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              type="text"
              multiline={true}
              rows={25}
            />
            <Button variant="contained" type="submit">
              {id ? 'Editar dados' : 'Criar usuário'}
            </Button>
          </form>
        </>} {error && !unauth && <p className="novousuario-error">ID de usuário inválido</p>
      }

    </div>
  )
}