import { useEffect, useState } from "react"
import Termos from "../../services/Termos";
import { Politica } from "../../types/termo";
import { Button, Checkbox, Link } from "@mui/material";
import './index.css'
import { useContexto } from "../../hooks/useContexto";
import { UsuarioContext } from "../../types/usuario";

export default function PolicyDetails() {

    const [termos, setTermos] = useState<Politica>();
    const [opcionaisSelecionados, setOpcionaisSelecionados] = useState<number[]>([])
    const [updatePreferences, setUpdatePreferences] = useState(false)

    const { usuario, setUsuario } = useContexto();

    const atualizarPreferencias = async () => {
        await Termos.agreeNewTerms(usuario?.usuario.id as number, termos?._id as string, opcionaisSelecionados);
        const novoUsuario = { ...usuario, usuario: { ...usuario?.usuario, id_politica_privacidade: termos?._id, politicas_opcionais_aceitas:opcionaisSelecionados } } as UsuarioContext;
        setUsuario(novoUsuario);
        sessionStorage.setItem('usuario', JSON.stringify(novoUsuario));
    }

    const getInfo = async () => {
        await Termos.getLastTerm().then((res) => setTermos(res));
        setOpcionaisSelecionados(usuario?.usuario.politicas_opcionais_aceitas as number[])
    }

    useEffect(() => {
        if (usuario) {
            getInfo()
        }
    }, [usuario])
    return (
        <div className="policy-details-container">
            <h1>Política de Privacidade</h1>
            <p>{termos?.politicas.obrigatorio}</p>
            <h2>Termos Opcionais</h2>
            {termos?.politicas.opcionais.length && termos?.politicas.opcionais.map(item => (
                <div key={item.index}>
                    <div className="policy-details-optionals-title">
                        <Checkbox
                            checked={Boolean(opcionaisSelecionados.find(index => item.index === index))}
                            onChange={() => {
                                setUpdatePreferences(true)
                                if (opcionaisSelecionados.find(index => item.index === index)) {
                                    const opcionaisSelecionadosTemp = [...opcionaisSelecionados].filter(index => item.index !== index)
                                    setOpcionaisSelecionados(opcionaisSelecionadosTemp)
                                } else {
                                    const opcionaisSelecionadosTemp = [...opcionaisSelecionados]
                                    opcionaisSelecionadosTemp.push(item.index)
                                    setOpcionaisSelecionados(opcionaisSelecionadosTemp)
                                }
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                        <h3>
                            {item.titulo}
                        </h3>
                    </div >
                    <div>
                        {item.conteudo}
                    </div>
                </div>
            ))}
            <div className="policy-details-btn"><Button
                variant="contained"
                type="button"
                onClick={() => atualizarPreferencias()}
                disabled={!updatePreferences}
            >
                Atualizar Preferências
            </Button>
            </div>
        </div>
    )
}