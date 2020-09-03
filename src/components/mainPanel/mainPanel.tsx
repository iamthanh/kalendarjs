import React from 'react';
import Grid from './grid/grid';
import { connect } from 'react-redux'

const MainPanel = () => {
  return (
    <div className="main-panel">
      <Grid />
    </div>
  );
}

const mapStateToProps = (state:any) => state;
const ConnectedMainPanel = connect(mapStateToProps)(MainPanel)
export default ConnectedMainPanel