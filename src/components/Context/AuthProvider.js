import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Firebase/Firebase";

const googleProvider = new GoogleAuthProvider();
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        if(user){
            const {displayName, photoURL, email} = user;
            const loggedInUser = {
            name: displayName,
            photoUrl : photoURL,
            email: email
        }
        setCurrentUser(loggedInUser);
        }else{
            setCurrentUser({})
        }
    });
    setIsLoading(false);
    return unsubscribe;
  }, [auth]);

  const signInwithGoogle = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then(result => {
        // console.log(result.user);
        const {displayName, photoURL, email} = result.user;
        const loggedInUser = {
            name: displayName,
            photoUrl : photoURL,
            email: email
        }
        setCurrentUser(loggedInUser);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const logOut = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        setCurrentUser("");
        navigate("/");
        toast.info("You are successfully Logout", {
          theme: "colored",
        });
      })
      .finally(() => setIsLoading(false));
  };
  const value = {
    currentUser,
    signInwithGoogle,
    isLoading,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
