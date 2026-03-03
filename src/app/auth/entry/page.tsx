import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import GlassInput from "@/components/GlassInput";

export default function AuthEntryPage() {
  return (
    <PageShell backHref="/" centered>
      <GlassCard shimmer className="max-w-md mx-auto">
        <h1 className="page-enter stagger-1 gradient-text text-3xl font-bold text-center mb-2">
          Welcome
        </h1>
        <p className="page-enter stagger-2 text-center text-sm text-white/50 mb-8">
          Sign in to start planning your next adventure.
        </p>

        <div className="page-enter stagger-3 mb-6">
          <GlassInput
            label="Email address"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="page-enter stagger-4 flex flex-col gap-3">
          <GlassButton href="/auth/verify" variant="blue" className="w-full">
            Login
          </GlassButton>
          <GlassButton href="/trip/new" variant="teal" className="w-full">
            Continue as Guest
          </GlassButton>
        </div>
      </GlassCard>
    </PageShell>
  );
}
