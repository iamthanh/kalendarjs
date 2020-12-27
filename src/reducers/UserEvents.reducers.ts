import { SET_USER_EVENTS, ADD_USER_EVENTS, UPDATE_ONE_EVENT } from './../actions/Event.actions'; 

type action = {
  type: string,
  payload: any
}

const UserEventsReducer = (state = null, action: action) => {
  switch (action.type) {
    case SET_USER_EVENTS: {
      return action.payload;
    }
    case ADD_USER_EVENTS: {
      return [...(state as any), action.payload];
    }

    case UPDATE_ONE_EVENT: {
      let id = action.payload.id;
      return (state as any).map((_event) => {
        if (_event._id === id) {
          return {
            ..._event,
            ...action.payload
          }
        }
        return _event;
      });
    }
  }

  return state
}

export default UserEventsReducer;