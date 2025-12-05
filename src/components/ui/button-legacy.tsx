import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

function ButtonLegacy({
  children,
  variant = "primary",
  fullWidth,
  className,
  ...rest
}: PropsWithChildren<Props>) {
  const getVariant = () => {
    switch (variant) {
      case "secondary":
        return "secondary";
      case "ghost":
        return "ghost";
      default:
        return "default";
    }
  };

  return (
    <ShadcnButton
      variant={getVariant()}
      className={cn(fullWidth && "w-full justify-center", className)}
      {...rest}
    >
      {children}
    </ShadcnButton>
  );
}

export default ButtonLegacy;