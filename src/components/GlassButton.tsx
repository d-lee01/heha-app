import clsx from "clsx";
import Link from "next/link";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "coral" | "teal" | "blue" | "purple" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function GlassButton({
  children,
  href,
  variant,
  size = "md",
  disabled,
  onClick,
  type = "button",
  className,
}: GlassButtonProps) {
  const classes = clsx(
    "glass-button",
    variant && `glass-button-${variant}`,
    size !== "md" && `glass-button-${size}`,
    disabled && "glass-button-disabled",
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
