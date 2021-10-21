import { createContext } from "react";
import { User } from "firebase/auth";

interface IAuthContext {
  user?: User;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loading: true,
  signInWithGoogle: () => {},
  signOut: () => {},
});
