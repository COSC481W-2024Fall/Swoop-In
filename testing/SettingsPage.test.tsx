import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from '../src/pages/SettingsPage'; // Ensure this path is correct
import { auth, db } from '../src/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


jest.mock('../src/firebase-config', () => ({
  auth: {
    currentUser: { uid: '12345' },
    signOut: jest.fn(),
  },
  db: {
    collection: jest.fn(),
  },
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        settings: {
          activeStatus: true,
          notification: true,
          lightMode: false,
        },
        email: 'test@emich.edu',
      }),
    });
  });

  it('toggles the active status', async () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Settings/i));

    const toggleButton = screen.getByRole('button', { name: /Show Active Status/i });
    expect(toggleButton).toBeTruthy();

    fireEvent.click(toggleButton);

    expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
      'settings.activeStatus': false,
    });
  });
});
