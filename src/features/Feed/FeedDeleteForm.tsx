import { useModalStore } from "@/core/stores/modalStore";
import { notify } from "@/utils/notify";
import { trpc } from "@/utils/trpc";
import DeleteForm from "@/core/components/Table/DeleteForm";

interface Props {
  id?: string;
}
const title = "Delete Entry";
const body = "Are you sure you want to delete the entry?";
const acceptActionText = "Delete";
const rejectActionText = "Cancel";
const successMessage = "Succesfully deleted the entry";
const errorMessage = "Error deleting the entry";

const FeedDeleteForm = ({ id }: Props) => {
  const { closeModal } = useModalStore();
  const utils = trpc.useContext();

  const { mutate } = trpc["feed"].delete.useMutation({
    onSuccess: () => {
      notify({ message: successMessage, type: "success" });
      utils.feed.getAll.invalidate();
    },
    onError: () => {
      notify({ message: errorMessage, type: "error" });
    },
    onSettled: () => {
      closeModal();
    },
  });

  const acceptAction = () => { id && typeof id === "number" && mutate({ id }) };

  return (
    <DeleteForm
      title={title}
      body={body}
      acceptActionText={acceptActionText}
      rejectActionText={rejectActionText}
      acceptAction={acceptAction}
    />
  );
};

export default FeedDeleteForm;
