import { useState } from 'react';
import { type User, type LoginForm } from '../types/user';
import { checkAuthStatus, login } from '../api/userApi';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function loginCall(credentials: LoginForm) {
        setLoading(true);
        setError(null);
        try {
            await login(credentials);
            const currentUser: User = await checkAuthStatus();
            setUser(currentUser);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occured');
            }
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, error, login: loginCall };
}
