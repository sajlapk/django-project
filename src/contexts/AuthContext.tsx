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
        // Check if there is a demo user stored in localStorage before clearing
        const localUserStr = localStorage.getItem("user");
        if (localUserStr && localUserStr.includes("demo_")) {
          const appUser = JSON.parse(localUserStr);
          setUser(appUser);
          setUserLoggedIn(true);
        } else {
          setUser(null);
          setUserLoggedIn(false);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  // **SIMPLIFIED LOGIN FUNCTION**
  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for demo ERP logins
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'discipladmin@gmail.com' && password === '!?@Password121') {
      const appUser: AppUser = {
        id: "demo_discipladmin",
        name: "Main Web Admin",
        email: cleanEmail,
        role: "admin"
      };
      setUser(appUser);
      setUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(appUser));
      return true;
    }

    if (password === 'discipl123' && (cleanEmail === 'owner1@discipl.com' || cleanEmail === 'owner2@discipl.com')) {
      const mockNames: { [key: string]: string } = {
        'owner1@discipl.com': 'Owner - Calicut Branch',
        'owner2@discipl.com': 'Owner - Cochin Branch'
      };
      const appUser: AppUser = {
        id: `demo_${cleanEmail.replace('@', '_')}`,
        name: mockNames[cleanEmail],
        email: cleanEmail,
        role: "admin"
      };
      setUser(appUser);
      setUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(appUser));
      return true;
    }

    try {
      // Just perform the sign-in. onAuthStateChanged will handle the state update.
      await doSignInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // // **SIMPLIFIED REGISTER FUNCTION**
  // const register = async (name: string, email: string, password: string): Promise<boolean> => {
  //   // setIsLoading(true);
  //   try {
  //     // Just perform the registration. onAuthStateChanged will handle the rest.
  //     const userCredential = await doCreateUserWithEmailAndPassword(email, password);
  //     await updateProfile(userCredential.user, { displayName: name });
  //     return true;
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     // setIsLoading(false);
  //     return false;
  //   }
  // };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return true;
    } catch (error: any) {
      console.error("Registration failed:", error);

      // You can inspect Firebase error codes here:
      if (error.code === "auth/email-already-in-use") {
        throw new Error("This email is already registered. Please use a different one.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        throw new Error("Password must be at least 6 characters long.");
      } else {
        throw new Error("Failed to create account. Please try again later.");
      }
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear local state first for demo users
      setUser(null);
      setUserLoggedIn(false);
      localStorage.removeItem("user");
      await doSignout();
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