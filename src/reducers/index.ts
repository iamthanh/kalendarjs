import { combineReducers } from 'redux';
import selectedDateReducer from './SelectedDate.reducers';
import UserEventsReducer from './UserEvents.reducers';

const allReducers = combineReducers({
  selectedDate: selectedDateReducer,
  userEvents: UserEventsReducer
})

export default allReducers;