import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  AuthContext,
  AuthContextType,
} from "../../shared/context/auth/auth-context";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";
import styles from "./PlaceItem.module.css";

interface PlaceItemProps extends React.PropsWithChildren {
  id: string | number;
  title: string;
  image: string;
  address: string;
  creatorId: string | number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  onDelete: (id: string | number) => void;
}

function PlaceItem(props: PlaceItemProps): React.ReactElement {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext<AuthContextType>(AuthContext);

  function openMapHandler(): void {
    setShowMap(() => true);
  }

  function closeMapHandler(): void {
    setShowMap(() => false);
  }

  function showDeleteWarningHandler(): void {
    setShowDeleteWarning(() => true);
  }

  function cancelDeleteHandler(): void {
    setShowDeleteWarning(() => false);
  }

  async function confirmDeleteHandler(): Promise<void> {
    setShowDeleteWarning(() => false);
    try {
      await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}/places/${props.id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      props.onDelete(props.id);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        contentClass={`${styles["place-item__modal-content"]}`}
        footerClass={`${styles["place-item__modal-actions"]}`}
      >
        <div className={`${styles["map-container"]}`}>
          <Map title={props.title} coordinates={props.coordinates} zoom={15} />
        </div>
      </Modal>
      {authCtx.userId === props.creatorId && (
        <Modal
          show={showDeleteWarning}
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          footerClass={`${styles["place-item__modal-actions"]}`}
          footer={
            <>
              <Button inverse onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </>
          }
        >
          <p>
            Do you want to proceed and delete this place? Please note that it
            can't be undone thereafter.
          </p>
        </Modal>
      )}
      <li className={`${styles["place-item"]}`}>
        <Card className={`${styles["place-item__content"]}`}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={`${styles["place-item__image"]}`}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={`${styles["place-item__info"]}`}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={`${styles["place-item__actions"]}`}>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
