import { firebaseAuth } from '@/utils/firebaseConfig';
import AuthContext from '@/contexts/authContext';
import { useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';

export default function useAuth() {
  const { user, loading } = useContext(AuthContext);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log({ res });
    } catch (error) {
      console.log('Login Error: ' + { error });
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.log({ error });
    }
  };

  return { user, loading, signIn, signUp, logOut };
}
