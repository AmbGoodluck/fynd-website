import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fynd focus:border-transparent transition-all ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {helperText && (
          <p className="text-gray-500 text-xs mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
