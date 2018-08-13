import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from '../models/AppState';
import indexReducer from './reducers';
import React from 'react';

const initialState = new AppState();
let store = createStore(indexReducer, initialState);

/**
 * Redux provider with a store created
 */
const StoreProvider = ({ children }) => {
  <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
