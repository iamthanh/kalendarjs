import { createStore } from 'redux';
import allReducer from './reducers';

export const store = createStore(allReducer);