import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import styles from "./MainNavigation.module.css";

function MainNavigation(): React.ReactElement {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const handleWindowResize = useCallback(() => {
    if (drawerIsOpen && window.innerWidth >= 768) {
      setDrawerIsOpen(() => false);
    }
  }, [drawerIsOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  function openDrawerHandler(): void {
    setDrawerIsOpen(() => true);
  }

  function closeDrawerHandler(): void {
    setDrawerIsOpen(() => false);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen}>
        <nav className={`${styles["main-navigation__drawer-nav"]}`}>
          <NavLinks onClick={closeDrawerHandler} />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={`${styles["main-navigation__menu-btn"]}`}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={`${styles["main-navigation__title"]}`}>
          <Link to={"/"}>YourPlaces</Link>
        </h1>
        <nav className={`${styles["main-navigation__header-nav"]}`}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
