import React, { useEffect } from 'react';
import './gridHeader.scss';

type GridHeaderProps = {
  // date: Date
}

function GridHeader(props: GridHeaderProps) {

  useEffect(() => {

  }, [])

  return (
    <div className="grid-header-container">
      <div className='info-header'>
        <div className='month'></div>
        <div className='year'></div>
      </div>
      <div className='days-of-week'>
        {['Mon', 'Tue', 'Wed', 'Thur','Fri', 'Sat', 'Sun'].map((name, index) => (
          <div key={index} className='day-of-week'>{name}</div>
        ))}
      </div>
    </div>
  );
}

export default GridHeader;
