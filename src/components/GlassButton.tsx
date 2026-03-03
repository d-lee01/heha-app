import clsx from "clsx";
import Link from "next/link";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "coral" | "teal" | "blue" | "purple";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function GlassButton({
  children,
  href,
  variant,
  onClick,
  type = "button",
  className,
}: GlassButtonProps) {
  const classes = clsx(
    "glass-button",
    variant && `glass-button-${variant}`,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
