import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { Button, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

import { Politica as PoliticaType } from '../../types/politica';
import Politica from '../../services/Politica';

import './index.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'titulo', headerName: 'Título', flex: 1 },
  { field: 'data', headerName: 'Data' },
]

export default function Policies() {
  const nav = useNavigate();

  const [lista, setLista] = useState<PoliticaType[]>([]);
  const [policy, setPolicy] = useState<PoliticaType>();
  const [policyID, setPolicyID] = useState('');

  const clearPolicy = () => {
    setPolicy(undefined);
    setPolicyID('');
  }

  const updatePolicy = () => {
    nav('/policies/update')
  }

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
              data: new Date(item.data).toLocaleDateString('pt-BR'),
              id: item._id,
            }))}
            columns={columns}
            onRowSelectionModelChange={e => {
              setPolicy(lista.find(item => item._id === e[0]))
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
              <h4>ID:{` ${policy._id}`}</h4>
              <div>
                <h4>Conteúdo:</h4>
                <div className='policies-info-content'>
                  {policy.politicas.obrigatorio}
                </div>
              </div>
              <h2>Termos Opcionais</h2>
              <ul className='policies-info-optional-list'>
                {
                  policy.politicas.opcionais.map(item => (
                    <li key={item.index} className='policies-optional-list-item'>
                      <div className='policies-optional-list-item-content'>
                        id: {item.index}
                      </div>
                      <div className='policies-optional-list-item-content'>
                        titulo: {item.titulo}
                      </div>
                      <div className='policies-optional-list-item-content'>
                        detalhe: {item.conteudo}
                      </div>
                    </li>
                  ))
                }
              </ul>
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