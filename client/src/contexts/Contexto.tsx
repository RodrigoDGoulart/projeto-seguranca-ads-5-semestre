import { createContext, useEffect, useState } from "react";
import { Usuario } from "../types";

interface ContextProps {
  usuario: Usuario | undefined;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | undefined>>;
};

const Contexto = createContext({} as ContextProps);

function ContextoProvider({ children }: any) {
  const [usuario, setUsuario] = useState<Usuario>();

  useEffect(() => {
    console.log(usuario);
    if (!usuario) {
      const usuarioJSON = sessionStorage.getItem('usuario');
      console.log(usuarioJSON);
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