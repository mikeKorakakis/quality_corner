import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { trpc } from "../../../utils/trpc";

interface Options {
  text: string;
  value: string;
}
interface Props {
  //   selectedValue: number;
  label?: string;
  error?: string;
  name: string;
  router: string;
  procedure: string;
  disabled?: boolean;
  options?: Options[];
}

const Select: React.FC<any> = forwardRef<
  HTMLSelectElement,
  Props & InputHTMLAttributes<HTMLSelectElement>
>(
  (
    {
      label,
      error,
      name,
      disabled,
      options,
      //   selectedValue,
      className,
      ...rest
    },
    ref
  ) => {
    const opts: Options[] = options ? [...options] : [];

    const utils = trpc.useContext();

    const {
      data,
      isLoading,
      isFetching,
      error: tError,
    } = trpc["postCategory"]["getAll"].useQuery(
      {
        pageIndex: 0,
        pageSize: 1000,
        sorting: [],
        columnFilters: [],
      },
      {
        onSuccess: () => {
          utils.feed.get.invalidate();
        },
        staleTime: 100000,
      }
    );

    data && opts.push(...data.data.map((x) => ({ value: x.id, text: x.name })));
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
            <select
              //   defaultValue={
              //     selectedValue ? parseInt(selectedValue.toString()) : 0
              //   }
              id={name}
              name={name}
              disabled={disabled}
              autoComplete={name}
              ref={ref}
              {...rest}
              className={clsx(
                "select-bordered select w-full",
                error && "select-error",
                className
              )}
            >
              <option value=""></option>
              {opts.map(({ text, value }) => {
                return (
                  <option
                    key={value}
                    value={value}
                    // selected={
                    // 	selectedValue
                    // 		? parseInt(value) ===
                    // 		  parseInt(selectedValue.toString())
                    // 		: false
                    // }
                  >
                    {text}
                  </option>
                );
              })}
            </select>
            {(isLoading || isFetching) && (
              <div className="pointer-events-none absolute inset-y-0 left-1/2 flex items-center pr-3">
                <svg
                  className="text-neutral-400 -ml-1 mr-3 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {tError && (
          <p className="mt-2 text-sm text-red-500">{tError.message}</p>
        )}
      </>
    );
  }
);

Select.displayName = "Select";

export default Select;
