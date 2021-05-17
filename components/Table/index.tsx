import React from 'react';
import { TableContainer } from './styles';

interface TbodyProps {
  fields: string[];
  itens: any[];
}

interface ItemProps {
  fields: string[];
  item: any;
}

const Table: React.FC<TbodyProps> = ({ itens, fields }) => {
  return (
    <TableContainer>
      <Thead fields={fields} />
      <tbody>
        {itens.map((item: any, i) => {
          return <Item key={'Item' + i} item={item} fields={fields} />;
        })}
      </tbody>
    </TableContainer>
  );
};

const Thead: React.FC<{ fields: string[] }> = ({ fields }) => {
  return (
    <thead>
      <tr>
        {fields.map((campo, index) => {
          return <th key={index}> {campo} </th>;
        })}
      </tr>
    </thead>
  );
};

const Item: React.FC<ItemProps> = ({ fields, item }) => {
  return (
    <tr>
      {fields.map((campo: string, index: number) => {
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
