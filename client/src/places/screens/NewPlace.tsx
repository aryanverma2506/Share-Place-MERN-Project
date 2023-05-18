import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/useForm-hook";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";
import {
  AuthContext,
  AuthContextType,
} from "../../shared/context/auth/auth-context";
import styles from "./PlaceForm.module.css";

function NewPlace(): React.ReactElement {
  const authCtx = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      latitude: {
        value: "",
        isValid: false,
      },
      longitude: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function placeSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value!);
      formData.append("title", formState.inputs.title.value!);
      formData.append("address", formState.inputs.address.value!);
      formData.append("description", formState.inputs.description.value!);
      formData.append("latitude", formState.inputs.latitude.value!);
      formData.append("longitude", formState.inputs.longitude.value!);
      await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}/places/`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
        body: formData,
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className={`${styles["place-form"]}`} onSubmit={placeSubmitHandler}>
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Input
          id="title"
          label="Title"
          type="text"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
        />
        <Input
          id="address"
          label="Address"
          type="textarea"
          onInput={inputHandler}
          validators={[VALIDATOR_MIN_LENGTH(5)]}
          errorText="Please enter a valid address."
        />
        <Input
          id="description"
          label="Description"
          type="textarea"
          onInput={inputHandler}
          validators={[VALIDATOR_MIN_LENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
        />
        <Input
          id="latitude"
          label="Latitude"
          type="number"
          min={-91}
          max={90}
          onInput={inputHandler}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_MIN(-91),
            VALIDATOR_MAX(90),
          ]}
          errorText="Latitude should be between -90 to 90 degrees."
        />
        <Input
          id="longitude"
          label="Longitude"
          type="number"
          min={-181}
          max={180}
          onInput={inputHandler}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_MIN(-181),
            VALIDATOR_MAX(180),
          ]}
          errorText="Longitude should be between -180 to 180 degrees."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}

export default NewPlace;
