import React from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

interface ButtonProps extends React.PropsWithChildren {
  href?: string;
  to?: string;
  size?: "big" | "small";
  inverse?: boolean;
  danger?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps): React.ReactElement {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={`${styles.button} ${
          styles[`button--${props.size || "default"}`]
        } ${props.inverse && styles["button--inverse"]} ${
          props.danger && styles["button--danger"]
        }`}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`${styles.button} ${
          styles[`button--${props.size || "default"}`]
        } ${props.inverse && styles["button--inverse"]} ${
          props.danger && styles["button--danger"]
        }`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "submit"}
      className={`${styles.button} ${
        styles[`button--${props.size || "default"}`]
      } ${props.inverse && styles["button--inverse"]} ${
        props.danger && styles["button--danger"]
      }`}
      disabled={props.disabled}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.children}
    </button>
  );
}

export default Button;
