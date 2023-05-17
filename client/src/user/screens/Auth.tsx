import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/useForm-hook";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import {
  AuthContext,
  AuthContextType,
} from "../../shared/context/auth/auth-context";
import styles from "./Auth.module.css";

interface ResponseUserData {
  userId: string;
  email: string;
  token: string;
}

function Auth(): React.ReactElement {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext<AuthContextType>(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function switchModeHandler(): void {
    if (!isLoginMode) {
      delete formState.inputs.image;
      delete formState.inputs.name;
      setFormData(
        {
          ...formState.inputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          image: {
            value: null,
            isValid: false,
          },
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  }

  async function authSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest<ResponseUserData>({
          url: `${process.env.REACT_APP_SERVER_URL}/users/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        console.log(responseData);
        authCtx.login(responseData.userId, responseData.token, undefined);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value!);
        formData.append("email", formState.inputs.email.value!);
        formData.append("password", formState.inputs.password.value!);
        formData.append("image", formState.inputs.image.value!);
        const responseData = await sendRequest<ResponseUserData>({
          url: `${process.env.REACT_APP_SERVER_URL}/users/signup`,
          method: "POST",
          body: formData,
        });

        console.log(responseData);
        authCtx.login(responseData.userId, responseData.token, undefined);
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className={`${styles.authentication}`}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <ImageUpload
                id="image"
                center
                onInput={inputHandler}
                errorText="Please provide an image"
              />
              <Input
                type="text"
                id="name"
                label="Your Name"
                placeholder="Your Name"
                onInput={inputHandler}
                errorText="Please enter a name."
                validators={[VALIDATOR_REQUIRE()]}
              />
            </>
          )}
          <Input
            type="email"
            id="email"
            label="E-mail"
            placeholder="E-mail"
            initialValue={formState.inputs.email.value?.toString()}
            onInput={inputHandler}
            errorText="Please enter a valid e-mail address."
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            initialValue={formState.inputs.password.value?.toString()}
            onInput={inputHandler}
            placeholder="Password"
            errorText="Please enter a valid password, at least 8 characters."
            validators={[VALIDATOR_MIN_LENGTH(8)]}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
