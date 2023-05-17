import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import styles from "./Modal.module.css";

interface ModalOverlayProps extends React.PropsWithChildren {
  header: string;
  footer: React.ReactNode;
  style?: Object;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  onSubmit?: () => void;
}

function ModalOverlay(props: ModalOverlayProps): React.ReactPortal {
  const content = (
    <div className={`${styles.modal} ${props.className}`} style={props.style}>
      <header className={`${styles.modal__header} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${styles.modal__content} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${styles.modal__footer} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
}

interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel: () => void;
}

function Modal(props: ModalProps): React.ReactElement {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter: `${styles["modal-enter"]}`,
          enterActive: `${styles["modal-enter-active"]}`,
          exit: `${styles["modal-exit"]}`,
          exitActive: `${styles["modal-exit-active"]}`,
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
