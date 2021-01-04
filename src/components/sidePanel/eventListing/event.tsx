import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export type EventProps = {
  _id?: string,
  title: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date
  editEventClickHandler: Function,
  deleteEventClickHandler: Function
}

const Event = (props: EventProps) => {

  const current = new Date();

  const hasEventExpired = (date: Date): boolean => date < current

  const getReadableTime = (Date: Date) => {
    let hour: number = Date.getHours();
    let mins: string = '' + Date.getMinutes();
    let dayNight: string = 'AM';

    if (mins === '0') mins = '00';

    if (Date.getHours() > 12) {
      hour = Date.getHours() - 12;
      dayNight = 'PM';
    } else if (Date.getHours() === 0) {
      hour = 12;
      dayNight = 'AM';
    }
    return hour + ':' + mins + ' ' + dayNight;
  }

  return (
    <div className={'event ' + (hasEventExpired(new Date(props.startDateTime)) ? 'expired' : '')} >
      <div className='time'>{getReadableTime(new Date(props.startDateTime))}</div>
      <div className='title'>{props.title}</div>
      <div className='desciption'>
        {props.description}
      </div>
      <div className='event-controls'>
        <FontAwesomeIcon className="control-icon edit" icon={faPencilAlt} onClick={() => props.editEventClickHandler()} />
        <FontAwesomeIcon className="control-icon delete" icon={faTrash} onClick={() => props.deleteEventClickHandler()} />
      </div>
    </div>
  )
}

export default Event;