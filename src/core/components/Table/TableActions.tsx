import { ReactElement, useState } from "react";
import Modal from "../Layout/Modal";

interface Props {
  EditForm?: ReactElement;
  DeleteForm?: ReactElement;
}
const TAbleActions: React.FC<Props> = ({ EditForm, DeleteForm }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      {EditForm && (
        <Modal
          id="my-modal-edit"
          // title="title"
          buttonText="Edit"
          buttonClass="link no-underline text-sm text-info block"
          widthClass="w-96"
          // acceptButtonText="ACCEPT"
          // rejectButtonText="REJECT"
          // rejectAction={rejectAction}
          open={openEdit}
          setOpen={setOpenEdit}
        >
          {EditForm && EditForm}
        </Modal>
      )}
      {DeleteForm && (
        <Modal
          id="my-modal-delete"
          // title="title"
          buttonText="Delete"
          buttonClass="link no-underline text-sm text-error"
          widthClass="w-96"
          // acceptButtonText="ACCEPT"
          // rejectButtonText="REJECT"
          // rejectAction={rejectAction}
          open={openDelete}
          setOpen={setOpenDelete}
        >
          {DeleteForm && DeleteForm}
        </Modal>
      )}
    </>
  );
};

export default TAbleActions;
