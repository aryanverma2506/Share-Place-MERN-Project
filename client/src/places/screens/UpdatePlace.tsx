import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN_LENGTH,
} from "../../shared/utils/validators";
import {
  AuthContextType,
  AuthContext,
} from "../../shared/context/auth/auth-context";
import { useForm } from "../../shared/hooks/useForm-hook";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";
import styles from "./PlaceForm.module.css";

import { PlaceModel } from "../models/place.model";

interface ResponseData {
  place: PlaceModel;
}

function UpdatePlace(): React.ReactElement {
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const authCtx = useContext<AuthContextType>(AuthContext);
  const [loadedPlace, setLoadedPlace] = useState<PlaceModel>();
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    async function fetchPlace(): Promise<void> {
      try {
        const responseData = await sendRequest<ResponseData>({
          url: `${process.env.REACT_APP_SERVER_URL}/places/${placeId}`,
        });
        if (responseData.place) {
          setLoadedPlace(() => responseData.place);
          setFormData(
            {
              title: {
                value: responseData.place.title,
                isValid: true,
              },
              description: {
                value: responseData.place.description,
                isValid: true,
              },
            },
            true
          );
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  async function placeSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}/places/${placeId}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
      });
      navigate(`/${authCtx.userId}/places`);
    } catch (error: any) {
      console.log(error);
    }
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlace && (
        <form
          className={`${styles["place-form"]}`}
          onSubmit={placeSubmitHandler}
        >
          <Input
            id="title"
            type="text"
            label="Title"
            onInput={inputHandler}
            initialValid={formState.inputs.title.isValid}
            initialValue={formState.inputs.title.value?.toString()}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
          />
          <Input
            id="description"
            type="textarea"
            label="Description"
            onInput={inputHandler}
            initialValid={formState.inputs.description.isValid}
            initialValue={formState.inputs.description.value?.toString()}
            validators={[VALIDATOR_MIN_LENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
