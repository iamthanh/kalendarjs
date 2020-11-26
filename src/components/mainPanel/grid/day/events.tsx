import React from 'react';

const Events = (props:any) => {
  return (
    <div className='events-in-day'>
      {props.events.length > 0 && 
        <ul className='events-container'>
          {props.events.map((event, i)=> 
            <li className='event bg-primary text-white' key={i}>{event.title}</li>
          )}
        </ul>
      }
    </div>
  )
};

export default Events;