import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connectModal } from 'redux-modal';
import { makeStyles } from '@material-ui/core/styles';
import { getById } from '../reducers/currentWeather';
import { connect } from 'react-redux';
import { updateEntry } from '../actions/currentWeather';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

function EditTempDialog(props) {
  const { show, handleHide, entry, id, updateEntry } = props;
  const classes = useStyles();

  const [values, setValues] = React.useState({
    city: entry.city,
    temp: entry.temp
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = () => {
    updateEntry(id, { ...values, temp: parseInt(values.temp, 10) });
    handleHide();
  };

  return (
    <Dialog
      open={show}
      onClose={handleHide}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Temperature Record</DialogTitle>
      <DialogContent>
        <div className={classes.row}>
          <TextField
            id="city"
            label="city"
            className={classes.textField}
            value={values.city}
            onChange={handleChange('city')}
            margin="normal"
          />
          <TextField
            id="temp"
            label="temp"
            className={classes.textField}
            value={values.temp}
            onChange={handleChange('temp')}
            margin="normal"
            type="number"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

EditTempDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  entry: PropTypes.object,
  updateEntry: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  entry: getById(state, ownProps.id)
});

const mapDispatchToProps = {
  updateEntry
};

export const name = 'editTempDialog';

const ConnectedWithStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTempDialog);

const WithModal = connectModal({ name })(ConnectedWithStore);

export default WithModal;
