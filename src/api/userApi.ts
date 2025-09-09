import { type SignupForm, type LoginForm, type User } from '../types/user';

// A helper function to parse error responses from the API
async function handleApiError(response: Response): Promise<Error> {
  try {
    const errorData = await response.json();
    // Use the message from the { "error": "message" } object
    return new Error(errorData.error || 'An unexpected error occurred.');
  } catch (e) {
    // If the response isn't valid JSON, use the raw text
    const errorText = await response.text();
    return new Error(errorText || 'An unknown error occurred.');
  }
}

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
    throw await handleApiError(response);
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
    throw await handleApiError(response);
  }
}

//////////////////////////////////////////////////////////////////////////
// Logout
//////////////////////////////////////////////////////////////////////////

export async function logout(): Promise<void> {
  const response = await fetch(`/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw await handleApiError(response);
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
    // For this specific case, a simple error is fine.
    throw new Error('User not authenticated');
  }

  return response.json();
}
