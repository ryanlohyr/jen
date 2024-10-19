"use client";

import { FirebaseError, initializeApp } from "firebase/app";
import type { User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { environmentConfig } from "@/environments/config";

const { firebaseConfig } = environmentConfig;
function checkFirebaseConfig(config: Record<string, string | undefined>) {
  const missingKeys = Object.keys(config).filter(
    (key) => config[key] === undefined,
  );
  if (missingKeys.length > 0) {
    console.warn(
      `The following Firebase config keys are missing: ${missingKeys.join(
        ", ",
      )}`,
    );
  }
}

checkFirebaseConfig(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  isSuccess: boolean;
  data: UserCredential["user"] | null;
  errorMessage: string;
}

/**
 * Formats Firebase errors into user-friendly messages.
 *
 * @param error - The FirebaseError object.
 * @returns A user-friendly error message string.
 */

const formatFireBaseError = (error: FirebaseError) => {
  if (error.code === "auth/email-already-in-use") {
    return "Sorry, This email is already in use!";
  }
  if (error.code === "auth/invalid-email") {
    return "Invalid Email";
  }
  if (error.code === "auth/invalid-credential") {
    // Firebase returns this when either email doesn't exist or password is incorrect
    // Maybe since our user base is less tech savvy
    // We can return the exact error for a better UX
    return "Incorrect Email/Password!";
  }
  // We should log this and find out what this is
  return error.code;
};

/**
 * Signs up a new user with email and password.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to an AuthResponse object.
 */

export const signUp = async ({
  email,
  password,
}: AuthCredentials): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { isSuccess: true, data: userCredential.user, errorMessage: "" };
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      // TODO: We should log this error as it is not supposed to happen
      return { isSuccess: false, errorMessage: "Error Signing up", data: null };
    }
    return {
      isSuccess: false,
      errorMessage: formatFireBaseError(error),
      data: null,
    };
  }
};

/**
 * Signs in an existing user with email and password.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to an AuthResponse object.
 */

export const signIn = async ({
  email,
  password,
}: AuthCredentials): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { isSuccess: true, data: userCredential.user, errorMessage: "" };
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      // TODO: We should log this error as it is not supposed to happen
      return { isSuccess: false, errorMessage: "Error Signing up", data: null };
    }
    return {
      isSuccess: false,
      errorMessage: formatFireBaseError(error),
      data: null,
    };
  }
};

/**
 * Signs in a user using Google authentication.
 *
 * @returns A promise that resolves to an AuthResponse object.
 */

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { isSuccess: true, data: result.user, errorMessage: "" };
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      // TODO: We should log this error as it is not supposed to happen
      return { isSuccess: false, errorMessage: "Error Signing in", data: null };
    }
    return {
      isSuccess: false,
      errorMessage: formatFireBaseError(error),
      data: null,
    };
  }
};

/**
 * Signs out the current user.
 *
 * @returns A promise that resolves when the user is signed out.
 */

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Subscribes to authentication state changes.
 *
 * @param callback - A function that receives the current user or null when the authentication state changes.
 * @returns A function to unsubscribe from the authentication state changes.
 */

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
