import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import axios from 'axios';
const api = axios.create();

export interface Registros {
  [key: string]: string;
}

export interface Tabelas {
  name: string;
  fields: string[];
  data: Registros[];
}

export type CondicaoData = 'CONTEM' | 'CONTEM EXATO' | 'IGUAL' | 'COMECA';

type TabelasStateData = {
  indexTabelaAtual: number;
  tabelas: Tabelas[];
};

export interface TabelasContextData extends TabelasStateData {
  limites: number[];
  condicoes: CondicaoData[];
  handleChangeTable: (index: number) => void;
}

type TabelasProviderProps = {
  children: React.ReactNode;
};

const limites = [10, 50, 100, 500, 1000, 5000];
const condicoes: CondicaoData[] = ['CONTEM', 'CONTEM EXATO', 'IGUAL', 'COMECA'];

const TabelasContext = createContext<TabelasContextData>(
  {} as TabelasContextData
);

export const TabelasProvider: React.FC<TabelasProviderProps> = ({
  children,
}: TabelasProviderProps) => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    api.defaults.baseURL = `${origin}/api`;
  }

  const [state, setState] = useState<TabelasStateData>({
    indexTabelaAtual: 0,
    tabelas: [],
  });

  useEffect(() => {
    try {
      api.get<Tabelas[]>('/lista-tabelas').then(async ({ data }) => {
        setState({
          indexTabelaAtual: 0,
          tabelas: data.map(d => ({ ...d, data: [] })),
        })

        if (data.length) {
          data.forEach(async (tabela) => {
            const url = '/tabela?name=' + tabela.name;
            const { data: registros } = await api.get<Registros[]>(url);

            setState(({ indexTabelaAtual, tabelas }) => {
              const newTabelas = [...tabelas];
              const index = tabelas.findIndex(t => t.name === tabela.name);
              newTabelas[index].data = registros;

              return {
                indexTabelaAtual,
                tabelas: newTabelas
              };
            });
          });
        }
      });
    } catch (error) {
      console.log("Erro")
      console.log(error)
    }
  }, []);

  const handleChangeTable = useCallback((index: number) => {
    setState((current) => ({
      ...current,
      indexTabelaAtual: index,
    }));
  }, []);

  return (
    <TabelasContext.Provider
      value={{
        ...state,
        limites,
        condicoes,
        handleChangeTable,
      }}
    >
      {children}
    </TabelasContext.Provider>
  );
};

export const useTabelas = (): TabelasContextData => {
  const context = useContext(TabelasContext);

  if (!context) {
    throw new Error('useTabelas must be used withn a TabelasProvider');
  }

  return context;
};
