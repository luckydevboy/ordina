import { ButtonHTMLAttributes, ReactElement, cloneElement } from "react";
import { VariantProps, cva } from "class-variance-authority";

type Variants = {
  variant: { primary: string; secondary: string; soft: string };
  size: { xs: string; sm: string; md: string; lg: string; xl: string };
  rounded: { true: string; false: string };
  circular: { true: string; false: string };
};

const button = cva<Variants>(
  "flex items-center justify-center gap-x-2 relative outline-none transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-hover text-white",
        secondary:
          "bg-secondary text-secondary-text border border-secondary-border hover:bg-secondary-hover",
        soft: "bg-soft text-soft-text hover:bg-soft-hover",
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
      { rounded: false, circular: false, class: "rounded-md" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "lg",
      circular: false,
      rounded: false,
    },
  },
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
  const renderIconWithClassName = () => {
    if (icon) {
      return cloneElement(icon, {
        className: `${icon.props.className} flex-shrink-0`,
      });
    }
  };

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
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {iconPosition === "start" && renderIconWithClassName()}
      {children}
      {iconPosition === "end" && renderIconWithClassName()}
    </button>
  );
};

export default Button;
