import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  shimmer?: boolean;
  flush?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-6 py-6 sm:px-8",
  md: "px-8 py-8 sm:px-12",
  lg: "px-8 py-10 sm:px-12",
  xl: "px-10 py-12 sm:px-16",
};

export default function GlassCard({
  children,
  size = "md",
  shimmer,
  flush,
  className,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-panel",
        shimmer && "shimmer-border",
        flush ? "p-0" : sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
