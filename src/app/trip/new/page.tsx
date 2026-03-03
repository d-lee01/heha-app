"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import GlassInput from "@/components/GlassInput";

export default function TripNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "",
    budget: "",
    interests: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <PageShell backHref="/" centered>
      <GlassCard shimmer className="max-w-lg mx-auto">
        <h1 className="page-enter stagger-1 gradient-text text-3xl font-bold text-center mb-2">
          Plan a Trip
        </h1>
        <p className="page-enter stagger-2 text-center text-sm text-white/50 mb-8">
          Tell us where you want to go and we&rsquo;ll handle the rest.
        </p>

        <div className="space-y-5">
          <div className="page-enter stagger-2">
            <GlassInput
              label="Destination"
              placeholder="e.g. Tokyo, Japan"
              value={form.destination}
              onChange={set("destination")}
            />
          </div>

          <div className="page-enter stagger-3 grid grid-cols-2 gap-4">
            <GlassInput
              label="Start date"
              type="date"
              value={form.startDate}
              onChange={set("startDate")}
            />
            <GlassInput
              label="End date"
              type="date"
              value={form.endDate}
              onChange={set("endDate")}
            />
          </div>

          <div className="page-enter stagger-4">
            <GlassInput
              label="Travelers"
              type="number"
              placeholder="2"
              value={form.travelers}
              onChange={set("travelers")}
            />
          </div>

          <div className="page-enter stagger-5">
            <GlassInput
              label="Budget"
              placeholder="e.g. $3,000"
              value={form.budget}
              onChange={set("budget")}
            />
          </div>

          <div className="page-enter stagger-5">
            <GlassInput
              label="Interests"
              placeholder="food, temples, nightlife"
              value={form.interests}
              onChange={set("interests")}
            />
          </div>

          <div className="page-enter stagger-6 pt-2">
            <GlassButton
              variant="coral"
              className="w-full"
              onClick={() => router.push("/trip/abc123")}
            >
              Plan My Trip
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </PageShell>
  );
}
