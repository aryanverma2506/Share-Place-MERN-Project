import React from "react";

import styles from "./MainHeader.module.css";

function MainHeader(props: React.PropsWithChildren): React.ReactElement {
  return (
    <header className={`${styles["main-header"]}`}>{props.children}</header>
  );
}

export default MainHeader;
