import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Usuario from "../../services/Usuario";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../../hooks/useContexto";

import './index.css';

export default function Login() {
  const nav = useNavigate();
  const {setUsuario} = useContexto();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const submit = async () => {
    const usuario = await Usuario.login({email, senha});
    setUsuario(usuario);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    nav(`/perfil/${usuario.id}`);
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        submit();
      }} className='login-fields'>
        <TextField
          required
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)} />

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