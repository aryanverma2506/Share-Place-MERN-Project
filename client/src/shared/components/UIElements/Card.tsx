import React from "react";

import styles from "./Card.module.css";

interface CardProps extends React.PropsWithChildren {
  className?: string;
  style?: Object;
}

function Card(props: CardProps): React.ReactElement {
  return (
    <div className={`${styles.card} ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}

export default Card;
