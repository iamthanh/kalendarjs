export const setSelectedDate = (date:Date) => {
  return {
    type: 'selectedDate/update',
    payload: date 
  }
}