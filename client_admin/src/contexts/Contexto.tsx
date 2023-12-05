import { createContext, useEffect, useState } from "react";

interface ContextProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const Contexto = createContext({} as ContextProps);

function ContextoProvider({ children }: any) {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) {
      const token = sessionStorage.getItem('token');
      if (token) {
        setToken(token);
      }
    }
  }, [token]);
  return(
    <Contexto.Provider value={{token, setToken}}>
      {children}
    </Contexto.Provider>
  );
};

export {ContextoProvider, Contexto};