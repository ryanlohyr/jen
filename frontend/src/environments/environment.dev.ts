import type { Environment } from "./environment.model";

export const devEnvironment: Environment = {
  backendUrl: "https://api.dev.jouvire.com",
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
