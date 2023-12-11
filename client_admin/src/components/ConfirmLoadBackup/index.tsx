import { Modal, Box, Typography, Button } from "@mui/material";
import Backup from "../../services/Backup";

import './index.css';

interface Props {
  open: boolean;
  onClose: () => void;
  afterLoad?: () => void;
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

export default function ConfirmLoadModal(props: Props) {
  const createBackup = async () => {
    await Backup.loadBackup();
    props.afterLoad && props.afterLoad();
  }

  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <div className="createbackup-container">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            align="center"
          >
            Carregar backup?
          </Typography>
          <div className="createbackup-btn">
            <Button
              variant="contained"
              onClick={() => createBackup()}
            >
              Carregar
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