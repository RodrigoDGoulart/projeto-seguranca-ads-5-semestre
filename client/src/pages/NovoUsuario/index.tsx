import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './index.css';
import Usuario from "../../services/Usuario";

export default function NovoUsuario() {
    const nav = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [descricao, setDescricao] = useState('')

    const submit = async () => {
        await Usuario.criar({nome, email, senha, descricao});
        nav('/');
    }

    return (
        <div>
            <Button variant="text" className="novousuario-voltar" onClick={() => nav(-1)}>Voltar</Button>
            <h1 className="novousuario-title">
                Novo usuário
            </h1>
            <form className="novousuario-form" onSubmit={() => submit()}>
                <TextField
                    className="novousuario-input"
                    id="nome"
                    label="Nome"
                    variant="standard"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <TextField
                    className="novousuario-input"
                    id="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <TextField
                    className="novousuario-input"
                    id="senha"
                    label="Senha"
                    variant="standard"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    type="password"
                    required
                />
                <TextField
                    className="novousuario-input"
                    id="descricao"
                    label="Descrição"
                    variant="standard"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    type="text"
                    multiline
                />
                <Button variant="contained" type="submit">Criar usuário</Button>
            </form>
        </div>
    )
}