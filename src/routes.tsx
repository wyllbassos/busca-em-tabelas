import React from 'react';

import ConsultaEmTabelas from './pages/ConsultaEmTabelas';

import { BrowserRouter, Route } from 'react-router-dom';
import Providers from './pages/ConsultaEmTabelas/hooks/index';

function Routes() {
  return (
    <Providers>
      <BrowserRouter>
        <Route path="/" exact component={ConsultaEmTabelas} />
      </BrowserRouter>
    </Providers>
  );
}

export default Routes;
