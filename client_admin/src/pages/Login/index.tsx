import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../../hooks/useContexto";

import "./index.css";
import Admin from "../../services/Admin";
import api from "../../services/api";

export default function Login() {
  const nav = useNavigate();
  const { setToken } = useContexto();

  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const [fail, setFail] = useState(false);
  const [serverError, setServerError] = useState(false);

  const submit = async () => {
    const res = await Admin.auth({ usuario: user, senha });
    console.log(res);
    if ("errorCode" in res) {
      if (res.errorCode === '401-invalid-password' || res.errorCode === '401-invalid-user') {
        setFail(true);
      } else {
        setServerError(true);
      }
    } else {
      const response = res as {token:string};
      api.setToken(response.token);
      setToken(response.token)
      sessionStorage.setItem('token', response.token);
      nav(`/home`);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Admin - Autenticação</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="login-fields"
      >
        <TextField
          required
          id="user"
          label="Usuário"
          variant="outlined"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          error={fail}
        />

        <TextField
          required
          id="senha"
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={fail}
        />

        <div>
          {fail && <p className="login-error-msg">E-mail ou senha incorretos</p>}
          {serverError && <p className="login-error-msg">Falha no servidor, tente novamente mais tarde.</p>}
        </div>

        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}
