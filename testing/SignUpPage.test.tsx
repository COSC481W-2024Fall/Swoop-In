import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import SignUpPage from '../src/pages/SignUpPage';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-up form correctly', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    screen.getByText(/Sign Up Page/i);
    screen.getByLabelText(/Enter your email/i);
    screen.getByLabelText(/Enter your new password/i);
    screen.getByLabelText(/Re-enter your new password/i);
    screen.getByText(/Proceed to Create Profile/i);
  });

  it('shows error for invalid email format', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Enter your email/i);
    const passwordInput = screen.getByLabelText(/Enter your new password/i);
    const confirmPasswordInput = screen.getByLabelText(/Re-enter your new password/i);
    const submitButton = screen.getByText(/Proceed to Create Profile/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    screen.getByText(/Please use your EMU email address ending with @emich.edu/i);
  });

  it('shows error for passwords that do not match', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Enter your email/i);
    const passwordInput = screen.getByLabelText(/Enter your new password/i);
    const confirmPasswordInput = screen.getByLabelText(/Re-enter your new password/i);
    const submitButton = screen.getByText(/Proceed to Create Profile/i);

    fireEvent.change(emailInput, { target: { value: 'test@emich.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
    fireEvent.click(submitButton);

    screen.getByText(/Passwords do not match/i);
  });

  it('displays success message on successful signup and email verification', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: '12345' },
    });
    (sendEmailVerification as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Enter your email/i);
    const passwordInput = screen.getByLabelText(/Enter your new password/i);
    const confirmPasswordInput = screen.getByLabelText(/Re-enter your new password/i);
    const submitButton = screen.getByText(/Proceed to Create Profile/i);

    fireEvent.change(emailInput, { target: { value: 'test@emich.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText(/Verification email sent! Please check your inbox./i));
  });

  it('displays error message for email already in use', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      code: 'auth/email-already-in-use',
    });

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Enter your email/i);
    const passwordInput = screen.getByLabelText(/Enter your new password/i);
    const confirmPasswordInput = screen.getByLabelText(/Re-enter your new password/i);
    const submitButton = screen.getByText(/Proceed to Create Profile/i);

    fireEvent.change(emailInput, { target: { value: 'test@emich.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText(/This email is already in use. Please use a different email./i));
  });

  it('displays error message for weak password', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      code: 'auth/weak-password',
    });

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Enter your email/i);
    const passwordInput = screen.getByLabelText(/Enter your new password/i);
    const confirmPasswordInput = screen.getByLabelText(/Re-enter your new password/i);
    const submitButton = screen.getByText(/Proceed to Create Profile/i);

    fireEvent.change(emailInput, { target: { value: 'test@emich.edu' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText(/Password is too weak. Please use at least 6 characters./i));
  });
});
