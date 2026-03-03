"use client";

interface MicButtonProps {
  listening: boolean;
  onClick: () => void;
}

export default function MicButton({ listening, onClick }: MicButtonProps) {
  return (
    <button type="button" className="mic-button" data-listening={listening} onClick={onClick}>
      {listening && <span className="mic-pulse-ring" />}
      {listening && <span className="mic-pulse-ring" style={{ animationDelay: "0.5s" }} />}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    </button>
  );
}
