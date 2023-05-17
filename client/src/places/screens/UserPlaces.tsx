import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";

import { PlaceModel } from "../models/place.model";

interface ResponseData {
  places: PlaceModel[];
}

function UserPlaces(): React.ReactElement {
  const userId = useParams().userId;
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState<
    PlaceModel[] | [] | undefined
  >([]);

  useEffect(() => {
    async function fetchUserPlaces(): Promise<void> {
      try {
        const responseData = await sendRequest<ResponseData>({
          url: `${process.env.REACT_APP_SERVER_URL}/places//user/${userId}`,
        });
        setLoadedPlaces(() => responseData.places);
      } catch (error: any) {
        if (
          error.message === "Could not find a places for the provided user id."
        ) {
          setLoadedPlaces(() => []);
        } else {
          setLoadedPlaces(() => undefined);
        }
        console.log(error);
      }
    }

    fetchUserPlaces();
  }, [userId, sendRequest]);

  function placeDeleteHandler(deletedPlaceId: string | number): void {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces?.filter((place) => place.id !== deletedPlaceId)
    );
  }

  return (
    <>
      {!loadedPlaces && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList places={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
}

export default UserPlaces;
