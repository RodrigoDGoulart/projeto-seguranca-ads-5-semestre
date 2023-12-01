import { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import CreateBackupModal from '../../components/CreateBackupModal';
import ConfirmLoadModal from '../../components/ConfirmLoadBackup';

import { Backup as BackupType } from '../../types/backup';
import Backup from '../../services/Backup';

import './index.css';

export default function Backups() {
  const [lista, setLista] = useState<BackupType[]>([]);

  const [loading, setLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);

  const updateBackups = () => {
    setLoading(true)
    Backup.getBackups()
      .then(res => setLista(res))
      .catch(e => console.log(e));
    setLoading(false);
  }

  useEffect(() => {
    updateBackups();
  }, []);
  return (
    <>
      <div className='backups-container'>
        <h1 className='backups-title'>Backups</h1>
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
        <div className='backups-list'>
          {!loading ?
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Backup</b></TableCell>
                    <TableCell align="right"><b>Data</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lista.map(item => (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(item.data).toLocaleDateString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            : <p className='backups-loading'>Carregando...</p>}
        </div>
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
