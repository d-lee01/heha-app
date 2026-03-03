import Image from "next/image";
import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import { LANDING_ORBS } from "@/components/OrbField";

export default function Home() {
  return (
    <PageShell orbs={LANDING_ORBS} centered>
      <GlassCard size="md" shimmer className="text-center">
        {/* Bird mascot */}
        <div className="page-enter stagger-1 -mt-2 mb-4 flex justify-center">
          <Image
            src="/heha-bird.png"
            alt="HEHA! bird mascot"
            width={400}
            height={400}
            priority
            className="w-[300px] sm:w-[400px] drop-shadow-[0_0_40px_rgba(105,30,225,0.5)]"
          />
        </div>

        {/* Logo */}
        <div className="page-enter stagger-2 flex justify-center">
          <Image
            src="/heha-logo.png"
            alt="HEHA!"
            width={220}
            height={70}
            priority
          />
        </div>

        {/* Prismatic accent line */}
        <div className="page-enter stagger-3 prismatic-line mx-auto mt-6 w-16" />

        {/* Hero heading */}
        <h1
          className="page-enter stagger-4 gradient-text mt-8 font-bold leading-snug tracking-tight"
          style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
        >
          Experience Heeha
        </h1>

        {/* CTA buttons */}
        <div className="page-enter stagger-5 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <GlassButton href="/auth/entry" variant="coral">
            I&rsquo;m Human
          </GlassButton>
          <GlassButton href="/agents/skills" variant="purple">
            I&rsquo;m an Agent
          </GlassButton>
        </div>
      </GlassCard>
    </PageShell>
  );
}
