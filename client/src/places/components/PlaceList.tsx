import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {
  AuthContext,
  AuthContextType,
} from "../../shared/context/auth/auth-context";
import styles from "./PlaceList.module.css";

import { PlaceModel } from "../models/place.model";

interface PlaceListProps extends React.PropsWithChildren {
  places: PlaceModel[];
  onDeletePlace: (id: string | number) => void;
}

function PlaceList(props: PlaceListProps): React.ReactElement {
  const authCtx = useContext<AuthContextType>(AuthContext);
  const userId = useParams().userId;
  if (props.places.length === 0) {
    return (
      <div className={`${styles["place-list"]} center`}>
        {authCtx.isLoggedIn && authCtx.userId === userId ? (
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        ) : (
          <Card>
            <h2>No places found.</h2>
          </Card>
        )}
      </div>
    );
  }
  return (
    <ul className={`${styles["place-list"]}`}>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          description={place.description}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
