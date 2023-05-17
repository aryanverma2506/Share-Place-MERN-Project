import React, { useEffect, useReducer, useRef } from "react";

import Button from "./Button";
import styles from "./ImageUpload.module.css";

type FileReducerState = {
  file: File | undefined;
  filePreviewUrl: string | ArrayBuffer | null;
  isValid: boolean;
};

type FileReducerAction = {
  type: string;
  file?: File | undefined;
  filePreviewUrl?: string | ArrayBuffer | null;
  isValid?: boolean;
};

function filePickerReducer(state: FileReducerState, action: FileReducerAction) {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        file: action.file || state.file,
        isValid: action.isValid || state.isValid,
      };
    case "PREVIEW_FILE":
      return {
        ...state,
        filePreviewUrl: action.filePreviewUrl || state.filePreviewUrl,
      };
    default:
      return state;
  }
}

interface ImageUploadProps extends React.PropsWithChildren {
  id: string;
  errorText?: string;
  center?: boolean;
  onInput: (id: string, file: File | undefined, isValid: boolean) => void;
}

function ImageUpload(props: ImageUploadProps): React.ReactElement {
  const [filePickerState, dispatchFilePicker] = useReducer(filePickerReducer, {
    file: undefined,
    filePreviewUrl: null,
    isValid: false,
  });
  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filePickerState.file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        dispatchFilePicker({
          type: "PREVIEW_FILE",
          filePreviewUrl: fileReader.result,
        });
      };
      fileReader.readAsDataURL(filePickerState.file);
    }
  }, [filePickerState.file]);

  function pickImageHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    let pickedFile;
    let fileIsValid = filePickerState.isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      dispatchFilePicker({
        type: "INPUT_CHANGE",
        file: pickedFile,
        isValid: true,
      });
      fileIsValid = true;
    } else {
      dispatchFilePicker({
        type: "INPUT_CHANGE",
        file: undefined,
        isValid: false,
      });
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  }

  function pickButtonHandler(): void {
    filePickerRef.current?.click();
  }

  return (
    <div className={`${styles["form-control"]}`}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={pickImageHandler}
      />
      <div
        className={`${styles["image-upload"]} ${
          props.center ? styles.center : ""
        }`}
      >
        <div className={`${styles["image-upload__preview"]}`}>
          {filePickerState.filePreviewUrl && (
            <img
              src={filePickerState.filePreviewUrl.toString()}
              alt="Preview"
            />
          )}
          {!filePickerState.filePreviewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickButtonHandler}>
          PICK IMAGE
        </Button>
        {!filePickerState.isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
}

export default ImageUpload;
