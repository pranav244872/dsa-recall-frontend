import { type SignupForm, type LoginForm, type User } from '../types/user';

//////////////////////////////////////////////////////////////////////////
// Sign Up
//////////////////////////////////////////////////////////////////////////

export async function signup(details: SignupForm): Promise<void> {
  const response = await fetch(`/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Signup Failed');
  }
}

//////////////////////////////////////////////////////////////////////////
// Login
//////////////////////////////////////////////////////////////////////////

export async function login(credentials: LoginForm): Promise<void> {
  const response = await fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Login Failed');
  }
}

//////////////////////////////////////////////////////////////////////////
// Auth Test
//////////////////////////////////////////////////////////////////////////

export async function checkAuthStatus(): Promise<User> {
  const response = await fetch(`/api/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('User not authenticated');
  }

  return response.json();
}
