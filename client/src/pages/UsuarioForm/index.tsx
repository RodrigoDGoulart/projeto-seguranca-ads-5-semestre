import {
  Box,
  Button,
  Checkbox,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Usuario from "../../services/Usuario";

import "./index.css";
import { useContexto } from "../../hooks/useContexto";
import { Termo } from "../../types/termo";
import Termos from "../../services/Termos";
import api from "../../services/api";
import { UsuarioContext } from "../../types/usuario";

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UsuarioForm() {
  const { usuario, setUsuario } = useContexto();
  const nav = useNavigate();
  const location = useLocation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [descricao, setDescricao] = useState("");
  const [politicasCheck, setPoliticasCheck] = useState(false);

  const [termos, setTermos] = useState<Termo>();

  const [politicasModal, setPoliticasModal] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const submit = async () => {
    if (isUpdateForm) {
      const retorno = await Usuario.update({ nome, email, descricao });
      if ('errorCode' in retorno) {
        if (retorno.errorCode === '400-already-email') {
          setEmailError(true);
        } else {
          setServerError(true);
        }
      } else {
        const novoUsuario = { ...usuario, usuario: {...usuario?.usuario, nome, email, senha}}
        setUsuario(novoUsuario as UsuarioContext);
        nav(`/perfil/meu-perfil`);
      }
    } else {
      const resp = await Usuario.criar({ nome, email, senha, descricao });
      if ("usuario" in resp) {
        setUsuario(resp);
        api.setToken(resp.token);
        sessionStorage.setItem("usuario", JSON.stringify(resp));
        nav(`/usuarios`);
      } else {
        if (resp.errorCode === '400-already-email') {
          setEmailError(true);
        } else {
          setServerError(true);
        }
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/editar-dados') {
      setNome(usuario?.usuario.nome as string);
      setEmail(usuario?.usuario.email as string);
      setDescricao(usuario?.usuario.descricao as string);
      setIsUpdateForm(true);
      setPoliticasCheck(true);
    } else {
      setIsUpdateForm(false);
      setPoliticasCheck(false);
    }
    Termos.getLastTerm().then((res) => setTermos(res));
  }, [location, usuario]);

  return (
    <>
      <div>
          <>
            <h1 className="novousuario-title">
              {!isUpdateForm ? "Cadastro" : "Editar dados"}
            </h1>
            {serverError && (
              <p className="novousuario-error">
                Erro interno do servidor, tente novamente mais tarde
              </p>
            )}
            <form
              className="novousuario-form"
              onSubmit={(e: any) => {
                e.preventDefault();
                submit();
              }}
            >
              <TextField
                className="novousuario-input"
                id="nome"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <TextField
                className="novousuario-input"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                error={emailError}
                helperText={emailError ? "Este email já existe" : ""}
              />
              {!isUpdateForm && (
                <TextField
                  className="novousuario-input"
                  id="senha"
                  label="Senha"
                  variant="outlined"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type="password"
                  required
                />
              )}
              <TextField
                className="novousuario-input"
                id="descricao"
                label="Descrição"
                variant="outlined"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                type="text"
                multiline={true}
                rows={25}
              />
              {!isUpdateForm && (
                <div className="novousuario-checkbox">
                  <Checkbox
                    checked={politicasCheck}
                    onChange={() => setPoliticasCheck(!politicasCheck)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <p>
                    Concordo com as{" "}
                    <Link onClick={() => setPoliticasModal(true)}>
                      Políticas de privacidade
                    </Link>
                  </p>
                </div>
              )}
              <Button
                variant="contained"
                type="submit"
                disabled={!politicasCheck}
              >
                {isUpdateForm ? "Editar dados" : "Criar usuário"}
              </Button>
            </form>
          </>
      </div>
      <Modal
        open={politicasModal}
        onClose={() => setPoliticasModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            align="center"
          >
            Políticas de Privacidade
          </Typography>
          <Typography id="modal-modal-title" component="h1" align="center">
            Atualizado em
            {` ${new Date(termos?.data as string).toLocaleDateString("pt-BR")}`}
          </Typography>
          <div className="novousuario-modal-texto">{termos?.termo}</div>
        </Box>
      </Modal>
    </>
  );
}
