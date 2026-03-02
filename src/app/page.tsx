import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050510]">
      {/* Background gradient orbs — palette colors */}
      <div className="pointer-events-none absolute inset-0">
        {/* Coral orb — top left */}
        <div
          className="absolute left-[15%] top-[20%] h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(247,76,65,0.5) 0%, transparent 70%)",
            animation: "float-1 20s ease-in-out infinite, pulse-glow 8s ease-in-out infinite",
          }}
        />
        {/* Teal orb — top right */}
        <div
          className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(35,166,169,0.45) 0%, transparent 70%)",
            animation: "float-2 24s ease-in-out infinite, pulse-glow 10s ease-in-out infinite",
          }}
        />
        {/* Blue orb — bottom right */}
        <div
          className="absolute bottom-[15%] right-[20%] h-[350px] w-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(47,149,243,0.45) 0%, transparent 70%)",
            animation: "float-3 22s ease-in-out infinite, pulse-glow 9s ease-in-out infinite",
          }}
        />
        {/* Purple orb — bottom left */}
        <div
          className="absolute bottom-[25%] left-[10%] h-[350px] w-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(105,30,225,0.45) 0%, transparent 70%)",
            animation: "float-4 26s ease-in-out infinite, pulse-glow 11s ease-in-out infinite",
          }}
        />
        {/* Gold orb — center top */}
        <div
          className="absolute left-[40%] top-[10%] h-[300px] w-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,171,45,0.35) 0%, transparent 70%)",
            animation: "float-2 18s ease-in-out infinite reverse, pulse-glow 7s ease-in-out infinite",
          }}
        />
      </div>

      {/* Central content area */}
      <main className="relative z-10 mx-4 w-full max-w-lg">
        {/* Glass card */}
        <div className="glass-panel shimmer-border px-8 pt-8 pb-14 text-center sm:px-12">
          {/* Bird mascot — inside card, above logo */}
          <div
            className="flex justify-center -mt-2 mb-4"
            style={{
              animation: "fade-in-up 0.6s ease-out both",
            }}
          >
            <Image
              src="/heha-bird.png"
              alt="HEHA! bird mascot"
              width={500}
              height={500}
              priority
              className="w-[400px] sm:w-[500px] drop-shadow-[0_0_40px_rgba(105,30,225,0.5)]"
            />
          </div>

          {/* Logo */}
          <div
            className="flex justify-center"
            style={{
              animation: "fade-in-up 0.8s ease-out 0.2s both",
            }}
          >
            <Image
              src="/heha-logo.png"
              alt="HEHA!"
              width={220}
              height={70}
              priority
            />
          </div>

          {/* Prismatic accent line */}
          <div
            className="prismatic-line mx-auto mt-6 w-16"
            style={{
              animation:
                "fade-in 0.6s ease-out 0.5s both, prismatic 4s ease-in-out infinite",
            }}
          />

          {/* Hero heading */}
          <h1
            className="gradient-text mt-8 text-2xl font-bold leading-snug tracking-tight sm:text-3xl"
            style={{
              animation: "fade-in-up 0.8s ease-out 0.7s both",
            }}
          >
            We&rsquo;re ready to build
            <br />
            the future of trips
          </h1>

          {/* Tagline */}
          <p
            className="gradient-text-subtle mt-4 text-sm font-medium leading-relaxed sm:text-base"
            style={{
              animation: "fade-in-up 0.8s ease-out 1.0s both",
            }}
          >
            Something extraordinary is on its way.
          </p>

          {/* Coming Soon pill */}
          <div
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60"
            style={{
              animation: "fade-in-up 0.8s ease-out 1.3s both",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Coming Soon
          </div>
        </div>

      </main>
    </div>
  );
}
