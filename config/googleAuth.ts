// Google OAuth Configuration
// This file centralizes all Google authentication settings

export const GOOGLE_AUTH_CONFIG = {
  // Development Settings
  // Set to false when you have real Google OAuth credentials
  isDevelopment: true,
  
  // Production Settings
  // Replace these with your actual Google OAuth credentials from Google Cloud Console
  production: {
    clientId: {
      android: 'your-android-client-id.apps.googleusercontent.com',
      ios: 'your-ios-client-id.apps.googleusercontent.com',
      web: 'your-web-client-id.apps.googleusercontent.com',
    },
    
    // OAuth Scopes - what information you want from Google
    scopes: ['openid', 'profile', 'email'],
    
    // Additional configuration
    additionalParameters: {
      include_granted_scopes: 'true',
    },
  },
  
  // Development Settings
  // Mock user data for development/testing
  development: {
    mockUser: {
      email: 'testuser@gmail.com',
      displayName: 'Test User (Google)',
      photoURL: 'https://via.placeholder.com/150?text=G',
      provider: 'google',
      uid: 'mock-google-uid-123',
    },
    
    // Simulate network delay (milliseconds)
    simulatedDelay: 2000,
  },
};

// Helper function to get the appropriate client ID for the current platform
export const getGoogleClientId = (): string => {
  if (GOOGLE_AUTH_CONFIG.isDevelopment) {
    return 'development-mock-client-id';
  }
  
  // In a real app, you'd detect the platform and return the appropriate client ID
  // For now, return Android client ID as default
  return GOOGLE_AUTH_CONFIG.production.clientId.android;
};

// Helper function to check if we're in development mode
export const isGoogleAuthDevelopmentMode = (): boolean => {
  return GOOGLE_AUTH_CONFIG.isDevelopment;
};
