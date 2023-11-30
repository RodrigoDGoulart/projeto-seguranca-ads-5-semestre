import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Usuario from "../../services/Usuario";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../../hooks/useContexto";

import './index.css';
import Admin from "../../services/Admin";

export default function Login() {
  const nav = useNavigate();
  const {setToken} = useContexto();

  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');

  const submit = async () => {
    const res = await Admin.auth({user, senha});
    setToken(res.token);
    nav(`/home`);
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Admin - Autenticação</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        submit();
      }} className='login-fields'>
        <TextField
          required
          id="user"
          label="Usuário"
          variant="outlined"
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)} />

        <TextField
          required
          id="senha"
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)} />

        <Button variant="contained" type="submit">
          Entrar
        </Button>
        <Button variant="outlined" type="button" onClick={() => nav('/cadastro')}>
          Cadastrar
        </Button>
      </form>
    </div>

  );
}