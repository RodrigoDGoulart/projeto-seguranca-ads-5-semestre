import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";

import { useContexto } from "../../hooks/useContexto";

import Termos from "../../services/Termos";

import { Politica } from "../../types/termo";

import './index.css';
import DeleteAccountModal from "../DeleteAccountModal";
import { UsuarioContext } from "../../types/usuario";

interface Props {
  page: React.ReactElement;
}

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TermVerifier({ page }: Props) {
  const location = useLocation();
  const { usuario, setUsuario } = useContexto();
  const nav = useNavigate();

  const [newTermsModal, setNewTermsModal] = useState(false);
  const [termos, setTermos] = useState<Politica>();
  const [deleteModal, setDeleteModal] = useState(false);

  const agree = async () => {
    nav('/detalhe-politicas')
    setNewTermsModal(false)
  }

  useEffect(() => {
    const getTerms = async () => {
      const lastTerms = await Termos.getLastTerm();
      console.log(lastTerms, usuario?.usuario)
      if (usuario && usuario.usuario.id_politica_privacidade && usuario.usuario.id_politica_privacidade !== lastTerms._id) {
        setNewTermsModal(true);
        setTermos(lastTerms);
      }
    }

    getTerms();
  }, [location, usuario]);
  return (
    <>
      <DeleteAccountModal 
        open={deleteModal} 
        onClose={() => setDeleteModal(false)}
        afterDelete={() => setNewTermsModal(false)}
      />
      <Modal
        open={newTermsModal}
        onClose={() => { }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="termverifier-container">
            <Typography 
              id="modal-modal-title" 
              variant="h5" 
              component="h1" 
              align="center"
            >
              Novas Políticas de Privacidade
            </Typography>
            <Typography id="modal-modal-title" component="h1" align="center">
              Atualizado em{` ${new Date(termos?.data as string).toLocaleDateString('pt-BR')}`}
            </Typography>
            <div className="novousuario-modal-texto">
              {termos?.politicas.obrigatorio}
            </div>
            <div className="termverifier-btns">
              <Button 
                variant="contained" 
                onClick={() => agree()}
              >
                Atualizar Preferências
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {page}
    </>
  )
}

