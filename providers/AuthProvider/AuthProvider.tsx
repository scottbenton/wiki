import React from "react";
import { AuthContext } from "./AuthContext";
import { auth, googleAuthProvider, User, firestore } from "lib/firebase";
import { User as DBUser, UserCollectionName } from "domain/User";
import { useState } from "react";
import { useEffect } from "react";

export const AuthProvider: React.FC = (props) => {
  const { children } = props;

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((state) => {
      setUser(state ?? undefined);
      setLoading(false);

      if (state) {
        const newUser: DBUser = {
          uid: state.uid,
          email: state.email ?? "",
          displayName: state.displayName ?? state.email ?? "New User",
          avatarUrl: state.photoURL ?? undefined,
        };
        firestore()
          .collection(UserCollectionName)
          .doc(state.uid)
          .get()
          .then((doc) => {
            if (!doc.data()) {
              firestore()
                .collection(UserCollectionName)
                .doc(state.uid)
                .set(newUser);
            }
          });
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = googleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .catch((e) => {
        console.error("Error signing in:", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signOut = () => {
    setLoading(true);
    auth()
      .signOut()
      .catch((e) => {
        console.error("Error signing out:", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider value={{ loading, user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
