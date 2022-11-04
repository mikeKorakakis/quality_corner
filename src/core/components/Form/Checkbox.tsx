import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

interface Props {
  label?: string;
  name: string;
  error?: string;
}

const Checkbox = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ label, name, error, className, ...rest }, ref) => {
  return (
    <>
      <div className="form-control w-fit">
        <label className="label cursor-pointer">
          {label && (
            <span className={clsx("label-text pr-4", error && "text-error")}>
              {label}
            </span>
          )}
          <input
            ref={ref}
            {...rest}
            name={name}
            id={name}
            type="checkbox"
            className={clsx("checkbox", error && "checkbox-error", className)}
          />
        </label>
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;

