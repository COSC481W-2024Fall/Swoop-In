import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('App Routing', () => {
  it('renders Start component on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Sign in to your account/i);
  });

  it('renders SignUpPage component on /SignUpPage route', () => {
    render(
      <MemoryRouter initialEntries={['/SignUpPage']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Sign Up/i);
  });

  it('renders CreateProfilePage component on /CreateProfilePage/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/CreateProfilePage/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Create Profile/i);
  });

  it('renders LandingPage component on /LandingPage/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/LandingPage/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Welcome to Landing Page/i);
  });

  it('renders MatchPage component on /match/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/match/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Your Matches/i);
  });

  it('renders ChatPage component on /chat/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/chat/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Your Chats/i);
  });

  it('renders ProfilePage component on /profile/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Your Profile/i);
  });

  it('renders SettingsPage component on /settings/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/settings/1']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Settings/i);
  });

  it('renders ChattingPage component on /chat/:chatId/:chatId2 route', () => {
    render(
      <MemoryRouter initialEntries={['/chat/1/2']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText(/Chat with User/i);
  });
});

