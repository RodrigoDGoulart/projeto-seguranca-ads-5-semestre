import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UsuarioItem } from "../../types/usuario";
import UsuarioAPI from "../../services/Usuario";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../../hooks/useContexto";

export default function Usuarios() {
  const nav = useNavigate();
  const {usuario} = useContexto();

  const [filtroNome, setFiltroNome] = useState("");
  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
  const [loading, setLoading] = useState(false);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(filtroNome, "i");
    return regex.test(titulo);
  };

  useEffect(() => {
    setLoading(true);
    UsuarioAPI.getUsuarios()
      .then((resp) => {
        setUsuarios(resp.filter((user) => filtrarNome(user.nome) && user.id !== usuario?.usuario.id));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [filtroNome, usuario]);

  return (
    <div className="usuarios-container">
      <h1 className="usuarios-title">Usuários</h1>
      <div className="usuarios-pesquisa">
        <TextField
          className="usuarios-pesquisa-input"
          id="trete"
          label="Usuário"
          variant="standard"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
      </div>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nome</b>
                </TableCell>
                <TableCell align="right">
                  <b>E-mail</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link component="button" onClick={() => nav(`/perfil/${user.id}`)}>
                      {user.nome}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="usuarios-carregando">Carregando...</p>
      )}
    </div>
  );
}
