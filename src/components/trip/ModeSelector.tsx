"use client";

export type WizardMode = "guided" | "agent" | "voice";

interface ModeSelectorProps {
  mode: WizardMode;
  onChange: (mode: WizardMode) => void;
}

const MODES: { value: WizardMode; label: string }[] = [
  { value: "guided", label: "Guided" },
  { value: "agent", label: "Agent" },
  { value: "voice", label: "Voice" },
];

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="segmented-control">
      {MODES.map((m) => (
        <button
          key={m.value}
          type="button"
          data-active={mode === m.value}
          onClick={() => onChange(m.value)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
