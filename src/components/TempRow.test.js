import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import '@testing-library/jest-dom/extend-expect';

import TempRow from './TempRow.js';

describe('<TempRow />', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 0,
      city: 'Moscow',
      temp: 21,
      status: 'ACTIVE',
      onClickUp: jest.fn(x => x),
      onClickDown: jest.fn(x => x),
      onClickDelete: jest.fn(x => x),
      onClickRestore: jest.fn(x => x)
    };
  });

  afterEach(() => {
    props = null;
  });

  const inTable = ui => {
    return (
      <Table>
        <TableBody>{ui}</TableBody>
      </Table>
    );
  };

  it('displays city, temperature and not throw', () => {
    props.city = 'Yaroslavl';
    props.temp = 19;

    const { container } = render(inTable(<TempRow {...props} />));

    expect(container).toHaveTextContent('Yaroslavl');
    expect(container).toHaveTextContent(19);
  });

  it('shows Delete/Restore buttons depending from status', () => {
    props.status = 'ACTIVE';

    const { queryByText, rerender } = render(inTable(<TempRow {...props} />));

    expect(queryByText(/delete/i)).toBeInTheDocument();
    expect(queryByText(/restore/i)).not.toBeInTheDocument();

    props.status = 'DELETED';

    rerender(inTable(<TempRow {...props} />));

    expect(queryByText(/delete/i)).not.toBeInTheDocument();
    expect(queryByText(/restore/i)).toBeInTheDocument();
  });

  it('calls Move Up, Move Down, Delete and Restore handlers passed in as props', () => {
    const { getByText, rerender } = render(inTable(<TempRow {...props} />));

    fireEvent.click(getByText(/move up/i));
    expect(props.onClickUp).toHaveBeenCalled();

    fireEvent.click(getByText(/move down/i));
    expect(props.onClickDown).toHaveBeenCalled();

    fireEvent.click(getByText(/delete/i));
    expect(props.onClickDelete).toHaveBeenCalled();

    rerender(inTable(<TempRow {...props} status="DELETED" />));
    fireEvent.click(getByText(/restore/i));
    expect(props.onClickRestore).toHaveBeenCalled();
  });
});
