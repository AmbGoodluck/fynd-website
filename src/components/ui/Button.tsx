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
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fynd disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-fynd text-white hover:bg-fynd-dark focus:ring-fynd button-glow",
      secondary: "bg-slate-100 text-gray-900 hover:bg-slate-200 focus:ring-fynd",
      outline:
        "border-2 border-fynd text-fynd hover:bg-fynd hover:text-white focus:ring-fynd",
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
