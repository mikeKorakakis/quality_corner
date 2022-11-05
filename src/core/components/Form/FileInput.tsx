import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import Skeleton from "./Skeleton";

interface Props {
  label?: string;
  name: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  value?: string ;
}

const FileInput = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(
  (
    { label, name, error, className, disabled, loading, value, ...rest },
    ref
  ) => {
    const isString = typeof value === 'string';
    // const isFile = typeof value === "object" ;
    // const fileUrl = isFile
    //   ? URL.createObjectURL(value as Blob )
    //   : `process.env.NEXT_PUBLIC_UPLOAD_URL?.replace(
    //     "/api",
    //     ""
    //   )/${value}`;

    
    return (
      <>
        <div className="form-control w-full">
          {label && (
            <label className="label">
              <span className={clsx("label-text", error && "text-error")}>
                {label} <span className="px-4"></span>{" "}
                {isString && <a
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                  href={`${process.env.NEXT_PUBLIC_UPLOAD_URL?.replace("/api","")}/${value}`}
                >
                  {value}
                </a>}
              </span>
            </label>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <input
              {...rest}
              ref={ref}
              type="file"
              name={name}
              onLoad={(e) => console.log("loaded")}
              //   onLoadCapture={e => console.log("finished")}
              //   onLoadedData={e => console.log("finished")}
              disabled={disabled}
              style={{ textTransform: "none" }}
              className={clsx(
                "file-input-bordered file-input w-full max-w-xs normal-case",
                error && "input-error",
                className
              )}
            />
          )}
        </div>
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
      </>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
