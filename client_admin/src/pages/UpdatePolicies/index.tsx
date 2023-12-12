import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Alert, Button, Link, TextField } from '@mui/material';

import Politica from '../../services/Politica';

import './index.css';

interface iPoliticasOpcionais {
  index: number,
  titulo: string,
  conteudo: string
}

export default function UpdatePolicies() {
  const nav = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [politicasOpcionais, setPoliticasOpcionais] = useState<iPoliticasOpcionais[]>([]);
  const [opcionalTitulo, setOpcionalTitulo] = useState('');
  const [opcionalDetalhe, setOpcionalDetalhe] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const addOpcional = () => {
    const politicasOpcionaisTemp = [...politicasOpcionais]
    politicasOpcionaisTemp.push({
      index: politicasOpcionais.length ? politicasOpcionais[politicasOpcionais.length - 1].index + 1 : 1,
      titulo: opcionalTitulo,
      conteudo: opcionalDetalhe
    })
    setPoliticasOpcionais(politicasOpcionaisTemp)
    setOpcionalTitulo('')
    setOpcionalDetalhe('')
  }

  const removeOptional = (index:number) => {
    const politicasOpcionaisTemp = [...politicasOpcionais].filter(item => item.index !== index)
    setPoliticasOpcionais(politicasOpcionaisTemp)
  }

  const submit = async () => {
    setLoading(true);
    await Politica.updatePolitica({
      titulo,
      politicas: {
        obrigatorio: texto,
        opcionais: politicasOpcionais
      },
    });
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
        setTexto(res.politicas.obrigatorio);
        setPoliticasOpcionais(res.politicas.opcionais);
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
      <h1>Alterar Política de Privacidade Obrigatória</h1>
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
          rows={8}
          onChange={(e: any) => {
            setTexto(e.target.value);
          }}
          value={texto}
          required
        />
        <h1>
          Termos Opcionais
        </h1>
        <ul className='policies-optional-list'>
          {
            politicasOpcionais.map(item => (
              <li key={item.index} className='policies-optional-list-item'>
                <Link component='button' type='button' onClick={() => removeOptional(item.index)}>{'[Remover]'}</Link>
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
        <div className='policies-optional-container'>
          <TextField
            className='policies-optional-title-field'
            id="policies-optional-title-field"
            label="Título"
            variant="outlined"
            onChange={(e: any) => {
              setOpcionalTitulo(e.target.value);
            }}
            value={opcionalTitulo}
          />
          <div className='policies-optional-detail-container'>
          <TextField
            className='policies-optional-detail-field'
            id="policies-optional-detail-field"
            label="Detalhes"
            variant="outlined"
            onChange={(e: any) => {
              setOpcionalDetalhe(e.target.value);
            }}
            value={opcionalDetalhe}
          />
          <Button variant='contained' type='button' onClick={() => addOpcional() } disabled={!opcionalTitulo || !opcionalDetalhe}>
            Adicionar
          </Button>
          </div>
        </div>
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