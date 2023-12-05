import { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import CreateBackupModal from '../../components/CreateBackupModal';
import ConfirmLoadModal from '../../components/ConfirmLoadBackup';

import { Backup as BackupType } from '../../types/backup';
import Backup from '../../services/Backup';

import './index.css';

export default function Backups() {
  const [backup, setBackup] = useState<BackupType>();
  const [createModal, setCreateModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);

  const updateBackups = async () => {
    const resp = await Backup.getBackups();
    console.log(resp);
    setBackup(resp);
  }

  useEffect(() => {
    updateBackups();
  }, []);
  return (
    <>
      <div className='backups-container'>
        <h1 className='backups-title'>Backup</h1>
        <div className='backups-btn'>
          <Button 
            variant='contained' 
            color='success'
            onClick={() => {
              setLoadModal(true);
            }}
          >
            Carregar último Backup
          </Button>
          <Button 
            variant='contained' 
            onClick={() => {
              setCreateModal(true)
            }}
          >
            Criar novo Backup
          </Button>
        </div>
        {backup ? (<>
          <div className='backups-info'>
            Último backup feito em <b>{new Date(backup.backup.backup_date).toLocaleDateString('pt-BR')} às {new Date(backup.backup.backup_date).toLocaleTimeString('pt-BR')}</b>
          </div>
          <div className='backups-info'>
            ID do Backup: <b>{backup.backup.id}</b>
          </div>
          <div className='backups-info'>
            <div>
              Depois do backup...
            </div>
            <div>
              <b>{backup.usuarios_criados}</b> usuários foram criados
            </div>
            <div>
              <b>{backup.usuarios_editados}</b> usuários foram editados
            </div>
            <div>
              <b>{backup.usuariosExcluidos}</b> usuários foram excluídos
            </div>
          </div>
        </>) : <div className='backups-info'>Carregando...</div>}
      </div>
      <CreateBackupModal
        onClose={() => setCreateModal(false)}
        open={createModal}
        afterCreate={() => {
          updateBackups();
          setCreateModal(false)
        }}
      />
      <ConfirmLoadModal
        onClose={() => setLoadModal(false)}
        open={loadModal}
        afterLoad={() => {
          setLoadModal(false)
        }}
      />
    </>
  );
}
