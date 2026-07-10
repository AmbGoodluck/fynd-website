import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-canvas focus:ring-fynd disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

    const variants = {
      primary: "bg-fynd text-white hover:bg-fynd-dark shadow-sm",
      secondary: "bg-surface-raised text-ink ring-1 ring-hairline hover:bg-surface",
      outline:
        "border border-ink/20 text-ink hover:border-fynd hover:text-fynd",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
