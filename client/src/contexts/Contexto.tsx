import { createContext, useEffect, useState } from "react";
import { UsuarioContext } from "../types/usuario";

interface ContextProps {
  usuario: UsuarioContext | undefined;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioContext | undefined>>;
};

const Contexto = createContext({} as ContextProps);

function ContextoProvider({ children }: any) {
  const [usuario, setUsuario] = useState<UsuarioContext>();

  useEffect(() => {
    if (!usuario) {
      const usuarioJSON = sessionStorage.getItem('usuario');
      setUsuario(JSON.parse(usuarioJSON as string));
    }
  }, [usuario]);
  return(
    <Contexto.Provider value={{usuario, setUsuario}}>
      {children}
    </Contexto.Provider>
  );
};

export {ContextoProvider, Contexto};