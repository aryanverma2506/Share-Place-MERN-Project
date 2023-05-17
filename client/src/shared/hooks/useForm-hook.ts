import { useCallback, useReducer } from "react";

type InitialInputs = {
  [key: string]: {
    value: string | File | null;
    isValid: boolean;
  };
};

type FormReducerState = {
  inputs: InitialInputs;
  isValid: boolean;
};

type FormReducerAction = {
  type: string;
  isValid: boolean;
  value?: string | File;
  inputId?: string;
  inputs?: InitialInputs;
};

type InputHandlerFunction = (
  id: string,
  value: string | File | undefined,
  isValid: boolean
) => void;

type SetFormDataFunction = (
  inputData: InitialInputs,
  formValidity: boolean
) => void;

function formReducer(state: FormReducerState, action: FormReducerAction) {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      if (action.inputId) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: {
              value: action.value ?? state.inputs[action.inputId].value,
              isValid: action.isValid,
            },
          },
          isValid: formIsValid,
        };
      }
      break;
    case "SET_DATA":
      return {
        inputs: action.inputs || state.inputs,
        isValid: action.isValid || state.isValid,
      };
    default:
      return state;
  }
  return {
    ...state,
  };
}

export function useForm(
  initialInputs: InitialInputs,
  initialFormValidity?: boolean
): [FormReducerState, InputHandlerFunction, SetFormDataFunction] {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity || false,
  });

  const inputHandler: InputHandlerFunction = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: "INPUT_CHANGE",
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    []
  );

  const setFormData: SetFormDataFunction = useCallback(
    (inputData, formValidity) => {
      dispatchFormState({
        type: "SET_DATA",
        inputs: inputData,
        isValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
}
