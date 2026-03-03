"use client";

import { useState } from "react";
import type { TripData, Traveler } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import TravelerCard from "../TravelerCard";
import GlassButton from "@/components/GlassButton";

interface StepTravelersProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTravelers({ data, onUpdate, onNext, onBack }: StepTravelersProps) {
  const step = WIZARD_STEPS[4];
  const [adding, setAdding] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const addTraveler = (t: Traveler) => {
    onUpdate({ ...data, people_travelling: [...data.people_travelling, t] });
    setAdding(false);
  };

  const updateTraveler = (idx: number, t: Traveler) => {
    const next = [...data.people_travelling];
    next[idx] = t;
    onUpdate({ ...data, people_travelling: next });
    setEditIdx(null);
  };

  const removeTraveler = (idx: number) => {
    onUpdate({ ...data, people_travelling: data.people_travelling.filter((_, i) => i !== idx) });
    setEditIdx(null);
  };

  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance={data.people_travelling.length > 0}
    >
      <div className="space-y-4">
        {data.people_travelling.map((t, i) =>
          editIdx === i ? (
            <TravelerCard
              key={i}
              traveler={t}
              onSave={(updated) => updateTraveler(i, updated)}
              onRemove={() => removeTraveler(i)}
              onCancel={() => setEditIdx(null)}
            />
          ) : (
            <button
              key={i}
              type="button"
              className="glass-panel w-full rounded-2xl p-4 text-left transition-colors hover:bg-white/[0.08]"
              onClick={() => setEditIdx(i)}
            >
              <span className="font-medium text-white/90">{t.first_name} {t.last_name}</span>
              {t.email && <span className="ml-3 text-sm text-white/40">{t.email}</span>}
            </button>
          )
        )}
        {adding ? (
          <TravelerCard onSave={addTraveler} onCancel={() => setAdding(false)} />
        ) : (
          <GlassButton variant="ghost" onClick={() => setAdding(true)} className="w-full border border-dashed border-white/15">
            + Add traveler
          </GlassButton>
        )}
      </div>
    </WizardStep>
  );
}
