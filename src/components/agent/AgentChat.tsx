"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { TripData } from "@/types/trip";
import { getAgentStep, getAgentFollowUp, isAgentConversationComplete } from "@/lib/dummy-agent";
import AgentMessage from "./AgentMessage";
import AgentThinking from "./AgentThinking";
import GlassButton from "@/components/GlassButton";

interface Message {
  role: "user" | "agent";
  text: string;
}

interface AgentChatProps {
  tripData: TripData;
  onTripDataChange: (data: TripData) => void;
  onComplete: () => void;
}

export default function AgentChat({ tripData, onTripDataChange, onComplete }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const step = getAgentStep(tripData);
    return [{ role: "agent" as const, text: step.agentMessage }];
  });
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = useCallback(() => {
    if (!input.trim() || thinking) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setThinking(true);

    const currentStep = getAgentStep(tripData);
    const updatedData = currentStep.extractField(userText, tripData);
    onTripDataChange(updatedData);

    setTimeout(() => {
      const followUp = getAgentFollowUp(currentStep.id, userText);
      const nextStep = getAgentStep(updatedData);

      const newMessages: Message[] = [{ role: "agent", text: followUp }];

      if (nextStep.id !== currentStep.id && nextStep.id !== "complete") {
        newMessages.push({ role: "agent", text: nextStep.agentMessage });
      } else if (nextStep.id === "complete") {
        newMessages.push({ role: "agent", text: nextStep.agentMessage });
      }

      setMessages((prev) => [...prev, ...newMessages]);
      setThinking(false);
    }, 1000);
  }, [input, thinking, tripData, onTripDataChange]);

  const done = isAgentConversationComplete(tripData);

  return (
    <div className="flex flex-col" style={{ minHeight: "60vh" }}>
      <div className="flex-1 space-y-3 mb-6 overflow-y-auto">
        {messages.map((msg, i) => (
          <AgentMessage key={i} role={msg.role} text={msg.text} />
        ))}
        {thinking && <AgentThinking />}
        <div ref={bottomRef} />
      </div>

      {done ? (
        <GlassButton variant="coral" className="w-full" onClick={onComplete}>
          Plan My Trip
        </GlassButton>
      ) : (
        <div className="flex gap-3">
          <input
            type="text"
            className="glass-input flex-1"
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <GlassButton variant="blue" onClick={send} disabled={!input.trim() || thinking}>
            Send
          </GlassButton>
        </div>
      )}
    </div>
  );
}
