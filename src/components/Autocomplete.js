import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  textField: {
    width: 260,
    margin: 0
  },
  menu: {
    width: 260,
    marginTop: '3px'
  },
  loading: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    marginRight: theme.spacing(1)
  }
}));

function Autocomplete(props) {
  const {
    items,
    errorMessage,
    label,
    helperText,
    itemKeyProp,
    itemValueProp,
    onFocusInput,
    loading,
    inputValue,
    ...other
  } = props;

  const classes = useStyles();
  const textFieldRef = useRef(null);

  const error = !!errorMessage;

  function filterItems(items, value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const maxResults = 5;
    let count = 0;

    return inputLength === 0
      ? []
      : items.filter(item => {
          const keep =
            count < maxResults &&
            item[itemValueProp].slice(0, inputLength).toLowerCase() ===
              inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  /**
 * it supposes what component accepts whatever value
   the user types as the selectedItem in addition
 * @param {*} item 
 */
  function itemToString(item) {
    return item ? item[itemValueProp] : inputValue;
  }

  return (
    <Downshift {...other} itemToString={itemToString}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        selectHighlightedItem
      }) => (
        <div>
          <TextField
            error={error}
            inputRef={textFieldRef}
            InputLabelProps={getLabelProps()}
            inputProps={getInputProps()}
            id="standard-error"
            label={label}
            helperText={errorMessage || helperText}
            className={classes.textField}
            margin="normal"
            onFocus={onFocusInput}
          />

          <Popper
            className={classes.menu}
            open={isOpen}
            anchorEl={textFieldRef.current}
            transition
            placement="bottom-start"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={selectHighlightedItem}>
                    {loading ? (
                      <Box
                        className={classes.loading}
                        color="text.secondary"
                        p={1}
                      >
                        <CircularProgress
                          size={20}
                          className={classes.progress}
                        />
                        Loading...
                      </Box>
                    ) : (
                      <MenuList
                        {...getMenuProps({}, { suppressRefError: true })}
                      >
                        {filterItems(items, inputValue).map((item, index) => (
                          <MenuItem
                            {...getItemProps({
                              key: item[itemKeyProp],
                              index,
                              item,
                              style: {
                                fontWeight: selectedItem === item ? 500 : 400
                              }
                            })}
                            selected={highlightedIndex === index}
                          >
                            {item[itemValueProp]}
                          </MenuItem>
                        ))}
                      </MenuList>
                    )}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )}
    </Downshift>
  );
}

Autocomplete.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  itemKeyProp: PropTypes.string,
  itemValueProp: PropTypes.string,
  onFocusInput: PropTypes.func,
  loading: PropTypes.bool
};

Autocomplete.defaultProps = {
  itemKeyProp: 'value',
  itemValueProp: 'value'
};

export default Autocomplete;
