import clsx from "clsx";
import { Dispatch, ReactElement, SetStateAction } from "react";

interface Props {
  id: string;
  buttonClass: string;
  title?: string;
  buttonText?: string;
  children?: ReactElement;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  widthClass?: string;
  acceptButtonText?: string;
  rejectButtonText?: string;
  acceptAction?: (a: any) => any;
  rejectAction?: (a: any) => any;
}

const Modal = ({
  id,
  title,
  buttonText = "Open Modal",
  buttonClass = "btn",
  children,
  open,
  setOpen,
  widthClass = "w-fit",
  acceptButtonText,
  rejectButtonText,
  acceptAction,
  rejectAction,
}: Props) => {
  const handleOpen = () => {
    setOpen(() => true);
  };
  const handleClose = () => {
    setOpen(() => false);
  };

  const handleChange = (evt: any) => {
    evt.target.checked ? handleOpen() : handleClose();
  };

  return (
    <>
      <label onClick={handleOpen} className={buttonClass}>
        {buttonText}
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={open}
        onChange={handleChange}
      />
      <label htmlFor={id} className="modal cursor-pointer  ">
        <label className={clsx("modal-box relative max-w-5xl overflow-x-hidden", widthClass)}>
          <label
            onClick={handleClose}
            className="btn-error btn-sm btn-circle btn absolute right-2 top-2 text-neutral-content hover:bg-red-500 "
          >
            ✕
          </label>
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {children}
          <div className="modal-action">
            {acceptButtonText && (
              <label
                onClick={acceptAction}
                htmlFor="my-modal-5"
                className="btn-sm btn"
              >
                {acceptButtonText}
              </label>
            )}
            {rejectButtonText && (
              <label
                onClick={rejectAction}
                htmlFor="my-modal-5"
                className="btn-error btn-sm btn text-neutral-content hover:bg-red-500"
              >
                {rejectButtonText}
              </label>
            )}
          </div>
        </label>
      </label>
    </>
  );
};

export default Modal;
