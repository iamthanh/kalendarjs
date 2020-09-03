const UPDATE_SELECTED_DATE = 'selectedDate/update';

type action = {
  type: string,
  date: Date
}

const CounterReducer = (value = new Date(), action:action) => {
  if (action.type === UPDATE_SELECTED_DATE) {
    return {
      ...value,
      value: action.date
    }
  }
  return value
}

export default CounterReducer;