import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { ACTIVE, DELETED } from '../constants/entriesStatuses';
import { connect } from 'react-redux';
import { updateEntry, moveEntry } from '../actions/currentWeather';
import { UP, DOWN } from '../constants/moveDirections';
import { makeStyles } from '@material-ui/core/styles';
import DeleteDialog, { name as deleteDialogName } from './DeleteDialog';
import { show as showModal } from 'redux-modal';
import EditTempDialog, { name as editTempDialogName } from './EditTempDialog';

const useStyles = makeStyles(theme => ({
  statusBtn: {
    minWidth: '100px'
  }
}));

function TempRow(props) {
  const {
    id,
    city,
    temp,
    status,
    first,
    last,
    onClickMove,
    updateStatus,
    showModal
  } = props;

  const classes = useStyles();

  function handleOpenDelDialog(ev) {
    ev.stopPropagation();
    showModal(deleteDialogName, {
      title: `Delete "${city}" from list?`,
      handleDeleteEntry: () => updateStatus(id, DELETED)
    });
  }

  function handleOpenEditDialog() {
    showModal(editTempDialogName, { id });
  }

  function handleMove(ev) {
    ev.stopPropagation();
    const direction = parseInt(ev.currentTarget.dataset.direction, 10);
    onClickMove(id, direction);
  }

  return (
    <React.Fragment>
      <TableRow hover onClick={handleOpenEditDialog}>
        <TableCell>{city}</TableCell>
        <TableCell>{temp}</TableCell>
        <TableCell>
          <ButtonGroup
            variant="contained"
            aria-label="full-width contained primary button group"
          >
            <Button data-direction={UP} onClick={handleMove} disabled={first}>
              <ArrowDropUp />
              Move Up
            </Button>
            <Button data-direction={DOWN} onClick={handleMove} disabled={last}>
              <ArrowDropDown />
              Move Down
            </Button>
            {status === ACTIVE ? (
              <Button
                className={classes.statusBtn}
                onClick={handleOpenDelDialog}
              >
                Delete
              </Button>
            ) : (
              <Button
                className={classes.statusBtn}
                onClick={() => updateStatus(id, ACTIVE)}
              >
                Restore
              </Button>
            )}
          </ButtonGroup>
        </TableCell>
      </TableRow>

      <DeleteDialog />
      <EditTempDialog />
    </React.Fragment>
  );
}

TempRow.propTypes = {
  id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  status: PropTypes.oneOf([ACTIVE, DELETED]),
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  onClickMove: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateStatus: (id, status) => updateEntry(id, { status }),
  onClickMove: moveEntry,
  showModal
};

export default connect(
  null,
  mapDispatchToProps
)(TempRow);
