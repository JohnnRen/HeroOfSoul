// @flow
import 'semantic-ui-css';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import StoreProvider from './redux/StoreProvider';
import TestPage from './views/TestPage';

const App = (
  <StoreProvider>
    <BrowserRouter>
      <Route path="/" component={TestPage} />
    </BrowserRouter>
  </StoreProvider>
);

const anchor = document.getElementById('root');
if (anchor) {
  ReactDom.render(App, anchor);
}
