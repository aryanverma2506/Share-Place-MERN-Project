import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import styles from "./UsersList.module.css";

import { UserModel } from "../models/user.model";

interface UserListProps extends React.PropsWithChildren {
  users: UserModel[] | [];
}

function UserList(props: UserListProps): React.ReactElement {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={`${styles["users-list"]}`}>
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}

export default UserList;
