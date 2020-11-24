export const setUserEvents = (events: any) => {
  return {
    type: 'userEvents/update',
    payload: events 
  }
}

export const addEvent = (event: any) => {
  return {
    type: 'userEvents/add',
    payload: event
  }
}