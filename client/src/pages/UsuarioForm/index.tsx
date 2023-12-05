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
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";

import "./index.css";
import { useContexto } from "../../hooks/useContexto";
import { Termo } from "../../types/termo";
import Termos from "../../services/Termos";
import api from "../../services/api";

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
  const { id } = useParams();
  const nav = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [descricao, setDescricao] = useState("");
  const [politicasCheck, setPoliticasCheck] = useState(false);

  const [termos, setTermos] = useState<Termo>();

  const [error, setError] = useState(false);
  const [unauth, setUnauth] = useState(false);
  const [politicasModal, setPoliticasModal] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const submit = async () => {
    if (id) {
      await Usuario.update(Number(id), { nome, email, descricao });
      nav(`/perfil/${id}`);
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
    if (id) {
      if (!isNaN(Number(id))) {
        console.log(id, usuario);
        if (Number(id) !== usuario?.usuario.id) {
          setUnauth(true);
        } else {
          Usuario.getUsuario(Number(id))
            .then((res) => {
              setNome(res.nome);
              setEmail(res.email);
              setDescricao(res.descricao);
            })
            .catch((e) => console.log(e));
        }
      } else {
        setError(true);
      }
    }
    Termos.getLastTerm().then((res) => setTermos(res));
  }, [id, usuario]);

  return (
    <>
      <div>
        <Button
          variant="text"
          className="novousuario-voltar"
          onClick={() => nav(-1)}
        >
          Voltar
        </Button>
        {unauth && (
          <p className="novousuario-error">
            Você não tem permissão para editar outro usuário.
          </p>
        )}
        {!error && !unauth && (
          <>
            <h1 className="novousuario-title">
              {!id ? "Cadastro" : "Editar dados"}
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
              {!id && (
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
              {!id && (
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
                {id ? "Editar dados" : "Criar usuário"}
              </Button>
            </form>
          </>
        )}{" "}
        {error && !unauth && (
          <p className="novousuario-error">ID de usuário inválido</p>
        )}
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
