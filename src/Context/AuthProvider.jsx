import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firebase";
//
const googleProvider = new GoogleAuthProvider();

//
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   google sign in
  const createUserWithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider);
  };

  const loginWithEP = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // create user with ep

  const createUserWithEP = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // log out
  const logOut = () => {
    return signOut(auth);
  };
  // update a user
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUserWithGoogle,
    loginWithEP,
    createUserWithEP,
    logOut,
    updateUser,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // console.log(user);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
