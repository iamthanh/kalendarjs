const UPDATE_USER_EVENTS = 'userEvents/update';
const ADD_USER_EVENTS = 'userEvents/add';

type action = {
  type: string,
  payload: any
}

const UserEventsReducer = (state = null, action: action) => {

  switch (action.type) {
    case UPDATE_USER_EVENTS: {
      return action.payload;
    }
    case ADD_USER_EVENTS: {
      return [...(state as any), action.payload];
    }
  }

  return state
}

export default UserEventsReducer;