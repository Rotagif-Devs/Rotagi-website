import { ButtonHTMLAttributes, forwardRef } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  withArrow?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      withArrow = false,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
      primary: "bg-secondary text-white hover:bg-secondary/90 ",
      secondary: "bg-white text-black hover:bg-gray-50 ",
      outline:
        "bg-transparent border-2 border-white text-white hover:bg-white/10",
      ghost: "p-0 bg-transparent text-secondary hover:text-secondary/80",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
    };

    const combinedClassName = cn(
      baseStyles,
      sizes[size],
      variants[variant],
      fullWidth && "w-full",
      className,
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
          {withArrow && (
            <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          )}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {children}
        {withArrow && (
          <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
