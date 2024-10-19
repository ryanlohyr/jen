import type { Environment } from "./environment.model";

export const prodEnvironment: Environment = {
  backendUrl: "https://api.jouvire.com",
  firebaseConfig: {
    apiKey: "AIzaSyC7QiEKWwHXo4CTMGcIzuM7PB2GyiY0vFY",
    authDomain: "jouvire-94a1b.firebaseapp.com",
    projectId: "jouvire-94a1b",
    storageBucket: "jouvire-94a1b.appspot.com",
    messagingSenderId: "128162192981",
    appId: "1:128162192981:web:27a0765cffc5c6e8e53edc",
    measurementId: "G-0DJBVRY0QE",
  },
  vendorSignUpUrl: "https://forms.gle/BNLgvVsZDg82t8AX6",
  googleAnaylticsTrackingId: "YTX7SE8TE6",
};
