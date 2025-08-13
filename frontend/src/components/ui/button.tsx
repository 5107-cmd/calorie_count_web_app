import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "secondary" | "outline" | "link";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary";
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border border-primary text-primary hover:bg-primary/10 dark:border-purple-400 dark:text-purple-400",
    link: "text-primary underline-offset-4 hover:underline dark:text-purple-400",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
