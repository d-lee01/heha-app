"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import GlassInput from "@/components/GlassInput";

interface StepNameProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepName({ data, onUpdate, onNext, onBack }: StepNameProps) {
  const step = WIZARD_STEPS[1];
  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={data.name.trim().length > 0}
    >
      <GlassInput
        size="lg"
        placeholder="Summer in Barcelona"
        value={data.name}
        onChange={(e) => onUpdate({ ...data, name: e.target.value })}
      />
    </WizardStep>
  );
}
