import React, { useCallback, useEffect, useState } from "react";

import { AuthContext } from "./auth-context";

let logoutTimer: NodeJS.Timeout;

function AuthProvider(props: React.PropsWithChildren): React.ReactElement {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >();

  const login = useCallback(
    (uid: string, token: string, expirationDate: Date | undefined) => {
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      setTokenExpirationDate(() => tokenExpirationDate);
      setToken(() => token);
      setUserId(() => uid);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setTokenExpirationDate(() => undefined);
    setToken(() => null);
    setUserId(() => null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    } else {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  const authContext = {
    isLoggedIn: !!token,
    userId,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
