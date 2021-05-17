import styled from 'styled-components';

type HeaderButtonProps = {
  selected?: boolean;
};

export const Header = styled.header`
  display: flex;
  height: 3rem;

  align-items: center;

  background-color: var(--green);
  color: var(--white);

  border-bottom: 1px solid var(--gray2);

  img {
    height: 100%;
    margin-left: 2rem;
  }

  span {
    margin: 0 2rem;
  }

  > span {
    margin-left: 0;
  }
`;

export const HeaderButton = styled.div<HeaderButtonProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  padding: 0 1.5rem;

  span {
    font-weight: 600;
    margin: 0;
    border-bottom: ${({ selected }) =>
      selected ? '2px solid var(--white)' : ''};
  }

  &:hover {
    transition: filter 0.2s;
    filter: brightness(0.7);
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 7rem;

  border-bottom: 1px solid var(--gray2);
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 16px;

  height: 2rem;

  border: 1px solid var(--gray2);
  border-radius: 0.4rem;

  span,
  select,
  input,
  button {
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 0;

    background-color: var(--green);
    color: var(--white);

    padding: 0 1rem;

    border: 0;
    border-right: 1px solid var(--gray2);
  }

  select {
    background-color: var(--green);
  }

  input {
    background-color: var(--white);
    color: var(--gray1);
  }

  .red {
    background-color: var(--red);
  }

  .borders-left {
    border-radius: 0.4rem 0 0 0.4rem;
  }

  .borders-right {
    border-radius: 0 0.4rem 0.4rem 0;
  }
`;

export const MainContainer = styled.main`
  position: relative;
  height: calc(100vh - 14rem);
  width: 100vw;
  overflow: auto;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 3rem;

  background-color: var(--dark);
  color: var(--white);

  border-top: 1px solid var(--gray2);
`;
