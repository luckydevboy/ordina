import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { VariantProps, cva } from "class-variance-authority";

const button = cva(
  [
    "flex items-center justify-center gap-x-2",
    "font-nunito",
    "relative rounded-md",
  ],
  {
    variants: {
      variant: {
        primary: "bg-blue-700 hover:bg-blue-600 text-white",
        secondary:
          "bg-white text-gray-800 border border-gray-400 hover:bg-gray-100",
        soft: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      },
      size: {
        xs: "h-6 px-1.5 font-semibold text-xs",
        sm: "h-7 px-2 font-semibold text-sm",
        md: "h-8 px-2.5 font-semibold text-sm",
        lg: "h-9 px-3 font-semibold text-sm",
        xl: "h-10 px-3.5 font-semibold text-sm",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
      circular: {
        true: "rounded-full px-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        circular: true,
        class: "w-6",
      },
      {
        size: "sm",
        circular: true,
        class: "w-7",
      },
      {
        size: "md",
        circular: true,
        class: "w-8",
      },
      {
        size: "lg",
        circular: true,
        class: "w-9",
      },
      {
        size: "xl",
        circular: true,
        class: "w-10",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  isLoading?: boolean;
  rounded?: boolean;
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  circular?: boolean;
}

const Button = ({
  children,
  className,
  isLoading,
  variant,
  size,
  rounded,
  icon,
  iconPosition = "start",
  circular,
  ...props
}: Props) => {
  return (
    <button
      className={button({ variant, size, rounded, circular, className })}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
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
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </button>
  );
};

export default Button;
