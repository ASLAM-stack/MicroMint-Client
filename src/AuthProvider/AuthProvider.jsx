import { createContext, useEffect, useState } from "react";
import auth from "../FireBase/FireBase.confique";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

 
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider() 

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            console.log('current user',currentUser);
            setLoading(false)
        });
        return () => {
            return unsubcribe();
        }  
    },[])

    const signIN = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUser = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo
          })
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const authInfo = {
        user,
        loading,
        signIN,
        createUser,
        logOut,
        updateUser ,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;