"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import SelectionCard from "../SelectionCard";

interface StepReasonProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack?: () => void;
}

export default function StepReason({ data, onUpdate, onNext, onBack }: StepReasonProps) {
  const step = WIZARD_STEPS[0];
  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={data.reason.length > 0}
      isFirst
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {step.options!.map((opt) => (
          <SelectionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={data.reason === opt.value}
            onClick={() => onUpdate({ ...data, reason: opt.value })}
          />
        ))}
      </div>
    </WizardStep>
  );
}
