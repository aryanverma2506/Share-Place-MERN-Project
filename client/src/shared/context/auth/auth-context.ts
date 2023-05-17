import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (uid: string, token: string, expirationDate: Date | undefined) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: string, token: string, expirationDate: Date | undefined) => {},
  logout: () => {},
});
