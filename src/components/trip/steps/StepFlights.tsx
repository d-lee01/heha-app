"use client";

import { useState } from "react";
import type { TripData, Flight } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";
import FlightCard from "../FlightCard";
import GlassButton from "@/components/GlassButton";

interface StepFlightsProps {
  data: TripData;
  onUpdate: (data: TripData) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function StepFlights({ data, onUpdate, onNext, onBack, onSkip }: StepFlightsProps) {
  const step = WIZARD_STEPS[6];
  const [adding, setAdding] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const addFlight = (f: Flight) => {
    onUpdate({ ...data, flights_if_known: [...data.flights_if_known, f] });
    setAdding(false);
  };

  const updateFlight = (idx: number, f: Flight) => {
    const next = [...data.flights_if_known];
    next[idx] = f;
    onUpdate({ ...data, flights_if_known: next });
    setEditIdx(null);
  };

  const removeFlight = (idx: number) => {
    onUpdate({ ...data, flights_if_known: data.flights_if_known.filter((_, i) => i !== idx) });
    setEditIdx(null);
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
      <div className="space-y-4">
        {data.flights_if_known.map((f, i) =>
          editIdx === i ? (
            <FlightCard
              key={i}
              flight={f}
              onSave={(updated) => updateFlight(i, updated)}
              onRemove={() => removeFlight(i)}
              onCancel={() => setEditIdx(null)}
            />
          ) : (
            <button
              key={i}
              type="button"
              className="glass-panel w-full rounded-2xl p-4 text-left transition-colors hover:bg-white/[0.08]"
              onClick={() => setEditIdx(i)}
            >
              <span className="font-medium text-white/90">{f.airline} {f.flight_number}</span>
              <span className="ml-3 text-sm text-white/40">{f.from_airport} → {f.to_airport}</span>
              <span className="ml-2 text-xs text-white/30 capitalize">{f.direction}</span>
            </button>
          )
        )}
        {adding ? (
          <FlightCard onSave={addFlight} onCancel={() => setAdding(false)} />
        ) : (
          <GlassButton variant="ghost" onClick={() => setAdding(true)} className="w-full border border-dashed border-white/15">
            + Add flight
          </GlassButton>
        )}
      </div>
    </WizardStep>
  );
}
