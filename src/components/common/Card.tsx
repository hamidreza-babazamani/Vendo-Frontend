import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = ({
  children,
  hover = false,
  padding = "md",
  className = "",
  ...rest
}: CardProps) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const baseClasses = hover ? "glass-card-hover" : "glass-card";

  return (
    <div
      className={`${baseClasses} ${paddings[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;