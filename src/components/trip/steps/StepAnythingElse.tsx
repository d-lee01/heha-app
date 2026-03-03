"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import GlassInput from "@/components/GlassInput";

interface StepAnythingElseProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function StepAnythingElse({ data, onUpdate, onNext, onBack, onSkip }: StepAnythingElseProps) {
  const step = WIZARD_STEPS[8];
  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      canAdvance
    >
      <GlassInput
        size="lg"
        multiline
        rows={5}
        placeholder="Special requests, dietary needs, celebrations..."
        value={data.anything_else_we_should_know}
        onChange={(e) => onUpdate({ ...data, anything_else_we_should_know: e.target.value })}
      />
    </WizardStep>
  );
}
