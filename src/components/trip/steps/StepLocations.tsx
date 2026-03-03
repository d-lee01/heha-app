"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import GlassInput from "@/components/GlassInput";

interface StepLocationsProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepLocations({ data, onUpdate, onNext, onBack }: StepLocationsProps) {
  const step = WIZARD_STEPS[5];
  const update = (key: string, value: string) =>
    onUpdate({ ...data, journey_locations: { ...data.journey_locations, [key]: value } });

  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={
        data.journey_locations.travelling_from.trim().length > 0 &&
        data.journey_locations.travelling_to.trim().length > 0
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <GlassInput
            label="Travelling from"
            placeholder="London"
            value={data.journey_locations.travelling_from}
            onChange={(e) => update("travelling_from", e.target.value)}
          />
          <GlassInput
            label="Postcode"
            placeholder="SW1A 1AA"
            value={data.journey_locations.postcode_from}
            onChange={(e) => update("postcode_from", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <GlassInput
            label="Travelling to"
            placeholder="Barcelona"
            value={data.journey_locations.travelling_to}
            onChange={(e) => update("travelling_to", e.target.value)}
          />
          <GlassInput
            label="Postcode"
            placeholder="08001"
            value={data.journey_locations.postcode_to}
            onChange={(e) => update("postcode_to", e.target.value)}
          />
        </div>
        <GlassInput
          label="Nearest airport"
          placeholder="LHR"
          value={data.journey_locations.nearest_airport}
          onChange={(e) => update("nearest_airport", e.target.value)}
        />
      </div>
    </WizardStep>
  );
}
