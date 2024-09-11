import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import React from 'react';
import '@testing-library/jest-dom';
import Component from '../pages/index'; 
import { useRouter } from 'next/router'; // Import useRouter

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component', () => {
  beforeEach(() => {
    useRouter.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Component />
      </Provider>
    );
  });


  test('displays search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}> {/* Wrap Component with Provider */}
        <Component />
      </Provider>
    );
    const searchInput = getByPlaceholderText('Search for hot sauces...');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders hot sauce products', () => {
    const { getByText } = render(
      <Provider store={store}> {/* Wrap Component with Provider */}
        <Component />
      </Provider>
    );
    const product1 = getByText('Spice Up Your Life');
    const product2 = getByText('$9.99');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  test('allows searching for products', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}> {/* Wrap Component with Provider */}
        <Component />
      </Provider>
    );
    const searchInput = getByPlaceholderText('Search for hot sauces...');
    fireEvent.change(searchInput, { target: { value: 'Spice' } });
    expect(getByText('Spice Up Your Life')).toBeInTheDocument();
  });
});
