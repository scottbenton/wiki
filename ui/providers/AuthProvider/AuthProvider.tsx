import React from "react";
import { AuthContext } from "./AuthContext";
import { auth, googleAuthProvider } from "lib/auth";
import { updateUser, User as DBUser } from "domain/User";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithPopup, signOut, User } from "@firebase/auth";

export const AuthProvider: React.FC = (props) => {
  const { children } = props;

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((state) => {
      setUser(state ?? undefined);
      setLoading(false);

      if (state) {
        const newUser: DBUser = {
          uid: state.uid,
          email: state.email ?? "",
          displayName: state.displayName ?? state.email ?? "New User",
          avatarUrl: state.photoURL ?? undefined,
        };
        updateUser(state.uid, newUser);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        router.push("/wikis");
      })
      .catch((e) => {
        console.error("Error signing in:", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signOutFn = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error("Error signing out:", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{ loading, user, signInWithGoogle, signOut: signOutFn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
