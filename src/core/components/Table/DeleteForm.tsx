// import { ReactElement } from "react";

import ModalContent from "../Layout/Modal/ModalContent";
import { useModalStore } from "../../stores/modalStore";

const titleDefault = "Delete Entry";
const bodyDefault = "Are you sure you want to delete the entry?";
const acceptActionTextDefault = "Delete";
const rejectActionTextDefault = "Cancel";

interface Props {
  title?: string;
  body?: string;
  acceptActionText?: string;
  rejectActionText?: string;
  acceptAction: () => void;
}

const DeleteForm = ({
  acceptAction,
  title = titleDefault,
  body = bodyDefault,
  acceptActionText = acceptActionTextDefault,
  rejectActionText = rejectActionTextDefault,
}: Props) => {
  const { closeModal } = useModalStore();
  return (
    <ModalContent
      title={title}
      acceptButtonText={acceptActionText}
      rejectButtonText={rejectActionText}
      acceptAction={acceptAction}
      rejectAction={() => closeModal()}
    >
      <div>{body}</div>
    </ModalContent>
  );
};

export default DeleteForm;
