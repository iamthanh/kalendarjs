import React, { useState } from 'react';
import { connect } from 'react-redux';

type DayProps = {
  store: any
}

function SelectedDate(props: any) {

  const selectedDate: Date = new Date(props.store.selectedDate);

  const dayOfWeekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];

  const getNth = function(d:number) : string {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  return (
    <div className="selected-date-container">
      {selectedDate !== null && (
        <>
          <div className="day-of-week">
            {dayOfWeekName[selectedDate.getDay()]}
          </div>
          <div className="date-parts">
            <span className="month">{selectedDate.toLocaleString('default', { month: 'long' })}</span>&nbsp;
            <span className="day-number">{selectedDate.getDate()+getNth(selectedDate.getDate())}</span>,&nbsp;
            <span className="year">{selectedDate.getFullYear()}</span>
          </div>
        </>
      )}

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(SelectedDate);
