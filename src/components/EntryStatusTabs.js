import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectStatus } from '../actions/entriesStatus';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import * as status from '../constants/entriesStatuses';
import { getSelectedStatusTab } from '../reducers/selectedStatusTab';

function EntryStatusTabs(props) {
  const { current, onChange } = props;
  return (
    <AppBar position="static" color="default">
      <Tabs value={current} onChange={onChange} indicatorColor="primary">
        <Tab label="All" value={status.ALL} />
        <Tab label="Active" value={status.ACTIVE} />
        <Tab label="Deleted" value={status.DELETED} />
      </Tabs>
    </AppBar>
  );
}

EntryStatusTabs.propTypes = {
  current: PropTypes.number,
  onChange: PropTypes.func
};

const mapStateToProps = state => ({
  current: getSelectedStatusTab(state)
});

const mapDispatchToProps = dispatch => ({
  onChange: (ev, value) => {
    dispatch(selectStatus(value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryStatusTabs);
