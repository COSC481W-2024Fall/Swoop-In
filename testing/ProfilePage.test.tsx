import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { auth, db } from '../src/firebase-config';
import ProfilePage from '../src/pages/ProfilePage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

jest.mock('../src/firebase-config', () => ({
  auth: {
    currentUser: { uid: '12345' },
  },
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders profile page correctly with fetched data', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        bio: 'Hello, I am John!',
        gender: 'Male',
        preferredGender: 'Female',
        minAge: 20,
        maxAge: 30,
        major: 'Computer Science',
        images: [],
      }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Edit Profile/i));
    screen.getByDisplayValue(/John/i);
    screen.getByDisplayValue(/Doe/i);
    screen.getByDisplayValue(/25/i);
    screen.getByText(/Hello, I am John!/i);
  });

  it('handles input changes and save changes', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        bio: 'Hello, I am John!',
        gender: 'Male',
        preferredGender: 'Female',
        minAge: 20,
        maxAge: 30,
        major: 'Computer Science',
        images: [],
      }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Edit Profile/i));

    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    const bioInput = screen.getByLabelText(/Bio/i);
    fireEvent.change(bioInput, { target: { value: 'Updated Bio' } });

    const saveButton = screen.getByText(/Save Changes/i);
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Updated Bio',
      }))
    );
  });

  it('displays error message when profile update fails', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        bio: 'Hello, I am John!',
        gender: 'Male',
        preferredGender: 'Female',
        minAge: 20,
        maxAge: 30,
        major: 'Computer Science',
        images: [],
      }),
    });

    (updateDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to save changes'));

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Edit Profile/i));

    const bioInput = screen.getByLabelText(/Bio/i);
    fireEvent.change(bioInput, { target: { value: 'Updated Bio' } });

    const saveButton = screen.getByText(/Save Changes/i);
    fireEvent.click(saveButton);

    await waitFor(() => screen.getByText(/Failed to save changes/i));
  });

  it('resets profile data on cancel', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        bio: 'Hello, I am John!',
        gender: 'Male',
        preferredGender: 'Female',
        minAge: 20,
        maxAge: 30,
        major: 'Computer Science',
        images: [],
      }),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Edit Profile/i));

    const bioInput = screen.getByLabelText(/Bio/i);
    fireEvent.change(bioInput, { target: { value: 'Updated Bio' } });

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(bioInput.getAttribute('value')).toBe('Hello, I am John!');
});
});
