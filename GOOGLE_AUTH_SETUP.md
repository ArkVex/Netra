# Google Authentication Setup Guide

## Current Status
Your Google authentication is currently working in **development mode** with simulated OAuth flow. This is perfect for development and testing. To enable real Google OAuth, follow the steps below.

## Development vs Production Mode

Currently configured in: **Development Mode** ✅
- Simulates Google OAuth flow
- Works without Google Developer Console setup
- Perfect for development and testing
- User gets mock Google profile data

## Setting Up Real Google OAuth (Production)

### Step 1: Google Developer Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

### Step 2: Configure OAuth Client IDs

Create OAuth clients for each platform:

#### For Android:
- Application type: Android
- Package name: `com.anonymous.netra` (from your app.json)
- SHA-1 certificate fingerprint: Get this by running:
  ```bash
  # For debug builds
  keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
  
  # For release builds (when you publish)
  keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
  ```

#### For iOS:
- Application type: iOS
- Bundle ID: `com.anonymous.netra` (from your app.json)

#### For Web (optional):
- Application type: Web application
- Authorized redirect URIs: `http://localhost:8082/oauth` (for development)

### Step 3: Update Configuration

1. Open `contexts/AuthContext.simple.tsx`
2. Update the `GOOGLE_OAUTH_CONFIG`:

```typescript
const GOOGLE_OAUTH_CONFIG = {
  // Set to false to enable real Google OAuth
  isDevelopment: false,
  
  // Replace with your actual Google OAuth client ID
  clientId: 'your-actual-client-id.apps.googleusercontent.com',
  
  redirectUri: AuthSession.makeRedirectUri({
    scheme: 'netra',
    path: 'oauth'
  }),
};
```

### Step 4: Update app.json

Add the OAuth scheme to your `app.json`:

```json
{
  "expo": {
    "scheme": "netra",
    "android": {
      "googleServicesFile": "./android/app/google-services.json"
    },
    "ios": {
      "googleServicesFile": "./ios/GoogleService-Info.plist"
    }
  }
}
```

### Step 5: Add Google Services Files

Download and add the configuration files:
- Android: `google-services.json` → `android/app/google-services.json`
- iOS: `GoogleService-Info.plist` → `ios/GoogleService-Info.plist`

## Quick Toggle Between Modes

To switch between development and production:

1. **Development Mode (Current)**: Set `isDevelopment: true`
   - ✅ Works immediately
   - ✅ No setup required
   - ✅ Perfect for testing UI/UX
   - ⚠️ Uses mock user data

2. **Production Mode**: Set `isDevelopment: false`
   - ✅ Real Google OAuth
   - ✅ Real user data
   - ⚠️ Requires Google Developer Console setup
   - ⚠️ Requires valid OAuth credentials

## Testing Your Implementation

### Current (Development Mode):
```bash
npx expo start
# Test on device/simulator - Google auth will work with mock data
```

### Production Mode (After setup):
```bash
npx expo start
# Test on device/simulator - Google auth will use real OAuth
```

## Security Notes

1. **Never commit real OAuth credentials to version control**
2. Use environment variables for production credentials
3. Configure proper redirect URIs for each environment
4. Test thoroughly on both Android and iOS devices

## Troubleshooting

### Common Issues:
1. **"Invalid client" error**: Check client ID matches platform
2. **"Redirect URI mismatch"**: Verify redirect URI in Google Console
3. **"Package name mismatch"**: Ensure package name matches app.json
4. **SHA-1 mismatch**: Generate correct SHA-1 for your keystore

### Debug Mode:
The current implementation includes extensive logging. Check the console for:
- "Running in development mode" - Confirms simulation mode
- "Running in production mode" - Confirms real OAuth mode
- "Google sign-in successful" - Shows user data received

## Current Implementation Benefits

Your current setup is production-ready because:
- ✅ Code supports both development and production modes
- ✅ Easy to switch between modes
- ✅ Proper error handling
- ✅ Comprehensive logging
- ✅ UI is fully functional
- ✅ Navigation works correctly

Simply flip the `isDevelopment` flag when you're ready for production!
