import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import jsonTabelas from '../../../database/tabelas.json';
import jsonProdutos from '../../../database/produtos.json';
import jsonBens from '../../../database/bens.json';

type CondicaoData = 'CONTEM' | 'CONTEM EXATO' | 'IGUAL' | 'COMECA';

type TabelasStateData = {
  indexTabelaAtual: number;
};

export interface TabelasContextData extends TabelasStateData {
  tabelas: any[];
  produtos: any[];
  bens: any[];
  limites: number[];
  condicoes: CondicaoData[];
  handleChangeTable: (index: number) => void;
}

type FiltroData = {
  campo: string;
  condicao: CondicaoData;
  operacao: string;
  texto: string;
}

type TabelasProviderProps = {
  children: React.ReactNode;
};

const data = (() => {
  const strProdutos = JSON.stringify(jsonProdutos).toUpperCase();
  const produtos = JSON.parse(strProdutos) as any[];

  const strTabelas = JSON.stringify(jsonTabelas).toUpperCase();
  const tabelas = JSON.parse(strTabelas) as any[];

  const strBens = JSON.stringify(jsonBens).toUpperCase();
  const bens = JSON.parse(strBens) as any[];

  return { produtos, tabelas, bens };
})();

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
  });

  const handleChangeTable = useCallback((index: number) => {
    setState(current => ({
      ...current,
      indexTabelaAtual: index,
    }));
  }, [])

  return (
    <TabelasContext.Provider
      value={{
        ...state,
        ...data,
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
