import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem 25vw;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 68rem;

  textarea {
    color: #000;
    resize: none;
    height: 25vh;
  }

  span, button {
    margin-top: 1rem;
  }

  input {
    padding: 8px;
    color: #000;
  }
`;
