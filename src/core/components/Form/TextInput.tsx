import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface Props {
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
}

const TextInput = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ label, name, error, disabled, ...rest }, ref) => {
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
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          id={name}
          autoComplete={name}
          name={name}
          {...rest}
          ref={ref}
          disabled={disabled}
          className={clsx(
            "input-bordered input w-full",
            error && "input-error" && rest.className
          )}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-error"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
    </>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
