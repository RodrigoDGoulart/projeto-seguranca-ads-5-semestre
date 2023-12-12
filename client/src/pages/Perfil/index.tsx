import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";
import { Box, Button, Link, Modal, Typography } from "@mui/material";
import { Usuario as UsuarioType } from "../../types/usuario";
import { useContexto } from "../../hooks/useContexto";
import DeleteAccountModal from "../../components/DeleteAccountModal";

import "./index.css";
import { Politica } from "../../types/termo";
import Termos from "../../services/Termos";

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

export default function Perfil() {
  const { id } = useParams();
  const nav = useNavigate();
  const { usuario } = useContexto();

  const [usuarioSelected, setUsuarioSelected] = useState<UsuarioType>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ownUser, setOwnUser] = useState(false);

  const [termos, setTermos] = useState<Politica>();

  const [deleteModal, setDeleteModal] = useState(false);
  const [politicasModal, setPoliticasModal] = useState(false);

  const editar = () => {
    nav(`/editar-dados`);
  };

  useEffect(() => {
    setLoading(true);
    if (!isNaN(Number(id)) || id === "meu-perfil") {
      if (id === "meu-perfil") {
        setOwnUser(true);
        setUsuarioSelected(usuario?.usuario);
        Termos.getLastTerm().then((res) => setTermos(res));
      } else {
        Usuario.getUsuario(Number(id))
          .then((res) => {
            setUsuarioSelected(res);
          })
          .catch((e) => console.log(e));
      }
    } else {
      setError(true);
      console.log("id inválido");
    }
    setLoading(false);
  }, [id, usuario]);
  return (
    <>
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
          <div className="novousuario-modal-texto">{termos?.politicas.obrigatorio}</div>
        </Box>
      </Modal>
      <DeleteAccountModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      />
      <div className="perfil-container">
        {usuarioSelected && !loading && !error && (
          <>
            <h1 className="perfil-nome">{usuarioSelected.nome}</h1>
            <h4 className="perfil-email">{usuarioSelected.email}</h4>
            <div className="perfil-desc">{usuarioSelected.descricao}</div>
            {ownUser && (
              <>
                <div className="perfil-btn-container">
                  <Button variant="contained" onClick={() => editar()}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteModal(true)}
                  >
                    Excluir conta
                  </Button>
                </div>
                <div className="perfil-btn-container">
                <Link component="button" onClick={() => nav('/detalhe-politicas')}>Políticas de Privacidade</Link>
                </div>
              </>
            )}
          </>
        )}
        {loading && <div>Carregando...</div>}
        {!loading && error && (
          <>
            <div>ID de usuário inválido.</div>
          </>
        )}
      </div>
    </>
  );
}
