import { getSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  user: any;
  checkAuthUser: () => Promise<any>;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
  //   login: (email: string, password: string) => Promise<void>;
  //   register: (email: string, password: string) => Promise<void>;
  //   logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    // Check user authentication status on mount
    checkAuthUser()
      .then(setAuthUser)
      .catch(() => setAuthUser(null));
  }, []);
  const checkAuthUser = async () => {
    const session = await getSession();
    if (session?.user) {
      return session.user;
    }
    return null;
  };

  const value = useMemo(() => {
    return { user: authUser, checkAuthUser, setAuthUser };
  }, [authUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
