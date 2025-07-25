import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { GOOGLE_AUTH_CONFIG, getGoogleClientId, isGoogleAuthDevelopmentMode } from '../config/googleAuth';
import { auth } from '../lib/firebase';

// Configure WebBrowser for authentication
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        setUser(user);
        setLoading(false);
      }
    }, (error) => {
      console.error('Auth state change error:', error);
      if (mounted) {
        setLoading(false);
      }
    });

    // Shorter timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted) {
        console.log('Auth timeout reached, setting loading to false');
        setLoading(false);
      }
    }, 3000); // 3 second timeout

    return () => {
      mounted = false;
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (isGoogleAuthDevelopmentMode()) {
        // Development mode - simulate Google sign-in with Firebase anonymous user
        console.log('Running in development mode - simulating Google OAuth with Firebase');
        
        // For development, create a temporary user with mock Google data
        // In a real implementation, you'd use Firebase's Google sign-in
        throw new Error('Google sign-in in development mode. Set up Firebase Google authentication for production.');
      } else {
        // Production mode - implement real Firebase Google authentication
        console.log('Running in production mode - using real Firebase Google OAuth');
        
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
          // In a real implementation, you would:
          // 1. Exchange the code for a Google access token
          // 2. Use that token to create a Firebase credential
          // 3. Sign in with that credential
          
          // const credential = GoogleAuthProvider.credential(googleIdToken);
          // await signInWithCredential(auth, credential);
          
          throw new Error('Google sign-in requires backend token exchange. See GOOGLE_AUTH_SETUP.md for implementation.');
        } else {
          throw new Error('Google sign-in was cancelled or failed');
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
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
