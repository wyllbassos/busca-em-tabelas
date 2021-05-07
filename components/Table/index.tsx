import React from 'react';
import { TableContainer } from './styles';

interface TbodyProps {
  listaCampos: string[];
  itens: any[];
}

interface ItemProps {
  listaCampos: string[];
  item: any;
}

const Table: React.FC<TbodyProps> = ({ itens, listaCampos }) => {
  return (
    <TableContainer
      id="listaRegistros"
      className="table table-dark table-striped"
    >
      <Thead listaCampos={listaCampos} />
      <tbody key={listaCampos[0]}>
        {itens.map((item: any, i) => {
          return (
            <Item key={'Item' + i} item={item} listaCampos={listaCampos} />
          );
        })}
      </tbody>
    </TableContainer>
  );
};

const Thead: React.FC<{ listaCampos: string[] }> = ({ listaCampos }) => {
  return (
    <thead>
      <tr>
        {listaCampos.map((campo, index) => {
          return <th key={index}> {campo} </th>;
        })}
      </tr>
    </thead>
  );
};

const Item: React.FC<ItemProps> = ({ listaCampos, item }) => {
  return (
    <tr>
      {listaCampos.map((campo: string, index: number) => {
        return (() => {
          try {
            return <td key={index.toString()}> {item[campo]} </td>;
          } catch (error) {
            alert(error);
          }
        })();
      })}
    </tr>
  );
};

export default Table;
