import { cx } from "class-variance-authority";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
}

const Input = ({ label, id, className, helpText, error, ...props }: Props) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-gray-800" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cx(
          "border border-gray-300 rounded-md h-9 mt-2 overflow-hidden",
          error && "border-red-300"
        )}
      >
        <input
          id={id}
          // TODO: remove min-w-96
          className={cx(
            "px-3 text-sm text-gray-800 w-full outline-none h-full",
            className
          )}
          {...props}
        />
      </div>
      {helpText && <p className="mt-2 text-sm text-gray-400">{helpText}</p>}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
