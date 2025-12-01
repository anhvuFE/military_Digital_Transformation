import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

function Button({ children, variant = "primary", fullWidth, className, ...rest }: PropsWithChildren<Props>) {
  return (
    <button
      className={clsx("btn", variant === "secondary" && "secondary", variant === "ghost" && "ghost", fullWidth && "full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
