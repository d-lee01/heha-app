"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import GlassInput from "@/components/GlassInput";

interface StepPreferencesProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const PREF_OPTIONS: { key: keyof TripData["preferences"]; label: string; icon: string }[] = [
  { key: "travel_insurance", label: "Travel Insurance", icon: "🛡" },
  { key: "airport_parking", label: "Airport Parking", icon: "🅿" },
  { key: "airport_lounge", label: "Airport Lounge", icon: "🛋" },
  { key: "car_hire", label: "Car Hire", icon: "🚗" },
  { key: "airport_transfers", label: "Airport Transfers", icon: "🚐" },
  { key: "extra_luggage", label: "Extra Luggage", icon: "🧳" },
];

export default function StepPreferences({ data, onUpdate, onNext, onBack, onSkip }: StepPreferencesProps) {
  const step = WIZARD_STEPS[7];

  const toggle = (key: keyof TripData["preferences"]) => {
    onUpdate({
      ...data,
      preferences: { ...data.preferences, [key]: !data.preferences[key] },
    });
  };

  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      canAdvance
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {PREF_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                data.preferences[opt.key]
                  ? "border-blue-400/50 bg-blue-400/10 text-blue-300"
                  : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08]"
              }`}
              onClick={() => toggle(opt.key)}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
        <GlassInput
          label="Additional notes"
          multiline
          rows={3}
          placeholder="Any specific requests..."
          value={data.preferences.notes}
          onChange={(e) =>
            onUpdate({ ...data, preferences: { ...data.preferences, notes: e.target.value } })
          }
        />
      </div>
    </WizardStep>
  );
}
