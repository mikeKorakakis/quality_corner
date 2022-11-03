import clsx from "clsx";
import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
}
export default function DateInput({
  label,
  name,
  control,
  error,
  disabled,
  className,
  ...rest
}: Partial<ReactDatePickerProps> & Props) {
  return (
    <div className="form-control w-full">
      {label && (
          <label className="label">
          <span className={clsx("label-text", error && "text-error")}>
            {label}
          </span>
        </label>
      )}
      <Controller
        control={control}
        rules={{ required: true }}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            disabled={disabled}
            {...field}
            {...rest}
            className={clsx(
              "input-bordered input w-full",
              error && "input-error",
              className
            )}
            name={name}
            // onChange={onChange}
            // onBlur={onBlur}
            selected={(field.value && new Date(field.value)) || null}
            value={(field.value && new Date(field.value)) || null}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
