import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import api from '../services/api';

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
  const [state, setState] = useState<TabelasStateData>({
    indexTabelaAtual: 0,
    tabelas: [],
  });

  useEffect(() => {
    try {
      api.get<Tabelas[]>('/lista-tabelas').then(async ({ data }) => {
        if (data.length) {
          const promises = data.map(async (tabela) => {
            const url = '/tabela?name=' + tabela.name;
            const { data } = await api.get<Registros[]>(url);
              return { ...tabela, data };
          });
          const tabelas = await Promise.all(promises);
          if (tabelas) {
            setState((current) => ({ ...current, tabelas }));
          }
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
