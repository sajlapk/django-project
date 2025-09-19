// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignout } from "../firebase/auth";

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  userLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // The onAuthStateChanged listener is the single source of truth for the user's state.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Look up the user's role in Firestore.
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        let userRole: "user" | "admin" = "user"; // Default to "user"
        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
          userRole = "admin"; // Assign "admin" if the role exists in Firestore
        }
        
        // **FIXED HERE**: Use the `userRole` variable.
        const appUser: AppUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "No Name",
          email: firebaseUser.email || "",
          role: userRole,
        };

        setUser(appUser);
        setUserLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(appUser));
      } else {
        setUser(null);
        setUserLoggedIn(false);
        localStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  // **SIMPLIFIED LOGIN FUNCTION**
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Just perform the sign-in. onAuthStateChanged will handle the state update.
      await doSignInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  // **SIMPLIFIED REGISTER FUNCTION**
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Just perform the registration. onAuthStateChanged will handle the rest.
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await doSignout();
      // onAuthStateChanged will handle clearing user state.
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    userLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};