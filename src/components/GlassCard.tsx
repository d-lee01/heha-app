import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  shimmer?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-6 py-6 sm:px-8",
  md: "px-8 py-8 sm:px-12",
  lg: "px-8 py-10 sm:px-12",
};

export default function GlassCard({
  children,
  size = "md",
  shimmer,
  className,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-panel",
        shimmer && "shimmer-border",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
