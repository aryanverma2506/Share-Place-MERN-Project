import React from "react";
import Modal from "./Modal";
import Button from "../FormElements/Button";

interface ErrorModalProps extends React.PropsWithChildren {
  onClear: () => void;
  error: string | null;
}

function ErrorModal(props: ErrorModalProps): React.ReactElement {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
}

export default ErrorModal;
