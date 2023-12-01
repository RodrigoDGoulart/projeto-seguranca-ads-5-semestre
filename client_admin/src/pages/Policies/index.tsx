import { Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { PoliticaItem as PoliticaItemType, Politica as PoliticaType } from '../../types/politica';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

import Politica from '../../services/Politica';

import './index.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'titulo', headerName: 'Título', flex: 1 },
  { field: 'data', headerName: 'Data' },
]

export default function Policies() {
  const [lista, setLista] = useState<PoliticaItemType[]>([]);
  const [policy, setPolicy] = useState<PoliticaType>();
  const [policyID, setPolicyID] = useState('');

  const clearPolicy = () => {
    setPolicy(undefined);
    setPolicyID('');
  }

  const getPolicy = async (id: string) => {
    setPolicyID(id);
    try {
      const res = await Politica.getPolitica(id);
      setPolicy(res);
    } catch (e) {
      console.log(e);
    }
  }

  const updatePolicy = () => {}

  useEffect(() => {
    Politica.getPoliticas()
      .then(res => setLista(res))
      .catch(e => console.log(e));
  }, []);
  return (
    <div className='policies-container'>
      <h1>Políticas de Privacidade</h1>
      <div className='policies-content-container'>
        <div className='policies-content-list'>
          <Button
            disabled={!policyID}
            variant='contained'
            onClick={() => {
              updatePolicy();
            }}
            className='policies-list-btn'
            color='success'
          >
            Alterar Políticas
          </Button>
          <DataGrid
            hideFooterPagination
            hideFooterSelectedRowCount
            rows={lista.map(item => ({
              ...item,
              data: new Date(item.data).toLocaleDateString('pt-BR')
            }))}
            columns={columns}
            onRowSelectionModelChange={e => {
              getPolicy(e[0] as string);
            }}
            rowSelectionModel={policyID ? [policyID] : [] as GridRowId[]}
            rowSelection
          />
          <Button
            disabled={!policyID}
            variant='contained'
            onClick={() => {
              clearPolicy();
            }}
            className='policies-list-btn'
          >
            Limpar
          </Button>
        </div>
        <Paper elevation={10} className='policies-content-info'>
          {policy ? (
            <div>
              <h1>
                {policy.titulo}
              </h1>
              <h4>ID:{` ${policy.id}`}</h4>
              <div>
                <h4>Conteúdo:</h4>
                <div className='policies-info-content'>
                  {policy.texto}
                </div>
              </div>
            </div>
          ) : (
            <div className='policies-info-noselected'>
              Selecione um item.
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}