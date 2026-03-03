import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";

export default function TripResultsPage() {
  return (
    <PageShell backHref="/trip/new">
      <GlassCard size="lg" shimmer>
        {/* Title */}
        <h1 className="page-enter stagger-1 gradient-text text-4xl font-bold mb-1">
          Tokyo Adventure
        </h1>
        <p className="page-enter stagger-2 text-sm text-white/50 mb-6">
          Mar 15 – Mar 22, 2026 &middot; Tokyo, Japan
        </p>

        {/* Prismatic divider */}
        <div className="page-enter stagger-2 prismatic-line w-full mb-6" />

        {/* Overview */}
        <div className="page-enter stagger-3 mb-8">
          <h2 className="text-lg font-semibold text-white/90 mb-3">Overview</h2>
          <p className="text-sm leading-relaxed text-white/60">
            Seven days exploring Tokyo&rsquo;s vibrant neighborhoods — from the
            serene temples of Asakusa to the neon-lit streets of Shibuya. This
            itinerary balances cultural immersion with culinary discovery,
            including a private ramen workshop and a sunrise visit to Tsukiji
            Outer Market.
          </p>
        </div>

        {/* Nested story panel */}
        <div className="page-enter stagger-4 glass-panel p-6 mb-8">
          <h3 className="text-base font-semibold text-white/85 mb-2">
            Day 1 — Arrival &amp; Shibuya
          </h3>
          <p className="text-sm leading-relaxed text-white/55">
            Land at Narita, take the Skyliner to Ueno, then subway to Shibuya.
            Check in at the hotel and explore Shibuya Crossing at dusk.
            Dinner at a hidden izakaya in Nonbei Yokocho — tiny lantern-lit
            alley with seats for six. End the night with panoramic views from
            Shibuya Sky.
          </p>
        </div>

        {/* Action buttons */}
        <div className="page-enter stagger-5 flex flex-col gap-3 sm:flex-row">
          <GlassButton variant="teal" className="flex-1">
            Share Trip
          </GlassButton>
          <GlassButton href="/trip/new" variant="purple" className="flex-1">
            Plan Another
          </GlassButton>
        </div>
      </GlassCard>
    </PageShell>
  );
}
