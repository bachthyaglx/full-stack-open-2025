// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      // Fill the form fields
      fireEvent.changeText(screen.getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'password');

      // Press the submit button
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        // Check if onSubmit was called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Check if onSubmit was called with correct values
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});