import clsx from "clsx";

interface GlassInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function GlassInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: GlassInputProps) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2 block text-sm font-medium text-white/50">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="glass-input"
      />
    </label>
  );
}
