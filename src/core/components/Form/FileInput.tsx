import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import Skeleton from "./Skeleton";

interface Props {
  label?: string;
  name: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
}

const FileInput = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ label, name, error, className, disabled, loading, ...rest }, ref) => {
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
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <input
              {...rest}
              ref={ref}
              type="file"
              name={name}
              disabled={disabled}
              style={{ textTransform: "none" }}
              className={clsx(
                "file-input-bordered file-input w-full max-w-xs normal-case",
                error && "input-error" , className
              )}
            />
          </>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </>
  );
});

FileInput.displayName = "FileInput";

export default FileInput;
