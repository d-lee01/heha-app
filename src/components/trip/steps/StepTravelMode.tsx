"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import SelectionCard from "../SelectionCard";

interface StepTravelModeProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTravelMode({ data, onUpdate, onNext, onBack }: StepTravelModeProps) {
  const step = WIZARD_STEPS[2];
  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={data.how_we_are_travelling.length > 0}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {step.options!.map((opt) => (
          <SelectionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={data.how_we_are_travelling === opt.value}
            onClick={() => onUpdate({ ...data, how_we_are_travelling: opt.value })}
          />
        ))}
      </div>
    </WizardStep>
  );
}
