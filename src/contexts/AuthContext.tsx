import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import { type User, type LoginForm, type SignupForm } from '../types/user';
import {
  checkAuthStatus,
  login as loginAPI,
  signup as signupAPI,
  logout as logoutAPI,
} from '../api/userApi';

/////////////////////////////////////////////////////////////
// 1. Define the context's value shape
/////////////////////////////////////////////////////////////

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginForm) => Promise<void>;
  signup: (details: SignupForm) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

/////////////////////////////////////////////////////////////
// 2. Create the context
/////////////////////////////////////////////////////////////

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/////////////////////////////////////////////////////////////
// 3. Provider component - Now the default export
/////////////////////////////////////////////////////////////

// By making AuthProvider the default export, we signal to Fast Refresh
// that this is the main component of the file.
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // start as loading on app init
  const [error, setError] = useState<string | null>(null);

  /////////////////////////////////////////////////////////////
  // Login
  /////////////////////////////////////////////////////////////

  const login = async (credentials: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      await loginAPI(credentials);
      const currentUser = await checkAuthStatus();
      setUser(currentUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      // re-throw the error so form can catch it if needed
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////
  // Signup
  /////////////////////////////////////////////////////////////

  const signup = async (details: SignupForm) => {
    setLoading(true);
    setError(null);
    try {
      await signupAPI(details);
      const currentUser = await checkAuthStatus();
      setUser(currentUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      // re-throw the error so form can catch it
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////
  // Logout
  /////////////////////////////////////////////////////////////

  const logout = async () => {
    try {
      await logoutAPI(); // Call the backend to clear the cookie
    } catch (err) {
      console.error(
        'Logout API call failed, proceeding with client-side logout',
        err,
      );
    } finally {
      // Always clear the local state
      setUser(null);
      setError(null);
    }
  };

  /////////////////////////////////////////////////////////////
  // Refresh user (e.g., on initial load)
  /////////////////////////////////////////////////////////////

  const refreshUser = async () => {
    // No need to set loading here, as the initial state is already true
    try {
      const currentUser = await checkAuthStatus();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////
  // On mount, check auth status
  /////////////////////////////////////////////////////////////

  useEffect(() => {
    refreshUser();
  }, []);

  /////////////////////////////////////////////////////////////
  // Provide the full context value
  /////////////////////////////////////////////////////////////

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/////////////////////////////////////////////////////////////
// 4. useAuth Hook — for consuming the context
/////////////////////////////////////////////////////////////

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
