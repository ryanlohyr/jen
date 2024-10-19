// Doesn't need to be private.
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  [key: string]: string | undefined; // Add index signature
}

export interface Environment {
  backendUrl: string;
  firebaseConfig: FirebaseConfig;
  vendorSignUpUrl: string;
  googleAnaylticsTrackingId: string;
}
