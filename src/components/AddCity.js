import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchCurrentWeather } from '../actions/currentWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getIsFetching } from '../reducers/currentWeather';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2)
  },
  input: {
    minWidth: '260px'
  },
  button: {
    marginLeft: theme.spacing(2)
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

function AddCity({ onClickAdd, isFetching }) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleClickAdd(ev) {
    ev.preventDefault();
    if (!name.length) {
      setError("City name can't be empty, please fill the field");
      return;
    }
    onClickAdd(name);
    setName('');
    setError('');
  }

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={handleClickAdd}
    >
      <FormControl error={!!error}>
        <Input
          className={classes.input}
          id="component-error"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-describedby="component-error-text"
          placeholder="Moscow"
          required={true}
        />
        <FormHelperText id="component-error-text">{error}</FormHelperText>
      </FormControl>
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
  onClickAdd: PropTypes.func,
  isFetching: PropTypes.bool
};

const MapStateToProps = state => ({
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  onClickAdd: fetchCurrentWeather
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(AddCity);
