const UPDATE_USER_EVENTS = 'userEvents/update';

type action = {
  type: string,
  payload: any
}

const UserEventsReducer = (state=null, action:action) => {
  if (action.type === UPDATE_USER_EVENTS) {
    return action.payload
  }
  return state
}

export default UserEventsReducer;