import clsx from "clsx";
import { useModalStore } from "../../../stores/modalStore";

interface Props {
  id: string;
  widthClass?: string;
}

const Modal = ({ id, widthClass = "w-fit" }: Props) => {
  const { open } = useModalStore();
  const { element } = useModalStore();
  const { closeModal } = useModalStore();

  const handleChange = (evt: any) => {
    console.log(evt);
    if (!evt.target.checked) closeModal();
  };

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={open}
        onChange={handleChange}
      />
      <label htmlFor={id} className="modal cursor-pointer ">
        <label className={clsx("modal-box relative max-w-5xl ", widthClass)}>
          <label
            onClick={closeModal}
            className="btn-error btn-sm btn-circle btn absolute right-2 top-2 text-neutral-content hover:bg-red-500 "
          >
            ✕
          </label>
          <>{element}</>
        </label>
      </label>
    </>
  );
};

export default Modal;
