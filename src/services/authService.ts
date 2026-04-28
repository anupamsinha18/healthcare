import { 
  signInWithEmailAndPassword as firebaseSignIn, 
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const googleProvider = new GoogleAuthProvider();

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await firebaseSignIn(auth, email, password);
  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      displayName: userCredential.user.displayName || 'Healthcare User',
      role: 'admin' as const
    }
  };
};

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await firebaseSignUp(auth, email, password);
  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      displayName: userCredential.user.displayName || 'Healthcare User',
      role: 'admin' as const
    }
  };
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email || '',
      displayName: userCredential.user.displayName || 'Healthcare User',
      role: 'admin' as const
    }
  };
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
