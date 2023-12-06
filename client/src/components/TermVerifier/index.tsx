import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
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

  const [newTermsModal, setNewTermsModal] = useState(false);
  const [termos, setTermos] = useState<Politica>();
  const [deleteModal, setDeleteModal] = useState(false);

  const agree = async () => {
    await Termos.agreeNewTerms(usuario?.usuario.id as number, termos?._id as string);
    const novoUsuario = {...usuario, usuario: {...usuario?.usuario, id_politica_privacidade: termos?._id}} as UsuarioContext;
    setUsuario(novoUsuario);
    setNewTermsModal(false);
    sessionStorage.setItem('usuario', JSON.stringify(novoUsuario));
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
              {termos?.politica_privacidade}
            </div>
            <div className="termverifier-btns">
              <Button 
                variant="contained" 
                onClick={() => agree()}
              >
                Concordo com as novas políticas
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => setDeleteModal(true)}
              >
                Não concordo com as novas políticas, desejo excluir minha conta
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {page}
    </>
  )
}

