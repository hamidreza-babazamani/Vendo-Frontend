import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = "", ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="label-glass">{label}</label>}

        <div className="relative">
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`input-glass ${icon ? "pr-12" : ""} ${
              error
                ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/50"
                : ""
            } ${className}`}
            {...rest}
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>
        )}

        {!error && helperText && (
          <p className="mt-2 text-sm text-white/50">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;