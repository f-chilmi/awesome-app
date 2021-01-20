import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducer/data';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger),
);

export default store;
