import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './index.css';

export default function NovoUsuario() {
    const nav = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const submit = () => {
        console.log(nome, email, senha);
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
                <Button variant="contained" type="submit">Criar usuário</Button>
            </form>
        </div>
    )
}