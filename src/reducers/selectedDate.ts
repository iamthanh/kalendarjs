const UPDATE_SELECTED_DATE = 'selectedDate/update';

type action = {
  type: string,
  payload: any
}

const SelectedDateReducer = (state=null, action:action) => {
  if (action.type === UPDATE_SELECTED_DATE) {
    return action.payload
  }
  return state
}

export default SelectedDateReducer;