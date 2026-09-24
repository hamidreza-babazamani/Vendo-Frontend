import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-secondary-500 to-secondary-400 text-white hover:shadow-lg hover:shadow-secondary-500/50 hover:scale-105",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-105",
    danger:
      "bg-gradient-to-r from-red-500 to-red-400 text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-105",
  };

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>لطفاً صبر کنید...</span>
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;