import clsx from "clsx";
import Link from "next/link";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "coral" | "teal" | "blue" | "purple";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function GlassButton({
  children,
  href,
  variant,
  onClick,
  type = "button",
  disabled,
  className,
}: GlassButtonProps) {
  const classes = clsx(
    "glass-button",
    variant && `glass-button-${variant}`,
    disabled && "opacity-50 pointer-events-none",
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
