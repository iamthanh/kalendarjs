import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

type eventProps = {
  title: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date
  clickHandler: Function
}

const Event = (props: eventProps) => {

  const current = new Date();

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

  const hasEventExpired = (date: Date): boolean => {
    if (date < current) {
      return true;
    }
    return false;
  }  

  const eventDropdownHandler = React.forwardRef((props: any, ref:any) => {
    const { children, onClick } = props;
    return (<a ref={ref} onClick={(e) => onClick(e)}>{children}</a>);
  });

  return (
    <div className={'event ' + (hasEventExpired(new Date(props.startDateTime)) ? 'expired' : '')} >
      <div className='ellipsis'>
        <Dropdown>
          <Dropdown.Toggle as={eventDropdownHandler} id="dropdown-basic">
            <FontAwesomeIcon icon={faEllipsisV} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => props.clickHandler()}>Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>        
      </div>

      <div className='time'>{getReadableTime(new Date(props.startDateTime))}</div>
      <div className='title'>{props.title}</div>
      <div className='desciption'>
        {props.description}
      </div>
    </div>
  )
}

export default Event;