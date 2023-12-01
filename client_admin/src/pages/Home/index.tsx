import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';

import './index.css';

export default function Home() {
  const nav = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url: string) => {
    setAnchorEl(null);
    nav(url);
  };

  return (
    <div className="usuarios-container">
      <div className='usuarios-content'>
        <Button variant='contained' onClick={() => nav('/backups')}>Backups</Button>
        <Button variant='contained' onClick={handleClick}>Políticas de Privacidade</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem 
            onClick={() => handleClose('/policies')}>
            Log de Políticas de Privacidade
          </MenuItem>
          <MenuItem onClick={() => handleClose('/policies/update')}>
            Editar Políticas de Privacidade
          </MenuItem>
          <MenuItem onClick={() => handleClose('/users')}>
            Log de Usuários
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
