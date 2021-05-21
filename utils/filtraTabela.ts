import { Tabelas, CondicaoData, Registros } from '../hooks/tabelas';

export type Filtro = {
  campo: string;
  condicao: CondicaoData;
  texto: string;
};

export const filtraTabela = (
  tabela: Tabelas,
  filtros: Filtro[],
) => {
  const { data, fields } = tabela;
  const dataFiltered: Registros[] = [];
  try {
    data.forEach((register) => {
      let filterOk = true;
      filtros.forEach((filtro) => {
        let { campo, texto, condicao } = filtro;
        texto = String(texto.toUpperCase());
        if (texto !== '') {
          let valueCampo = '';
          if (
            campo === 'QUALQUER' &&
            (condicao === 'CONTEM' || condicao === 'CONTEM EXATO')
          )
            fields.forEach((field) => {
              valueCampo += register[field] + '\t';
            });
          else valueCampo = register[campo];
          switch (condicao) {
            case 'CONTEM': {
              const arrTexto: string[] = texto.split(' ');
              filterOk = filterOk && true;
              for (let index = 0; index < arrTexto.length; index++) {
                const locTexto = arrTexto[index];
                if (!filterOk) continue;
                if (locTexto !== '')
                  filterOk = filterOk && valueCampo.indexOf(locTexto) > -1;
              }
              break;
            }

            case 'CONTEM EXATO': {
              filterOk = filterOk && valueCampo.indexOf(texto) > -1;
              break;
            }

            case 'IGUAL': {
              if (!(campo === 'QUALQUER'))
                filterOk = filterOk && register[campo] === texto;
              else {
                let lfilterOk = false;
                fields.forEach((field) => {
                  lfilterOk = lfilterOk || register[field] === texto;
                });
                filterOk = filterOk && lfilterOk;
              }
              break;
            }

            case 'COMECA': {
              filterOk =
                filterOk && valueCampo.slice(0, texto.length) === texto;
              break;
            }

            default: {
              break;
            }
          }
        }
      });

      if (filterOk) {
        if (filterOk) dataFiltered.push(register);
      }
    });
  } catch (error) {
    console.log(error, filtros);
  }
  return dataFiltered;
};
