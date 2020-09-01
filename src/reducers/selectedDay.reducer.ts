

const UPDATE_SELECTED_DATE = 'selectedDate/update';

type action = {
  type: string,
  date: Date
}

function CounterReducer(state = new Date(), action:action) {
  if (action.type === UPDATE_SELECTED_DATE) {
    return {
      ...state,
      value: action.date
    }
  }
  return state
}

export default CounterReducer;