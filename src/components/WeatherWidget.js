import React from 'react';
import AddCity from './AddCity';
import EntryStatusTabs from './EntryStatusTabs';
import TempTable from './TempTable';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'inline-block',
    minWidth: '600px'
  }
}));

function WeatherWidget(props) {
  const classes = useStyles();
  const { params } = props.match;

  return (
    <Paper className={classes.root}>
      <AddCity />
      <EntryStatusTabs current={params.selectedStatus} />
      <TempTable selectedStatus={params.selectedStatus} />
    </Paper>
  );
}

export default WeatherWidget;
