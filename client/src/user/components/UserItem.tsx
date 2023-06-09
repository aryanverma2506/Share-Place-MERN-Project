import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import styles from "./UserItem.module.css";

interface UserItemProps extends React.PropsWithChildren {
  id: string | number;
  image: string;
  name: string;
  placeCount: number;
}

function UserItem(props: UserItemProps): React.ReactElement {
  return (
    <li className={`${styles["user-item"]}`}>
      <Card className={`${styles["user-item__content"]}`}>
        <Link to={`/${props.id}/places`}>
          <div className={`${styles["user-item__image"]}`}>
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className={`${styles["user-item__info"]}`}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
