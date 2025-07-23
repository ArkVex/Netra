import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GOOGLE_AUTH_CONFIG, getGoogleClientId, isGoogleAuthDevelopmentMode } from '../config/googleAuth';

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
      if (isGoogleAuthDevelopmentMode()) {
        // Development mode - simulate Google sign-in
        console.log('Running in development mode - simulating Google OAuth');
        setTimeout(() => {
          const googleUser = GOOGLE_AUTH_CONFIG.development.mockUser;
          console.log('Google sign-in successful:', googleUser); // Debug log
          setUser(googleUser);
          setLoading(false);
        }, GOOGLE_AUTH_CONFIG.development.simulatedDelay);
      } else {
        // Production mode - use real Google OAuth
        console.log('Running in production mode - using real Google OAuth');
        
        const redirectUri = AuthSession.makeRedirectUri({
          scheme: 'netra',
          path: 'oauth'
        });
        
        const request = new AuthSession.AuthRequest({
          clientId: getGoogleClientId(),
          scopes: GOOGLE_AUTH_CONFIG.production.scopes,
          redirectUri: redirectUri,
          responseType: AuthSession.ResponseType.Code,
          extraParams: GOOGLE_AUTH_CONFIG.production.additionalParameters,
        });

        const result = await request.promptAsync({
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        });

        if (result.type === 'success') {
          // Exchange the authorization code for an access token
          // This would require a backend service to handle the token exchange
          console.log('Google OAuth successful:', result);
          
          // For now, create a mock user from the OAuth result
          const googleUser = {
            email: 'user@gmail.com', // In real implementation, get from Google API
            displayName: 'Google User', // In real implementation, get from Google API
            photoURL: 'https://via.placeholder.com/150', // In real implementation, get from Google API
            provider: 'google'
          };
          
          setUser(googleUser);
          setLoading(false);
        } else {
          throw new Error('Google sign-in was cancelled or failed');
        }
      }
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
