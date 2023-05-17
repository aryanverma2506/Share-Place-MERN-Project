import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext, AuthContextType } from "../../context/auth/auth-context";
import { useHttpClient } from "../../hooks/useHttpClient-hook";
import styles from "./NavLinks.module.css";

interface NavLinksProps extends React.PropsWithChildren {
  onClick?: () => void;
}

function NavLinks(props: NavLinksProps): React.ReactElement {
  const authCtx = useContext<AuthContextType>(AuthContext);

  const { error, isLoading, sendRequest, clearError } = useHttpClient();

  async function logout(): Promise<void> {
    if (authCtx.isLoggedIn) {
      try {
        await sendRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/users/logout`,
        });
        authCtx.logout();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <ul className={`${styles["nav-links"]}`}>
        <li>
          <NavLink
            to={"/"}
            className={(navData) => (navData.isActive ? styles.active : "")}
            onClick={() => props.onClick && props.onClick()}
          >
            ALL USERS
          </NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <li>
            <NavLink
              to={`/${authCtx.userId}/places`}
              className={(navData) => (navData.isActive ? styles.active : "")}
              onClick={() => props.onClick && props.onClick()}
            >
              MY PLACES
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink
              to={"/places/new"}
              className={(navData) => (navData.isActive ? styles.active : "")}
              onClick={() => props.onClick && props.onClick()}
            >
              ADD PLACE
            </NavLink>
          </li>
        )}
        {!authCtx.isLoggedIn && (
          <li>
            <NavLink
              to={"/auth"}
              className={(navData) => (navData.isActive ? styles.active : "")}
              onClick={() => props.onClick && props.onClick()}
            >
              AUTHENTICATE
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <button onClick={logout}>LOGOUT</button>
          </li>
        )}
      </ul>
    </>
  );
}

export default NavLinks;
