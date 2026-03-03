"use client";

import { useState } from "react";
import type { Traveler } from "@/types/trip";
import GlassInput from "@/components/GlassInput";
import GlassButton from "@/components/GlassButton";

interface TravelerCardProps {
  traveler?: Traveler;
  onSave: (traveler: Traveler) => void;
  onRemove?: () => void;
  onCancel?: () => void;
}

const emptyTraveler: Traveler = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
};

export default function TravelerCard({ traveler, onSave, onRemove, onCancel }: TravelerCardProps) {
  const [form, setForm] = useState<Traveler>(traveler || emptyTraveler);

  const set = (key: keyof Traveler) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const valid = form.first_name.trim().length > 0 && form.last_name.trim().length > 0;

  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="First name" placeholder="Alex" value={form.first_name} onChange={set("first_name")} />
        <GlassInput label="Last name" placeholder="Morgan" value={form.last_name} onChange={set("last_name")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="Date of birth" type="date" value={form.dob} onChange={set("dob")} />
        <GlassInput label="Gender" placeholder="e.g. Male" value={form.gender} onChange={set("gender")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <GlassInput label="Email" type="email" placeholder="alex@example.com" value={form.email} onChange={set("email")} />
        <GlassInput label="Phone" placeholder="+44 7700 900123" value={form.phone} onChange={set("phone")} />
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
