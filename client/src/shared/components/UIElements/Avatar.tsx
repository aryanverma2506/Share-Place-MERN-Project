import React from "react";

import styles from "./Avatar.module.css";

interface AvatarProps extends React.PropsWithChildren {
  image: string;
  alt: string;
  className?: string;
  style?: Object;
  width?: string;
}

function Avatar(props: AvatarProps): React.ReactElement {
  return (
    <div className={`${styles.avatar} ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
}

export default Avatar;
