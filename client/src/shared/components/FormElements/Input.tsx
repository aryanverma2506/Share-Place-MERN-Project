import React, { useEffect, useReducer } from "react";

import validate, { ValidatorType } from "../../utils/validators";
import styles from "./Input.module.css";

function inputReducer(
  state: {
    step: number;
    value: string;
    isValid: boolean;
    isTouched: boolean;
  },
  action: {
    type: string;
    step?: number;
    value?: string;
    validators?: { type: ValidatorType; value: string }[];
  }
) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        step: action.step || state.step,
        value: action.value || "",
        isValid: validate(action.value || "", action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

interface InputProps {
  id: string;
  type: string;
  label: string;
  errorText: string;
  initialValid?: boolean;
  initialValue?: string | number;
  validators?: { type: ValidatorType; value: string }[];
  rows?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  onInput?: (a: string, b: string, c: boolean) => void;
}

function Input(props: InputProps): React.ReactElement {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    step: 1,
    value: props.initialValue?.toString() || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    if (onInput) {
      onInput(id, value, isValid);
    }
  }, [id, value, isValid, onInput]);

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (event.target.type === "number") {
      let inputStepValue = 1;
      if (Number.isInteger(parseFloat(event.target.value))) {
        inputStepValue = 1;
      } else if (event.target.value.trim().length !== 0) {
        const decimalPlaces = (event.target.value.split(".")[1] || "").length;
        inputStepValue = parseFloat(`0.${"0".repeat(decimalPlaces - 1)}1`);
      }
      dispatchInputState({
        type: "CHANGE",
        step: inputStepValue,
        value: event.target.value,
        validators: props.validators,
      });
    } else {
      dispatchInputState({
        type: "CHANGE",
        value: event.target.value,
        validators: props.validators,
      });
    }
  }

  function touchHandler(): void {
    dispatchInputState({
      type: "TOUCH",
    });
  }

  const inputElement =
    props.type === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <input
        id={props.id}
        type={props.type}
        min={props.min}
        max={props.max}
        step={props.type === "number" ? inputState.step : undefined}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} ${
        !inputState.isValid && inputState.isTouched
          ? styles["form-control--invalid"]
          : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
