import React from 'react';

const Events = (props:any) => {
  return (
    <div className='events-in-day'>
      {props.events.length > 0 && 
        <ul>
          {props.events.map((event, i)=> 
            <li>{event.title}</li>
          )}
        </ul>
      }
    </div>
  )
};

export default Events;