# Firebase Setup Guide for Google Login

Follow these steps to set up Firebase for Google authentication:

## 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name and follow setup steps

## 2. Enable Google Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Google" sign-in provider
3. Save your changes

## 3. Add a Web App to Your Project
1. In Firebase Console, go to Project Settings
2. Click "Add app" → Select "Web"
3. Register app (you can check "Also set up Firebase Hosting")
4. Copy the Firebase config object

## 4. Update Firebase Config
Open `frontend/src/lib/firebase.js` and replace the dummy config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 5. Add Authorized Domains (if needed)
1. In Firebase Console → Authentication → Settings → Authorized domains
2. Add `localhost` (for development) and your production domain

## Done!
Now you should be able to use Google login/signup in your app!
