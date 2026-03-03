"use client";

import type { TripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import WizardStep from "../WizardStep";

interface StepReviewProps {
  data: TripData;
  onNext: () => void;
  onBack: () => void;
  onEdit: (stepIndex: number) => void;
}

function Section({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">{title}</h3>
        <button
          type="button"
          className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="text-sm text-white/60 space-y-1">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-white/40">{label}: </span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}

export default function StepReview({ data, onNext, onBack, onEdit }: StepReviewProps) {
  const step = WIZARD_STEPS[9];
  const prefLabels = [
    data.preferences.travel_insurance && "Travel Insurance",
    data.preferences.airport_parking && "Airport Parking",
    data.preferences.airport_lounge && "Airport Lounge",
    data.preferences.car_hire && "Car Hire",
    data.preferences.airport_transfers && "Airport Transfers",
    data.preferences.extra_luggage && "Extra Luggage",
  ].filter(Boolean);

  return (
    <WizardStep
      question={step.question}
      hint={step.hint}
      onNext={onNext}
      onBack={onBack}
      canAdvance
      isLast
      nextLabel="Plan My Trip"
    >
      <div className="space-y-2">
        <Section title="Trip" onEdit={() => onEdit(0)}>
          <Field label="Name" value={data.name} />
          <Field label="Type" value={data.reason} />
          <Field label="Travel mode" value={data.how_we_are_travelling} />
        </Section>

        <Section title="Dates" onEdit={() => onEdit(3)}>
          <Field label="Start" value={data.dates.start_date} />
          <Field label="End" value={data.dates.end_date} />
          {data.dates.flexible_dates_notes && (
            <Field label="Notes" value={data.dates.flexible_dates_notes} />
          )}
        </Section>

        <Section title="Travelers" onEdit={() => onEdit(4)}>
          {data.people_travelling.length === 0 ? (
            <p className="text-white/30">No travelers added</p>
          ) : (
            data.people_travelling.map((t, i) => (
              <div key={i}>{t.first_name} {t.last_name}{t.email ? ` — ${t.email}` : ""}</div>
            ))
          )}
        </Section>

        <Section title="Journey" onEdit={() => onEdit(5)}>
          <Field label="From" value={[data.journey_locations.travelling_from, data.journey_locations.postcode_from].filter(Boolean).join(", ")} />
          <Field label="To" value={[data.journey_locations.travelling_to, data.journey_locations.postcode_to].filter(Boolean).join(", ")} />
          <Field label="Airport" value={data.journey_locations.nearest_airport} />
        </Section>

        {data.flights_if_known.length > 0 && (
          <Section title="Flights" onEdit={() => onEdit(6)}>
            {data.flights_if_known.map((f, i) => (
              <div key={i}>
                {f.airline} {f.flight_number} — {f.from_airport} → {f.to_airport} ({f.direction})
              </div>
            ))}
          </Section>
        )}

        {(prefLabels.length > 0 || data.preferences.notes) && (
          <Section title="Preferences" onEdit={() => onEdit(7)}>
            {prefLabels.length > 0 && <div>{prefLabels.join(", ")}</div>}
            {data.preferences.notes && <Field label="Notes" value={data.preferences.notes} />}
          </Section>
        )}

        {data.anything_else_we_should_know && (
          <Section title="Other" onEdit={() => onEdit(8)}>
            <p>{data.anything_else_we_should_know}</p>
          </Section>
        )}
      </div>
    </WizardStep>
  );
}
