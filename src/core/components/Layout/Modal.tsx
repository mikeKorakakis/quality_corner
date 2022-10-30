import clsx from "clsx";
import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";

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

const Modal: React.FC<Props> = ({
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
}) => {
  useEffect(() => {
    const md = document.getElementById(id) as HTMLInputElement;
    if (md) md.checked = open;
  }, [open]);

  const handleOpen = () => {
    const md = document.getElementById(id) as HTMLInputElement;
    if (md && !md.checked) {
      md.checked = true;
    }
    setOpen(() => true);
  };
  const handleClose = () => {
    const md = document.getElementById(id) as HTMLInputElement;
    if (md) {
      md.checked = false;
    }
    setOpen(() => false);
  };

  return (
    <>
      <label onClick={handleOpen} className={buttonClass}>
        {buttonText}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer ">
        <label className={clsx("modal-box relative max-w-5xl", widthClass)}>
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
