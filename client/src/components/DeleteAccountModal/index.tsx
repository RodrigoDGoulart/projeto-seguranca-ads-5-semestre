import { Modal, Box, Typography, Button } from "@mui/material";
import { useContexto } from "../../hooks/useContexto";
import { useNavigate } from "react-router-dom";
import Usuario from "../../services/Usuario";

interface Props {
  open: boolean;
  onClose: () => void;
  afterDelete?: () => void;
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

export default function DeleteAccountModal (props: Props) {
  const {usuario, setUsuario} = useContexto();
  const nav = useNavigate();

  const deleteAccount = async () => {
    await Usuario.delete(usuario?.usuario.id as number);
    setUsuario(undefined);
    sessionStorage.removeItem('usuario');
    nav('/');
    props.onClose();
    props.afterDelete && props.afterDelete();
  }

  return (
    <Modal
        open={props.open}
        onClose={() => props.onClose()}
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
              color="red"
            >
              Excluir conta?
            </Typography>
            <div className="termverifier-btns">
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => deleteAccount()}
              >
                Excluir
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => props.onClose()}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
  )
}