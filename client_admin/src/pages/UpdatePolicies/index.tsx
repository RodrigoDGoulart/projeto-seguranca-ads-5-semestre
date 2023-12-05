import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Alert, Button, TextField } from '@mui/material';

import Politica from '../../services/Politica';

import './index.css';

export default function UpdatePolicies() {
  const nav = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await Politica.updatePolitica(texto);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      nav('/policies');
      setSuccess(false);
    }, 2000);
  }

  useEffect(() => {
    Politica.getLastPolitica()
      .then(res => {
        setTexto(res.politica_privacidade);
      })
      .catch(e => console.log(e));
  }, [])
  return (
    <div className='updatepolicies-container'>
      {success && (
        <div className='updatepolitices-alert'>
          <Alert severity="success">Políticas alteradas com sucesso.</Alert>
        </div>
      )}
      <h1>Alterar Políticas de Privacidade</h1>
      <form
        className='updatepolicies-form'
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
        >
        <TextField
          className='policies-title-field'
          id="policies-title-field"
          label="Título"
          variant="outlined"
          onChange={(e: any) => {
            setTitulo(e.target.value);
          }}
          value={titulo}
          required
        />
        <TextField
          className='policies-content-field'
          id="policies-content-field"
          label="Conteúdo"
          variant="outlined"
          multiline={true}
          rows={25}
          onChange={(e: any) => {
            setTexto(e.target.value);
          }}
          value={texto}
          required
        />
        <div>
          Todos os usuários serão notificados após a alteração das políticas de privacidade.
        </div>
        {!loading ? (
          <Button variant='contained' type='submit'>
            Alterar
          </Button>
        ) : (
          <LoadingButton
            loading
            variant="outlined"
          >
            Alterar
          </LoadingButton>
        )}
      </form>
    </div>
  )
}