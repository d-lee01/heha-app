import OrbField, { LANDING_ORBS } from "@/components/OrbField";
import HeroSection from "@/components/HeroSection";
import PathCard from "@/components/PathCard";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-20">
      <OrbField orbs={LANDING_ORBS} />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <HeroSection />

        {/* Path cards */}
        <div className="page-enter stagger-6 mt-16 grid w-full gap-6 sm:grid-cols-2">
          <PathCard
            href="/auth/entry"
            title="I'm Human"
            description="Plan your trip step by step"
            color="coral"
          />
          <PathCard
            href="/agents/skills"
            title="I'm an Agent"
            description="Integrate with our API"
            color="purple"
          />
        </div>
      </main>
    </div>
  );
}
