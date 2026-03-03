import { getSupabaseClient } from "./client";
import type { SavedMemory } from "@/types/agent";

export async function loadMemories(userId: string): Promise<SavedMemory[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("user_memories")
    .select("id, category, content, person_name")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Failed to load memories:", error.message);
    return [];
  }

  return data ?? [];
}

export async function saveMemory(
  userId: string,
  category: string,
  content: string,
  personName: string | null
): Promise<SavedMemory | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("user_memories")
    .insert({
      user_id: userId,
      category,
      content,
      person_name: personName,
    })
    .select("id, category, content, person_name")
    .single();

  if (error) {
    console.error("Failed to save memory:", error.message);
    return null;
  }

  return data;
}
