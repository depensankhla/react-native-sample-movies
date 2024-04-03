import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import LoginPage from '../LoginPage';
import { store } from '../store/Store';

describe('Login Component', () => {
  it('allows user to input email and password, and trigger login button', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(loginButton.props.disabled).toBe(true);
    fireEvent.press(loginButton);
  });
});
