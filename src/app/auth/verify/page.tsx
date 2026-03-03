"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import OtpInput from "@/components/OtpInput";

export default function AuthVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  return (
    <PageShell backHref="/auth/entry" centered>
      <GlassCard shimmer className="max-w-md mx-auto text-center">
        <h1 className="page-enter stagger-1 gradient-text text-3xl font-bold mb-2">
          Check your email
        </h1>
        <p className="page-enter stagger-2 text-sm text-white/50 mb-8">
          We sent a 6-digit code to your inbox.
        </p>

        <div className="page-enter stagger-3 mb-8">
          <OtpInput length={6} onChange={setOtp} />
        </div>

        <div className="page-enter stagger-4 mb-4">
          <GlassButton
            variant="blue"
            className="w-full"
            onClick={() => {
              if (otp.length === 6) router.push("/trip/new");
            }}
          >
            Verify
          </GlassButton>
        </div>

        <p className="page-enter stagger-5 text-xs text-white/40">
          Didn&rsquo;t get the code?{" "}
          <button className="text-white/60 underline underline-offset-2 hover:text-white/80 transition-colors">
            Resend
          </button>
        </p>
      </GlassCard>
    </PageShell>
  );
}
