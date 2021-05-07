import React from 'react';

import { TabelasProvider } from './tabelas';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }: Props) => {
  return <TabelasProvider>{children}</TabelasProvider>;
};

export default Providers;
