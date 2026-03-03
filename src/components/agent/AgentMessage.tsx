interface AgentMessageProps {
  role: "user" | "agent";
  text: string;
}

export default function AgentMessage({ role, text }: AgentMessageProps) {
  return (
    <div className={`chat-bubble chat-bubble-${role}`}>
      {text}
    </div>
  );
}
