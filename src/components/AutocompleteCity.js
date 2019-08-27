import React from 'react';
import Autocomplete from './Autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCities } from '../actions/cities';
import { getLastFetchAt, getIsFetching, getItems } from '../reducers/cities';

function AutocompleteCity(props) {
  const { fetchCities, lastFetchSuggestionsAt } = props;

  const handleClick = () => !lastFetchSuggestionsAt && fetchCities();

  return (
    <Autocomplete
      {...props}
      itemKeyProp="id"
      itemValueProp="name"
      helperText="Enter a city name to get current weather"
      label="City"
      onFocusInput={handleClick}
    />
  );
}

AutocompleteCity.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      city: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  fetchCities: PropTypes.func,
  lastFetchSuggestionsAt: PropTypes.number,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  lastFetchSuggestionsAt: getLastFetchAt(state),
  loading: getIsFetching(state),
  items: getItems(state)
});

const mapDispatchToProps = {
  fetchCities
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteCity);
