import type { Environment } from "./environment.model";

export const localEnvironment: Environment = {
  backendUrl: "http://localhost:8080",
  firebaseConfig: {
    apiKey: "AIzaSyAn8URyiNOyoDZZJPLTL5M-AzeL78taljc",
    authDomain: "staging-jouvire.firebaseapp.com",
    projectId: "staging-jouvire",
    storageBucket: "staging-jouvire.appspot.com",
    messagingSenderId: "180113519793",
    appId: "1:180113519793:web:916ce58e0745036d625e90",
    measurementId: "G-65Q3Y75T2Q",
  },
  vendorSignUpUrl: "https://forms.gle/BNLgvVsZDg82t8AX6",
  googleAnaylticsTrackingId: "YTX7SE8TE6",
};
