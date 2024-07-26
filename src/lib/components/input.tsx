import { cx } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
}

const Input = ({ label, id, className, helpText, error, ...props }: Props) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-gray-dark" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cx(
          "border border-gray rounded-md h-9 mt-1 overflow-hidden focus-within:border-primary transition-colors",
          error ? "border-red-light" : "",
        )}
      >
        <input
          id={id}
          className={cx(
            "px-3 text-sm text-gray-dark outline-none h-full",
            className ?? "",
          )}
          {...props}
        />
      </div>
      {helpText && <p className="mt-2 text-sm text-gray-text">{helpText}</p>}
      {error && <p className="mt-2 text-sm text-red-text">{error}</p>}
    </div>
  );
};

export default Input;
