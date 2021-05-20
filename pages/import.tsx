import { GetStaticProps } from 'next';
import React, { useState, useCallback } from 'react';
import api from '../services/api';
import { Container, InputGroup } from '../styles/import';

function makeObjectData(lines: string[][], header: string[]) {
  const numberColuns = header.length;
  const originalLines = [...lines];
  const linesReturn: string[][] = [];
  let next = true;
  originalLines.forEach((line, index, array) => {
    if (next){
      if (line.length === numberColuns) {
        linesReturn.push([...line]);
      } else {
        const nextIndex = index + 1
        
        if (array[nextIndex]) {
          const joinLine = [...line];
          const nextLine = [...array[nextIndex]]
          const lastIndexJoinLine = joinLine.length - 1;
          joinLine[lastIndexJoinLine] += " " + nextLine[0];
          nextLine.shift()
          linesReturn.push([...joinLine, ...nextLine]);
        }
        next = false;
      }
    } else {
      next = true;
    }
  })
  return linesReturn.map(lineRet => {
    const objRet: any = {};
    lineRet.forEach((cell, index) => 
      objRet[header[index]] = cell
    )
    return objRet;
  });
}

const Import: React.FC = () => {
  const [data, setDate] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");

  const handleSave = useCallback(async () => {
    const arrData = data.split("\n");
    const header = arrData.splice(0,1)[0].split("\t");

    const table = makeObjectData(arrData.map(line => line.split("\t")), header);

    try {
      await api.post('/import', { name, table, password })
      window.alert('Inportação realizada com sucesso!');
      setDate("");
      setName("");
      setPassword("");
    } catch (error) {
      const errorType = error.message || ''
      const errorMessage = (error.response && error.response.data && error.response.data.message)
      window.alert(errorType + '\n' +JSON.stringify(errorMessage))

    }

    // console.log(response.data);
  }, [name, data, password]);

  return (
    <Container>
      <h1>Importar Tabela de Dados Para Consulta</h1>

      <InputGroup>
        <span>Nome Tabela</span>
        <input value={name} type="text" onChange={({target: {value}}) => setName(value)} />
      </InputGroup>
      
      <InputGroup>
        <span>Dados (Copiar e colar uma tabela excel com cabeçalho)</span>
        <textarea value={data} onChange={ ({target: {value}}) => setDate(value) }/>
      </InputGroup>

      <InputGroup>
        <span>Senha</span>
        <input value={password} type="password" onChange={ ({target: {value}}) => setPassword(value) } />
      </InputGroup>

      <InputGroup>
        <button onClick={handleSave}>Salvar</button>
      </InputGroup>
    </Container>
  )
}

// export async function getServerSideProps() {
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { },
    revalidate: 9999,
  }
}

export default Import