import React from "react";
import ReactDOM from "react-dom";

import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps extends React.PropsWithChildren {
  asOverlay: boolean;
}

function LoadingSpinner(props: LoadingSpinnerProps): React.ReactPortal {
  return ReactDOM.createPortal(
    <div className={`${props.asOverlay && styles["loading-spinner__overlay"]}`}>
      <div className={`${styles["lds-dual-ring"]}`}></div>
    </div>,
    document.getElementById("loading-hook") as HTMLElement
  );
}

export default LoadingSpinner;
