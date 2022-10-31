import { ReactElement } from "react";

interface Props {
  title?: string;
  acceptButtonText?: string;
  rejectButtonText?: string;
  acceptAction?: (a: any) => any;
  rejectAction?: (a: any) => any;
  children: ReactElement;
}

const ModalContent = ({
  title,
  acceptButtonText,
  rejectButtonText,
  acceptAction,
  rejectAction,
  children,
}: Props) => {
  return (
    <>
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
    </>
  );
};

export default ModalContent;
