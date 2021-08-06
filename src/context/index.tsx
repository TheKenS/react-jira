import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 相当于<AuthProvider children={children}></AuthProvider>
  return <AuthProvider>{children}</AuthProvider>;
};
