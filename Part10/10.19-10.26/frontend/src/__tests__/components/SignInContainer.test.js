/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn(); // Mock function
        
        // Render the component
        const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);
        
        // Find elements, and simulate user input
        fireEvent.changeText(getByTestId('username'), 'kalle');
        fireEvent.changeText(getByTestId('password'), 'password');
        
        // Submit the form
        fireEvent.press(getByTestId('submit'));
        
        // Wait for form submission to complete
        await waitFor(() => {
          // Expect the mock function to be called once
          expect(onSubmit).toHaveBeenCalledTimes(1);

          // Expect it to be called with correct values
          expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
        });
      });
    });
  });