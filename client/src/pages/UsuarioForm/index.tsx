import { Box, Button, Checkbox, Link, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Usuario from "../../services/Usuario";

import './index.css';
import { useContexto } from "../../hooks/useContexto";

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

export default function UsuarioForm() {
  const { usuario } = useContexto()
  const { id } = useParams();
  const nav = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [politicasCheck, setPoliticasCheck] = useState(false);

  const [error, setError] = useState(false);
  const [unauth, setUnauth] = useState(false);
  const [politicasModal, setPoliticasModal] = useState(false);

  const submit = async () => {
    if (id) {
      await Usuario.update(Number(id), { nome, email, descricao });
      nav(`/perfil/${id}`);
    } else {
      await Usuario.criar({ nome, email, senha, descricao });
      nav('/');
    }
  }

  useEffect(() => {
    if (id) {
      if (!isNaN(Number(id))) {
        console.log(id, usuario);
        if (Number(id) !== usuario?.id) {
          setUnauth(true);
        } else {
          Usuario.getUsuario(Number(id))
            .then(res => {
              setNome(res.nome);
              setEmail(res.email);
              setDescricao(res.descricao);
            })
            .catch(e => console.log(e));
        }
      } else {
        setError(true);
      }
    }
  }, [id, usuario]);

  return (
    <>
      <div>
        <Button variant="text" className="novousuario-voltar" onClick={() => nav(-1)}>Voltar</Button>
        {unauth && <p className="novousuario-error">Você não tem permissão para editar outro usuário.</p>}
        {!error && !unauth &&
          <>
            <h1 className="novousuario-title">
              {!id ? 'Cadastro' : 'Editar dados'}
            </h1>
            <form className="novousuario-form" onSubmit={() => submit()}>
              <TextField
                className="novousuario-input"
                id="nome"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
              <TextField
                className="novousuario-input"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
              />
              {!id && <TextField
                className="novousuario-input"
                id="senha"
                label="Senha"
                variant="outlined"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                type="password"
                required
              />}
              <TextField
                className="novousuario-input"
                id="descricao"
                label="Descrição"
                variant="outlined"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                type="text"
                multiline={true}
                rows={25}
              />
              {!id && (
                <div className="novousuario-checkbox">
                  <Checkbox
                    checked={politicasCheck}
                    onChange={() => setPoliticasCheck(!politicasCheck)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <p>
                    Concordo com as <Link onClick={() => setPoliticasModal(true)}>Políticas de privacidade</Link>
                  </p>
                </div>
              )}
              <Button variant="contained" type="submit" disabled={!politicasCheck}>
                {id ? 'Editar dados' : 'Criar usuário'}
              </Button>
            </form>
          </>} {error && !unauth && <p className="novousuario-error">ID de usuário inválido</p>
        }
      </div>
      <Modal
        open={politicasModal}
        onClose={() => setPoliticasModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h5" component="h1" align="center">
            Políticas de Privacidade
          </Typography>
          <div className="novousuario-modal-texto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tristique ligula. Nunc et bibendum magna. Nam porta cursus porta. Proin lacinia augue dolor, non sagittis libero aliquet nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque quam lorem, molestie vitae tortor eget, placerat egestas erat. Curabitur sed tincidunt magna. Vestibulum venenatis elementum lacus non lacinia. In venenatis elementum turpis, quis scelerisque nulla blandit eu. Ut mattis, nisl nec consectetur rutrum, ex elit egestas tortor, vitae accumsan turpis justo in lectus. Morbi euismod, eros ut egestas laoreet, diam ante viverra turpis, ac auctor velit magna eu libero. Integer vulputate dui ac nunc fermentum vehicula. Praesent tempor lobortis porttitor. Donec lorem ex, maximus eu nunc nec, eleifend luctus sapien. Suspendisse sit amet odio sed sapien convallis gravida. Mauris luctus mi sapien, at pharetra mauris condimentum sit amet.

            Donec fermentum venenatis mauris sit amet mollis. Nulla vitae elit sed metus iaculis vestibulum. Quisque rutrum auctor nulla, hendrerit dignissim felis lacinia et. Integer pretium sit amet mauris at porta. Nulla sem sem, efficitur quis ligula non, iaculis iaculis purus. Aenean molestie diam a urna suscipit, vitae euismod elit gravida. Aenean euismod elit non elit vehicula, commodo placerat ex pellentesque. Vestibulum aliquet arcu rhoncus erat auctor posuere. Vestibulum pharetra quam nisl, quis fringilla enim vulputate ut.

            In ac volutpat dui. Quisque mollis odio a nunc ultricies viverra. Fusce consectetur nibh arcu, eget dapibus mauris interdum sit amet. Mauris condimentum ligula quis nisl facilisis, eu vulputate erat fermentum. Suspendisse ut sem eget nibh mollis iaculis. Mauris porttitor metus sed nisi cursus, sit amet pellentesque turpis accumsan. Mauris id nulla consectetur, cursus orci sed, tincidunt purus. Fusce ac orci id nisi mollis tristique at eu est. Nam venenatis, erat nec ultricies blandit, nulla arcu venenatis ante, ac egestas sapien tellus sed sapien. Vivamus vitae eleifend quam.

            Nam ullamcorper velit eget ipsum volutpat aliquet. Vestibulum malesuada bibendum bibendum. Aliquam interdum, nisl sed vestibulum condimentum, magna eros vestibulum dui, eget gravida massa ante sed elit. Morbi sit amet aliquam nulla. Aliquam erat purus, laoreet sed quam a, placerat suscipit magna. Pellentesque egestas vitae turpis in dictum. Quisque tempor purus nunc, sed accumsan augue tincidunt et. Duis congue purus dolor, vitae viverra lacus auctor eu.

            Phasellus nisi justo, dapibus quis dui sed, blandit auctor lacus. In finibus, velit luctus condimentum fringilla, erat libero elementum nisi, in scelerisque ipsum leo eget neque. Cras auctor lorem at metus rhoncus, elementum tristique augue luctus. Aliquam eu magna et metus iaculis tempor ut ac massa. Fusce eu tortor id est pretium vehicula vitae id lectus. Vivamus faucibus tellus quis dictum posuere. Donec euismod neque eros, eu congue risus maximus vitae.
          </div>
        </Box>
      </Modal>
    </>
  )
}