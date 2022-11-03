import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";

interface Props {
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ label, name, error, disabled, className, ...rest }, ref) => {
  const [visible, setVisible] = useState(false);
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
            type={visible ? "text" : "password"}
            disabled={disabled}
            className={clsx(
              "input-bordered input w-full",
              error && " input-error",
              className
            )}
          />
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 ">
            {!visible ? (
              <EyeSlashIcon
                onClick={() => setVisible(!visible)}
                className={clsx(
                  "h-5 w-5  ",
                  error ? "text-error" : "text-base-neutral"
                )}
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                onClick={() => setVisible(!visible)}
                className={clsx(
                  "h-5 w-5  ",
                  error ? "text-error" : "text-base-neutral"
                )}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
