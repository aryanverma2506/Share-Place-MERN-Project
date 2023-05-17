import React from "react";
import ReactDOM from "react-dom";

import styles from "./Backdrop.module.css";

interface BackdropProps extends React.PropsWithChildren {
  onClick: () => void;
}

function Backdrop(props: BackdropProps): React.ReactPortal {
  return ReactDOM.createPortal(
    <div className={`${styles.backdrop}`} onClick={props.onClick} />,
    document.getElementById("backdrop-hook") as HTMLElement
  );
}

export default Backdrop;
