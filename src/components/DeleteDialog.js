import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';

function DeleteDialog({ show, title, handleHide, handleDeleteEntry }) {
  function handleDelete() {
    handleDeleteEntry();
    handleHide();
  }

  return (
    <Dialog
      open={show}
      onClose={handleHide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title || 'Delete city from list?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleHide} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleDeleteEntry: PropTypes.func.isRequired
};

export const name = 'deleteCurrentWeatherEntry';

export default connectModal({ name })(DeleteDialog);
