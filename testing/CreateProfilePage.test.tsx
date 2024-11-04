import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateProfilePage from '../src/pages/CreateProfilePage'; // Adjust path as necessary
import { auth, db } from '../src/firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

jest.mock('../src/firebase-config', () => ({
  auth: {
    currentUser: { uid: '12345' },
    signOut: jest.fn(),
  },
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CreateProfilePage', () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    (auth.currentUser as any) = { uid: '12345' }; // Mock current user
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders profile creation form correctly', () => {
    render(
      <MemoryRouter>
        <CreateProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Create Your Profile')).toBeTruthy();
    expect(screen.getByLabelText(/First Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Last Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Age/i)).toBeTruthy();
  });

  it('displays error if form is incomplete on submit', async () => {
    render(
      <MemoryRouter>
        <CreateProfilePage />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/Start Connecting!/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill out all fields.')).toBeTruthy();
    });
  });

  it('displays error if age is below 18', async () => {
    render(
      <MemoryRouter>
        <CreateProfilePage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '17' } });

    const submitButton = screen.getByText(/Start Connecting!/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('You must be at least 18 years old to create a profile.')).toBeTruthy();
    });
  });

  it('uploads profile picture and displays preview', () => {
    render(
      <MemoryRouter>
        <CreateProfilePage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload Profile Pictures/i);
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const preview = screen.getByAltText('Preview 1');
    expect(preview).toBeTruthy();
  });

  it('navigates to landing page after successful profile creation', async () => {
    render(
      <MemoryRouter>
        <CreateProfilePage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'Hello! This is my bio.' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/Preferred Gender/i), { target: { value: 'Female' } });
    fireEvent.change(screen.getByLabelText(/Minimum Age Preference/i), { target: { value: '18' } });
    fireEvent.change(screen.getByLabelText(/Maximum Age Preference/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Major/i), { target: { value: 'Computer Science' } });

    const submitButton = screen.getByText(/Start Connecting!/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/LandingPage/12345');
    });
  });
});
