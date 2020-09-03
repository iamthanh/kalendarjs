import selectedDateReducer from './selectedDate';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  selectedDate: selectedDateReducer
})

export default allReducers;