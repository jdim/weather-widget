import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchCurrentWeather } from '../actions/currentWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getIsFetching, getErrorMessage } from '../reducers/currentWeather';
import AutocompleteCity from './AutocompleteCity';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  input: {
    minWidth: '260px'
  },
  button: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  buttonProgress: {
    position: 'absolute',
    top: '42%',
    left: '56%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    position: 'relative'
  }
}));

function AddCity({ addCurWeather, isFetching, errorMessage }) {
  const classes = useStyles();
  const [localError, setLocalError] = useState('');

  const initialAutocompleteCityState = {
    selectedItem: null,
    inputValue: ''
  };
  const [autocompleteCityState, setAutocompleteCityState] = useState(
    initialAutocompleteCityState
  );

  function handleCityStateChange(changes) {
    if (changes.hasOwnProperty('selectedItem')) {
      setAutocompleteCityState({
        inputValue: changes.selectedItem.name,
        selectedItem: { ...changes.selectedItem }
      });
    } else if (changes.hasOwnProperty('inputValue')) {
      setAutocompleteCityState({
        selectedItem: null,
        inputValue: changes.inputValue
      });
    }
  }

  function handleClickAdd(ev) {
    ev.preventDefault();

    const { selectedItem, inputValue } = autocompleteCityState;
    if (inputValue.length === 0) {
      setLocalError("City name can't be empty, please fill the field");
      return;
    }

    const id =
      selectedItem && selectedItem.name === inputValue ? selectedItem.id : null;
    const name = inputValue;

    addCurWeather(id, name);

    setAutocompleteCityState({ ...initialAutocompleteCityState });
    setLocalError('');
  }

  const error = localError || errorMessage;

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={handleClickAdd}
    >
      <AutocompleteCity
        errorMessage={error}
        onStateChange={handleCityStateChange}
        selectedItem={autocompleteCityState.selectedItem}
        inputValue={autocompleteCityState.inputValue}
      />

      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={isFetching}
        >
          Add City
        </Button>
        {isFetching && (
          <CircularProgress className={classes.buttonProgress} size={30} />
        )}
      </div>
    </form>
  );
}

AddCity.propTypes = {
  addCurWeather: PropTypes.func,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string
};

const MapStateToProps = state => ({
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state)
});

const mapDispatchToProps = {
  addCurWeather: fetchCurrentWeather
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(AddCity);
