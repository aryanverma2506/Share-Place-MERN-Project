import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.css";

interface SideDrawerProps extends React.PropsWithChildren {
  show: boolean;
}

function SideDrawer(props: SideDrawerProps): React.ReactPortal {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={`${styles["side-drawer"]}`}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as HTMLElement
  );
}

export default SideDrawer;
