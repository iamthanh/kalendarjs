import { 
  SET_USER_EVENTS,
  ADD_USER_EVENTS, 
  UPDATE_ONE_EVENT, 
  DELETE_ONE_EVENT 
} from './../actions/Event.actions'; 

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
    case DELETE_ONE_EVENT: {
      return (state as any).filter(_event => _event._id !== action.payload);
    }
  }
  return state
}

export default UserEventsReducer;