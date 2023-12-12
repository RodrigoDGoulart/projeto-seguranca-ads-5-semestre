import { createContext, useEffect, useState } from "react";
import { UsuarioContext } from "../types/usuario";
import api from "../services/api";

interface ContextProps {
  usuario: UsuarioContext | undefined;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioContext | undefined>>;
};

const Contexto = createContext({} as ContextProps);

function ContextoProvider({ children }: any) {
  const [usuario, setUsuario] = useState<UsuarioContext>();

  useEffect(() => {
    console.log('POWEKFPOWKEPOFKWEPOFKWEPOFKWEPOFKPOWEFKPOWEFKPWEKFPOWEKFPOWEKFPWEKPFOWEK')
    if (!usuario) {
      const usuarioJSON = sessionStorage.getItem('usuario');
      if (usuarioJSON) {
        const usuarioObj = JSON.parse(usuarioJSON as string) as UsuarioContext;
        setUsuario(usuarioObj);
        api.setToken(usuarioObj.token);
      }
    }
  }, [usuario]);
  return(
    <Contexto.Provider value={{usuario, setUsuario}}>
      {children}
    </Contexto.Provider>
  );
};

export {ContextoProvider, Contexto};