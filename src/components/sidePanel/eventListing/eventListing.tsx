import React, { useState } from 'react';
import { connect } from 'react-redux';

type DayProps = {
  store: any
}

function EventListing(props: any) {
  return (
    <div className='event-listing-container'>

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(EventListing);
