export const SET_USER_EVENTS = 'userEvents/setUserEvents';
export const ADD_USER_EVENTS = 'userEvents/addOne';
export const UPDATE_ONE_EVENT = 'userEvents/updateOne';

export const SetUserEvents = (events: any) => {
  return {
    type: SET_USER_EVENTS,
    payload: events 
  }
}

export const AddOneEvent = (event: any) => {
  return {
    type: ADD_USER_EVENTS,
    payload: event
  }
}

export const UpdateOneEvent = (event: any) => {
  return {
    type: UPDATE_ONE_EVENT,
    payload: event
  }
}