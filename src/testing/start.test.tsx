import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Start from '../start';
import { auth } from '../firebase-config';

// Mock the Firebase functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  auth: {},
}));

describe('Start Component', () => {
  it('renders the login form correctly', () => {
    render(
      <Router>
        <Start />
      </Router>
    );

    expect(screen.getByText(/sign in to your account/i)).toBeTruthy();
    expect(screen.getByLabelText(/email address/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeTruthy();
  });

  it('shows an error for invalid email format', async () => {
    render(
      <Router>
        <Start />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    // Check for validation message by casting to HTMLInputElement
    expect((emailInput as HTMLInputElement).validationMessage).toBe(
      'Invalid email address, must be EMU'
    );
  });

  it('displays success message and redirects on successful login', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '12345' },
    });

    render(
      <Router>
        <Start />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@emich.edu' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/login successful! redirecting.../i)).toBeTruthy()
    );
  });

  it('displays error message for incorrect password', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      code: 'auth/wrong-password',
    });

    render(
      <Router>
        <Start />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@emich.edu' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/incorrect password. please try again or reset your password./i)).toBeTruthy()
    );
  });

  it('displays error message for too many login attempts', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      code: 'auth/too-many-requests',
    });

    render(
      <Router>
        <Start />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@emich.edu' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/too many failed login attempts. please try again later./i)).toBeTruthy()
    );
  });

  it('displays error message for disabled account', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      code: 'auth/user-disabled',
    });

    render(
      <Router>
        <Start />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'disabled@emich.edu' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/this account has been disabled. please contact support./i)).toBeTruthy()
    );
  });
});
