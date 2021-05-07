type Dados = {
  [key: string]: any;
};

interface Filtro {
  dados: Array<Dados>;
  campos: Array<string>;
  operadores: Array<string>;
  valores: Array<string>;
}

const Filtrar = (filtros: Filtro) => {
  const { dados, campos, operadores, valores } = filtros;

  let dadosFiltrado = [];
  let verifica =
    Array.isArray(dados) &&
    Array.isArray(campos) &&
    Array.isArray(operadores) &&
    Array.isArray(valores);
  if (!verifica) return undefined;
  verifica = campos.length === operadores.length;
  verifica = (valores.length === operadores.length) === verifica;
  if (!verifica) return undefined;
  //let encontrado = false;
  for (let i = 0; i < dados.length; i++) {
    const dado = dados[i];
    let ok = true;
    for (let j = 0; j < campos.length; j++) {
      const campo = campos[j];
      const operador = operadores[j];
      const valor = valores[j];

      switch (operador) {
        case 'contem':
          if (dado[campo].search(valor) < 0) {
            ok = false;
            break;
          }
          break;

        default:
          break;
      }
    }
    if (ok) dadosFiltrado.push(dado);
  }
  return dadosFiltrado;
};

export default Filtrar;
