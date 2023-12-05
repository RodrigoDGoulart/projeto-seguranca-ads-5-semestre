import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Usuario from "../../services/Usuario";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../../hooks/useContexto";

import "./index.css";
import api from "../../services/api";

export default function Login() {
  const nav = useNavigate();
  const { setUsuario } = useContexto();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [authError, setAuthError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const submit = async () => {
    const retorno = await Usuario.login({ email, senha });
    if ('errorCode' in retorno) {
      switch(retorno.errorCode) {
        case '404-user-not-found':
          setAuthError(true);
          break;
        case '401-incorrect-password':
          setAuthError(true);
          break;
        default:
          setServerError(true);
      }
    } else {
      setUsuario(retorno);
      api.setToken(retorno.token);
      sessionStorage.setItem('usuario', JSON.stringify(retorno));
      nav(`/usuarios`);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="login-fields"
      >
        <TextField
          required
          error={authError}
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          error={authError}
          helperText={authError ? "E-mail ou Senha incorreta" : ""}
          id="senha"
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {serverError && <p className='login-server-error-warning'>
          Houve um problema no servidor, tente novamente mais tarde.
        </p>}

        <Button variant="contained" type="submit">
          Entrar
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={() => nav("/cadastro")}
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
