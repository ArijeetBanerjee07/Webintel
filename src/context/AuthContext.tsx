"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AuthMode = "signin" | "signup";

interface AuthContextType {
  isOpen: boolean;
  mode: AuthMode;
  openAuth: (initialMode?: AuthMode) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");

  const openAuth = (initialMode: AuthMode = "signup") => {
    setMode(initialMode);
    setIsOpen(true);
  };

  const closeAuth = () => {
    setIsOpen(false);
  };

  return (
    <AuthContext.Provider value={{ isOpen, mode, openAuth, closeAuth, setMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

