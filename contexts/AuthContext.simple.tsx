import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Configure WebBrowser for authentication
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading = true

  // Simulate checking for existing session
  useEffect(() => {
    const checkAuthState = async () => {
      // Simulate checking for stored user session
      setTimeout(() => {
        // Start with no user - require login
        setUser(null);
        setLoading(false);
      }, 1000); // 1 second delay to show loading
    };

    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setUser({ email, displayName: 'Test User' });
      setLoading(false);
    }, 1500);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    console.log('signUp called with:', { email, displayName }); // Debug log
    setLoading(true);
    // Simulate signup API call
    setTimeout(() => {
      console.log('Setting user after signup'); // Debug log
      setUser({ email, displayName });
      setLoading(false);
    }, 1500);
  };

  const signInWithGoogle = async () => {
    console.log('Google Sign-In initiated'); // Debug log
    setLoading(true);
    
    try {
      // For development, simulate Google sign-in
      // In production, you would integrate with Google OAuth
      setTimeout(() => {
        const googleUser = {
          email: 'user@gmail.com',
          displayName: 'Google User',
          photoURL: 'https://via.placeholder.com/150',
          provider: 'google'
        };
        console.log('Google sign-in successful:', googleUser); // Debug log
        setUser(googleUser);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Google sign-in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    // Simulate logout API call
    setTimeout(() => {
      setUser(null);
      setLoading(false);
    }, 500);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
