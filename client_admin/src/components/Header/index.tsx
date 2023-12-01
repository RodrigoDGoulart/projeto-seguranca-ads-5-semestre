import { AppBar, Container, Toolbar, Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

interface Props {
  element: React.ReactElement;
}

const links: {label: string; url: string}[] = [
  {label: 'Home', url: '/home'},
  {label: 'Políticas de privacidade', url: '/politics'},
  {label: 'Backups', url: '/backups'},
  {label: 'Usuários', url: '/users'},
]

export default function Header({ element }: Props) {
  const nav = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {links.map(item => (<Button
                onClick={() => nav(item.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.label}
              </Button>))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {element}
    </>
  );
}