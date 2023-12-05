import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { UsuarioLog } from '../../types/usuario';
import Politica from '../../services/Politica';

import './index.css';

const columns: GridColDef[] = [
  { field: 'id_usuario', headerName: 'ID do Usuário' },
  { field: 'nome_usuario', headerName: 'Nome do Usuário', flex: 1 },
  { field: 'id_politica_privacidade', headerName: 'ID Política Privacidade', flex: 1 },
  { field: 'data', headerName: 'Data' },
]

export default function LogUsuario() {
  const [lista, setLista] = useState<UsuarioLog[]>([]);
  
  useEffect(() => {
    Politica.getUsuarioLog()
    .then(res => setLista(res))
    .catch(e => console.log(e));
  }, []);
  return (
    <div className='logusuario-container'>
      <h2 className='logusuario-title'>
        Log de Usuários que concordaram com as Políticas de Privacidade
      </h2>
      <div className='logusuario-content'>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          rows={lista.map((item, index) => ({
            ...item,
            id: index,
            data: new Date(item.data).toLocaleDateString('pt-BR'),
          }))}
          columns={columns}
        />
      </div>
    </div>
  )
}