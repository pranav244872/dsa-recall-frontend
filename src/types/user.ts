// Represents the safe user data returned from the backend.
export interface User {
    id: number;
    name: string;
    email: string;
}

// The shape of the data needed for the login form.
export interface LoginForm {
    email: string;
    password: string;
}

// The shape of the data needed for the signup form.
export interface SignupForm {
    name: string;
    email: string;
    password: string;
}
