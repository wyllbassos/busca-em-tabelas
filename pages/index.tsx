import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { CondicaoData, useTabelas } from '../hooks/tabelas';
import { filtraTabela, Filtro } from '../utils/filtraTabela';

import Table from '../components/Table/index';

import {
  Header,
  HeaderButton,
  InputGroup,
  MainContainer,
  Section,
  Footer,
} from '../styles/index-styles';

const filtroInicial: Filtro = {
  campo: 'QUALQUER',
  condicao: 'CONTEM',
  texto: '',
};

const ConsultaEmTabelas: React.FC = () => {
  const {
    tabelas,
    limites,
    condicoes,
    indexTabelaAtual,
    handleChangeTable
  } = useTabelas();

  const [limiteAtual, setLimiteAtual] = useState(10);
  const [listaFiltroSTR, setListaFiltroSTR] = useState(new Array<string>());
  const [indexListaFiltroSTR, setIndexListaFiltroSTR] = useState(0);
  
  const [listaFiltros, setListaFiltros] = useState<Filtro[]>([
    { ...filtroInicial },
  ]);

  const {
    tableName,
    fields,
    data,
  } = useMemo(() => {
    if (tabelas.length) return {
      tableName: tabelas[indexTabelaAtual].name,
      fields: tabelas[indexTabelaAtual].fields,
      data: tabelas[indexTabelaAtual].data,
    };
    return {
      tableName: undefined,
      fields: undefined,
      data: undefined,
    };
  }, [tabelas, indexTabelaAtual]);

  console.log(indexTabelaAtual, fields, data);

  const campoAtual = useMemo(() => listaFiltros[0].campo, [listaFiltros]);
  const condicaoAtual = useMemo(() => listaFiltros[0].condicao, [listaFiltros]);
  const textoAtual = useMemo(() => listaFiltros[0].texto, [listaFiltros]);

  const dataFilter = useMemo(
    () => (tableName && fields && data)
      ? filtraTabela({ data, fields, name: tableName }, listaFiltros)
      : [],
    [tableName, fields, data, listaFiltros]
  );

  const dataDisplayed = useMemo(
    () => [...dataFilter].splice(0, limiteAtual),
    [dataFilter, limiteAtual]
  );

  useEffect(() => {
    setListaFiltros([{ ...filtroInicial }]);
  }, [data]);

  useEffect(() => {
    setListaFiltroSTR(() => 
      listaFiltros.map(filtro => {
        return (filtro.campo === "QUALQUER")
          ? (`${filtro.campo} COLUNA ${filtro.condicao} '${filtro.texto}'`)
          : (`${filtro.campo} ${filtro.condicao} '${filtro.texto}'`)
      })
    )
  }, [listaFiltros]);

  function setFiltroLimite(limite: any) {
    setLimiteAtual(limite);
  }

  function setFiltroCampo(campo: string) {
    setListaFiltros((current) => {
      const newFiltro = current[0];
      newFiltro.campo = campo;
      return [newFiltro, ...current.slice(1, current.length)];
    });
  }

  function setFiltroCondicao(condicao: CondicaoData) {
    setListaFiltros((current) => {
      const newFiltro = current[0];
      newFiltro.condicao = condicao;
      return [newFiltro, ...current.slice(1, current.length)];
    });
  }

  function setFiltroTexto(texto: string) {
    setListaFiltros((current) => {
      const newFiltro = current[0];
      newFiltro.texto = texto.toUpperCase();
      return [newFiltro, ...current.slice(1, current.length)];
    });
  }

  function salvaFiltro() {
    setListaFiltros((current) => {
      const newFiltro: Filtro = {
        campo: current[0].campo,
        condicao: current[0].condicao,
        texto: '',
      };
      return [newFiltro, ...current];
    });
  }

  function limparFiltros() {
    setListaFiltros([{ ...filtroInicial }]);
  }

  const handleChangeSetFilter = useCallback((target: EventTarget & HTMLSelectElement) => {
    const { selectedIndex } = target
    setListaFiltros(current => {
      const selectedFilter = current.splice(selectedIndex, 1)
      if (current[0].texto === "") {
        current.splice(0, 1)
      }
      return [...selectedFilter, ...current];
    })
    setIndexListaFiltroSTR(0);
  }, [])

  const handleDeleteFilter = useCallback((index: number) => {
    setListaFiltros(current => {
      if(current.length === 1 ){
        return [{ ...current[0], texto: '' }]
      }
      current.splice(index, 1)
      return [...current];
    })
    const newIndex = index - 1
    setIndexListaFiltroSTR(newIndex < 0 ? 0 : newIndex);
  }, [])

  if (!fields || !data || !tableName) return <div>Carregando...</div>;

  return (
    <>
      <Header>
        <img src="logo.png" alt="logo" />

        <span>Consultas PCM</span>

        {tabelas.map((nTab, i) => (
          <HeaderButton
            selected={tableName === nTab.name}
            onClick={() => {
              handleChangeTable(i);
            }}
            key={String(i)}
          >
            <span>{nTab.name}</span>
          </HeaderButton>
        ))}

        <span>Exibidos {dataDisplayed.length}</span>
        <span>Filtrados {dataFilter.length ? dataFilter.length : dataDisplayed.length}</span>
        <span>Total {data.length}</span>
      </Header>

      <Section>
        <InputGroup>
          <span className="borders-left">Filtrar</span>

          <select
            value={campoAtual}
            onChange={({ target }) => {
              setFiltroCampo(target.value);
            }}
          >
            {['QUALQUER', ...fields].map((campo) => (
              <option key={campo} value={campo}>
                {campo}
              </option>
            ))}
          </select>

          <select
            value={condicaoAtual}
            onChange={({ target }) => {
              const condicao = target.value.toUpperCase() as CondicaoData;
              setFiltroCondicao(condicao);
            }}
          >
            {condicoes.map((condicao) => (
              <option key={condicao} value={condicao}>
                {condicao}
              </option>
            ))}
          </select>

          <input
            value={textoAtual}
            onChange={({ target }) => {
              setFiltroTexto(target.value);
            }}
            type="text"
          />

          <button type="button" onClick={salvaFiltro}>
            Salvar Filtro
          </button>
          <button
            type="button"
            onClick={limparFiltros}
            className="red borders-right"
          >
            Limpar Filtros
          </button>
        </InputGroup>
        
        <InputGroup>
          <span className="borders-left">Filtros</span>
          <select
            value={listaFiltroSTR[indexListaFiltroSTR]}
            onChange={({ target }) => {
              handleChangeSetFilter(target);
            }}
          >
            {listaFiltroSTR.map((filtro, i) => (
              <option key={String(i)} value={filtro}>
                {filtro}
              </option>
            ))}
          </select>
          <button
            className="red borders-right"
            type="button"
            onClick={() => {
              handleDeleteFilter(indexListaFiltroSTR)
            }}>
            Excluir
          </button>
        </InputGroup>
      </Section>

      <MainContainer>
        <Table itens={dataDisplayed} fields={fields} />
      </MainContainer>

      <Footer>
        <InputGroup>
          <span className="borders-left">Itens Por Pagina</span>
          <select
            value={limiteAtual}
            onChange={({ target }) => {
              setFiltroLimite(Number(target.value));
            }}
          >
            {limites.map((limite) => (
              <option key={limite} value={limite}>
                {limite}
              </option>
            ))}
          </select>
        </InputGroup>
      </Footer>
    </>
  );
};
export default ConsultaEmTabelas;
