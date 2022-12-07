import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
export default function Button(
  props: Props & ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { children, loading, disabled, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "btn-md btn w-full bg-primary text-primary-content font-bold rounded-md",
        loading && "loading disabled:bg-primary disabled:text-primary-content",
        className
      )}
      type="submit"
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
