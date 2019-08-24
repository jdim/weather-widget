import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { ALL, ACTIVE, DELETED } from '../constants/entriesStatuses';
import { Link } from 'react-router-dom';

const TabLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

function EntryStatusTabs({ current }) {
  return (
    <AppBar position="static" color="default">
      <Tabs value={current} indicatorColor="primary">
        <Tab label="All" value={ALL} component={TabLink} to={`/${ALL}`} />
        <Tab
          label="Active"
          value={ACTIVE}
          component={TabLink}
          to={`/${ACTIVE}`}
        />
        <Tab
          label="Deleted"
          value={DELETED}
          component={TabLink}
          to={`/${DELETED}`}
        />
      </Tabs>
    </AppBar>
  );
}

EntryStatusTabs.propTypes = {
  current: PropTypes.oneOf([ALL, ACTIVE, DELETED]),
  onChange: PropTypes.func
};

export default EntryStatusTabs;
