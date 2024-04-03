import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import HomePage from '../HomePage';
import { store } from '../store/Store';

// Mock Fetch Method
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    }),
  })
);

describe('Home Page Component', () => {

  it('renders the component', () => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>);
  });

  it('fetches movies on component mount', async () => {
    const mockData = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    };

    const { findByText } = render(<Provider store={store}>
      <HomePage />
    </Provider>);

    const movie1 = await findByText('Movie 1');
    const movie2 = await findByText('Movie 2');

    expect(movie1).toBeDefined();
    expect(movie2).toBeDefined();
  });
});
