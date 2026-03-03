"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import GlassInput from "@/components/GlassInput";

interface StepDatesProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDates({ data, onUpdate, onNext, onBack }: StepDatesProps) {
  const step = WIZARD_STEPS[3];
  const updateDates = (key: string, value: string) =>
    onUpdate({ ...data, dates: { ...data.dates, [key]: value } });

  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={data.dates.start_date.length > 0 && data.dates.end_date.length > 0}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <GlassInput
            label="Start date"
            type="date"
            value={data.dates.start_date}
            onChange={(e) => updateDates("start_date", e.target.value)}
          />
          <GlassInput
            label="End date"
            type="date"
            value={data.dates.end_date}
            onChange={(e) => updateDates("end_date", e.target.value)}
          />
        </div>
        <GlassInput
          label="Flexible dates notes"
          multiline
          rows={3}
          placeholder="E.g. could move by a day or two..."
          value={data.dates.flexible_dates_notes}
          onChange={(e) => updateDates("flexible_dates_notes", e.target.value)}
        />
      </div>
    </WizardStep>
  );
}
