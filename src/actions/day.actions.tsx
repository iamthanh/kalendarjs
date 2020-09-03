export const setSelectedDate = (date:Date) => {
  return {
    type: 'selectedDate/update',
    date: date 
  }
}