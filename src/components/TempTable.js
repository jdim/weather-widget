import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getItems } from '../reducers/currentWeather';
import TempRow from './TempRow';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

function TempTable({ rows, rowRender }) {
  const classes = useStyles();
  if (!rows.length) {
    return (
      <Typography
        className={classes.root}
        color="textSecondary"
        variant="body1"
      >
        No Records, please add a city or change the status of existing
      </Typography>
    );
  }

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>City</TableCell>
          <TableCell>℃</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx, { length }) => (
          <TempRow
            key={row.id}
            {...row}
            first={idx === 0}
            last={idx === length - 1}
          />
        ))}
      </TableBody>
    </Table>
  );
}

TempTable.propTypes = {
  rows: PropTypes.array.isRequired,
  selectedStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  rows: getItems(state, ownProps.selectedStatus)
});

export default connect(
  mapStateToProps,
  null
)(TempTable);
