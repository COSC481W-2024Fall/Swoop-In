import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatchPage from '../src/pages/MatchPage';
import { auth, db } from '../src/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

jest.mock('../src/firebase-config', () => ({
  auth: {
    currentUser: { uid: '12345' },
    signOut: jest.fn(),
  },
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('MatchPage', () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    (getDoc as jest.Mock).mockImplementation((ref) => {
      if (ref.path.includes('Users')) {
        return Promise.resolve({
          exists: () => true,
          data: () => ({
            swipes: {
              matches: ['match1', 'match2'],
              right: [],
            },
            firstName: 'John',
            lastName: 'Doe',
            images: ['/default-profile.png'],
            bio: 'Test bio',
          }),
        });
      }
      return Promise.resolve({
        exists: () => false,
      });
    });
  });

  it('renders and displays matches', async () => {
    render(
      <MemoryRouter>
        <MatchPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Your Matches/i));
    const matchCards = screen.getAllByText(/Message/i);
    expect(matchCards.length).toBeGreaterThan(0);
  });

  it('redirects if user is not logged in', async () => {
    (auth.currentUser as any) = null;

    render(
      <MemoryRouter>
        <MatchPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('allows unmatching a user', async () => {
    render(
      <MemoryRouter>
        <MatchPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Your Matches/i));

    const unmatchButton = screen.getAllByText(/Unmatch/i)[0];
    fireEvent.click(unmatchButton);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
      expect(screen.queryByText(/Test bio/i)).toBeNull();
    });
  });

  it('navigates to chat page when message button is clicked', async () => {
    render(
      <MemoryRouter>
        <MatchPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Your Matches/i));

    const messageButton = screen.getAllByText(/Message/i)[0];
    fireEvent.click(messageButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/chat/match1`);
  });
});
