// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils"; // Assuming you have this, otherwise we can inline helper or stick to template literals

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
      primary:
        "bg-pink-600 text-white hover:bg-pink-500 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 border border-transparent",
      secondary:
        "bg-purple-900 text-white hover:bg-purple-800 shadow-md shadow-purple-900/20",
      outline:
        "bg-transparent border-2 border-white text-white hover:bg-white/10", // Modified for hero context usually
      ghost: "text-accent-3 hover:bg-purple-50",
      white: "bg-white text-black hover:bg-gray-50 shadow-lg",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
    };

    // If using clsx/tailwind-merge
    // const classes = cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className);

    // Using standard template literals for now to be safe
    const combinedClassName = `
      ${baseStyles} 
      ${variants[variant]} 
      ${sizes[size]} 
      ${fullWidth ? "w-full" : ""} 
      ${className || ""}
    `.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
