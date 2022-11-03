import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface Props {
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
}

const TextArea = forwardRef<
  HTMLTextAreaElement,
  Props & InputHTMLAttributes<HTMLTextAreaElement>
>(({ label, name, error, className, disabled, ...rest }, ref) => {
  return (
    <>
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className={clsx("label-text", error && "text-error")}>
              {label}
            </span>
          </label>
        )}
        <div className="relative mt-1 rounded-md">
          <textarea
            id={name}
            autoComplete={name}
            name={name}
            {...rest}
            ref={ref}
            disabled={disabled}
            className={clsx(
              "textarea-bordered textarea h-24 w-full",
              error && "textarea-error",
              className
            )}
          />
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
