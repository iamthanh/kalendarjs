export const setUserEvents = (events: any) => {
  return {
    type: 'userEvents/update',
    payload: events 
  }
}