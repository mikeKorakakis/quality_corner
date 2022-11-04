// import { ReactElement } from "react";

import ModalContent from "../../core/components/Layout/Modal/ModalContent";
import { notify } from "../../utils/notify";
import { trpc } from "../../utils/trpc";
import { useModalStore } from "./../../core/stores/modalStore";


interface Props {
  id?: any;
}
const title = "Delete Entry";
const body = "Are you sure you want to delete the entry?";
const acceptActionText = "Delete";
const rejectActionText = "Cancel";
const successMessage = "Succesfully deleted the entry"
const errorMessage = "Error deleting the entry"

const DeleteForm = ({ id }: Props) => {
  const { closeModal } = useModalStore();
  const utils = trpc.useContext();

  const {mutate} = trpc.feed.delete.useMutation({
    onSuccess:() => {
        notify({message: successMessage, type:"success"})
        utils.feed.getAll.invalidate()
    },
    onError:() => {
        notify({message: errorMessage, type:"error"})
    },
    onSettled: () => {
        closeModal();
    }
  })

  return (
    
    <ModalContent
      title={title}
      acceptButtonText={acceptActionText}
      rejectButtonText={rejectActionText}
      acceptAction={() => id && typeof id === "number" && mutate({id})}
      rejectAction={() => closeModal()}
    >
      <div>{body}</div>
    </ModalContent>
  );
};

export default DeleteForm;
