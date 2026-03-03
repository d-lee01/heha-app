"use client";

import { useState } from "react";
import type { Flight } from "@/types/trip";
import GlassInput from "@/components/GlassInput";
import GlassButton from "@/components/GlassButton";

interface FlightCardProps {
  flight?: Flight;
  onSave: (flight: Flight) => void;
  onRemove?: () => void;
  onCancel?: () => void;
}

const emptyFlight: Flight = {
  airline: "",
  flight_number: "",
  departure_date: "",
  departure_time: "",
  arrival_date: "",
  arrival_time: "",
  from_airport: "",
  to_airport: "",
  direction: "outbound",
};

export default function FlightCard({ flight, onSave, onRemove, onCancel }: FlightCardProps) {
  const [form, setForm] = useState<Flight>(flight || emptyFlight);

  const set = (key: keyof Flight) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const valid = form.airline.trim().length > 0 && form.flight_number.trim().length > 0;

  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4">
      <div className="flex gap-3 mb-2">
        <button
          type="button"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${form.direction === "outbound" ? "border-blue-400/50 bg-blue-400/10 text-blue-300" : "border-white/10 text-white/40"}`}
          onClick={() => setForm((p) => ({ ...p, direction: "outbound" }))}
        >
          Outbound
        </button>
        <button
          type="button"
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${form.direction === "return" ? "border-blue-400/50 bg-blue-400/10 text-blue-300" : "border-white/10 text-white/40"}`}
          onClick={() => setForm((p) => ({ ...p, direction: "return" }))}
        >
          Return
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="Airline" placeholder="British Airways" value={form.airline} onChange={set("airline")} />
        <GlassInput label="Flight number" placeholder="BA478" value={form.flight_number} onChange={set("flight_number")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="From airport" placeholder="LHR" value={form.from_airport} onChange={set("from_airport")} />
        <GlassInput label="To airport" placeholder="BCN" value={form.to_airport} onChange={set("to_airport")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="Departure date" type="date" value={form.departure_date} onChange={set("departure_date")} />
        <GlassInput label="Departure time" type="time" value={form.departure_time} onChange={set("departure_time")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="Arrival date" type="date" value={form.arrival_date} onChange={set("arrival_date")} />
        <GlassInput label="Arrival time" type="time" value={form.arrival_time} onChange={set("arrival_time")} />
      </div>
      <div className="flex gap-2 pt-1">
        <GlassButton size="sm" variant="blue" onClick={() => valid && onSave(form)} disabled={!valid}>
          Save
        </GlassButton>
        {onCancel && (
          <GlassButton size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </GlassButton>
        )}
        {onRemove && (
          <GlassButton size="sm" variant="ghost" onClick={onRemove} className="ml-auto text-red-400">
            Remove
          </GlassButton>
        )}
      </div>
    </div>
  );
}
