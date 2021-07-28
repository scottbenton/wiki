import { createContext } from "react";
import { User } from "lib/firebase";

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
