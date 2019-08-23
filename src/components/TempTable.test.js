import React from 'react';
import { render } from '@testing-library/react';
import TempTable from './TempTable';

describe('<TempTable />', () => {
  xit('renders temperature items', () => {
    const props = {
      items: [
        { id: 1, city: 'Moscow', temp: 20 },
        { id: 2, city: 'Yaroslavl', temp: 25 }
      ]
    };
    const { queryAllByTestId } = render(<TempTable {...props} />);

    expect(queryAllByTestId('temp-row').length).toBe(2);
    expect(queryAllByTestId('temp-row')[0]).toHaveTextContent('Moscow');
    expect(queryAllByTestId('temp-row')[1]).toHaveTextContent('Yaroslavl');
  });
});
