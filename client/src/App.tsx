import React, { Suspense, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import {
  AuthContext,
  AuthContextType,
} from "./shared/context/auth/auth-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = lazy(() => import("./user/screens/Users"));
const UserPlaces = lazy(() => import("./places/screens/UserPlaces"));
const NewPlace = lazy(() => import("./places/screens/NewPlace"));
const UpdatePlace = lazy(() => import("./places/screens/UpdatePlace"));
const Auth = lazy(() => import("./user/screens/Auth"));

function App(): React.ReactElement {
  const authCtx = useContext<AuthContextType>(AuthContext);

  return (
    <>
      <MainNavigation />
      <main>
        <Suspense fallback={<LoadingSpinner asOverlay />}>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route
              path="/places/new"
              element={
                authCtx.isLoggedIn ? <NewPlace /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/places/:placeId"
              element={
                authCtx.isLoggedIn ? <UpdatePlace /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/auth"
              element={!authCtx.isLoggedIn ? <Auth /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
