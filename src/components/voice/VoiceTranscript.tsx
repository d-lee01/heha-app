"use client";

interface VoiceTranscriptProps {
  lines: string[];
}

export default function VoiceTranscript({ lines }: VoiceTranscriptProps) {
  if (lines.length === 0) return null;
  return (
    <div className="space-y-2 mt-6">
      {lines.map((line, i) => (
        <p
          key={i}
          className="text-center text-white/60 text-sm page-enter"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
