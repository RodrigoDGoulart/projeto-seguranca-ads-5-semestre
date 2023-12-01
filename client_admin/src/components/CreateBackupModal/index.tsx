import { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Backup from "../../services/Backup";

import './index.css';

interface Props {
  open: boolean;
  onClose: () => void;
  afterCreate?: () => void;
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

export default function CreateBackupModal(props: Props) {
  const [title, setTitle] = useState('');

  const createBackup = () => {
    Backup.createBackup(title);
    props.afterCreate && props.afterCreate();
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
            Criar novo backup?
          </Typography>
          <div className="createbackup-btn">
            <TextField
              id="backup-titulo"
              label="Título"
              variant="outlined"
              onChange={e => setTitle(e.target.value)}
            />
            <Button
              disabled={!title}
              variant="contained"
              onClick={() => createBackup()}
            >
              Criar
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