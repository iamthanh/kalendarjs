import { combineReducers } from 'redux';
import selectedDateReducer from './selectedDate';
import UserEventsReducer from './userEvents';

const allReducers = combineReducers({
  selectedDate: selectedDateReducer,
  userEvents: UserEventsReducer
})

export default allReducers;