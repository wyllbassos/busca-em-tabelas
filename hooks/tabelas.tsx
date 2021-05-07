import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import jsonTabelas from '../database/tabelas.json';
import jsonProdutos from '../database/produtos.json';
import jsonBens from '../database/bens.json';
import api from '../services/api';

type CondicaoData = 'CONTEM' | 'CONTEM EXATO' | 'IGUAL' | 'COMECA';

type TabelasStateData = {
  indexTabelaAtual: number;
  tabelas: any[];
  produtos: any[];
  bens: any[];
};

export interface TabelasContextData extends TabelasStateData {
  limites: number[];
  condicoes: CondicaoData[];
  handleChangeTable: (index: number) => void;
}

type FiltroData = {
  campo: string;
  condicao: CondicaoData;
  operacao: string;
  texto: string;
};

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
    produtos: [],
    tabelas: [],
    bens: [],
  });

  useEffect(() => {
    const init = async () => {
      const jsonTabelas = (await api.get('tabelas')).data;
      const strTabelas = JSON.stringify(jsonTabelas).toUpperCase();
      const tabelas = JSON.parse(strTabelas) as any[];

      const jsonBens = (await api.get('bens')).data;
      const strBens = JSON.stringify(jsonBens).toUpperCase();
      const bens = JSON.parse(strBens) as any[];

      const jsonProdutos = (await api.get('produtos')).data;
      const strProdutos = JSON.stringify(jsonProdutos).toUpperCase();
      const produtos = JSON.parse(strProdutos) as any[];

      setState((current) => ({
        ...current,
        tabelas,
        bens,
        produtos,
      }));
    };

    init();
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
