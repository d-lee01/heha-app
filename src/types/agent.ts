export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SavedMemory {
  id: string;
  category: string;
  content: string;
  person_name: string | null;
}

export interface AgentChatRequest {
  messages: ChatMessage[];
  tripData: import("./trip").TripData;
  sessionId: string;
  userId: string | null;
}

export interface AgentChatResponse {
  message: string;
  updatedTripData: import("./trip").TripData;
  memories: SavedMemory[];
  formComplete: boolean;
}
