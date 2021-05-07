import styled from 'styled-components';

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      th {
        padding: 8px 8px;
      }
    }
  }

  tbody {
    tr {
      td {
        border-top: 1px solid var(--gray1);
        padding: 12px 16px;
      }
    }
  }
`;
