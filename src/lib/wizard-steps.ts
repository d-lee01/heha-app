import type { TripData } from "@/types/trip";

export interface StepOption {
  value: string;
  label: string;
  icon: string;
}

export interface WizardStepDef {
  id: string;
  question: string;
  hint?: string;
  type: "selection" | "text" | "dates" | "travelers" | "locations" | "flights" | "preferences" | "textarea" | "review";
  skippable: boolean;
  options?: StepOption[];
}

export const WIZARD_STEPS: WizardStepDef[] = [
  {
    id: "reason",
    question: "What kind of trip is this?",
    hint: "Pick the one that fits best",
    type: "selection",
    skippable: false,
    options: [
      { value: "Holiday", label: "Holiday", icon: "🏖" },
      { value: "Business", label: "Business", icon: "💼" },
      { value: "Honeymoon", label: "Honeymoon", icon: "💍" },
      { value: "Family", label: "Family", icon: "👨‍👩‍👧‍👦" },
      { value: "Adventure", label: "Adventure", icon: "🏔" },
      { value: "Other", label: "Other", icon: "✨" },
    ],
  },
  {
    id: "name",
    question: "Give your trip a name",
    hint: "Something memorable — you can change it later",
    type: "text",
    skippable: false,
  },
  {
    id: "travel-mode",
    question: "How are you getting there?",
    hint: "Select your main mode of transport",
    type: "selection",
    skippable: false,
    options: [
      { value: "Flying", label: "Flying", icon: "✈" },
      { value: "Driving", label: "Driving", icon: "🚗" },
      { value: "Train", label: "Train", icon: "🚄" },
      { value: "Cruise", label: "Cruise", icon: "🚢" },
      { value: "Mixed", label: "Mixed", icon: "🗺" },
    ],
  },
  {
    id: "dates",
    question: "When are you going?",
    hint: "Add notes if your dates are flexible",
    type: "dates",
    skippable: false,
  },
  {
    id: "travelers",
    question: "Who's coming along?",
    hint: "Add everyone travelling",
    type: "travelers",
    skippable: false,
  },
  {
    id: "locations",
    question: "Where from and where to?",
    hint: "We'll use this to find the best routes",
    type: "locations",
    skippable: false,
  },
  {
    id: "flights",
    question: "Got any flights booked?",
    hint: "Skip this if you haven't booked yet",
    type: "flights",
    skippable: true,
  },
  {
    id: "preferences",
    question: "Anything else you need?",
    hint: "We can arrange these for you",
    type: "preferences",
    skippable: true,
  },
  {
    id: "anything-else",
    question: "Anything else we should know?",
    hint: "Special requests, dietary needs, celebrations...",
    type: "textarea",
    skippable: true,
  },
  {
    id: "review",
    question: "Looking good. Ready to go?",
    hint: "Review your trip details below",
    type: "review",
    skippable: false,
  },
];

export function validateStep(stepId: string, data: TripData): boolean {
  switch (stepId) {
    case "reason":
      return data.reason.length > 0;
    case "name":
      return data.name.trim().length > 0;
    case "travel-mode":
      return data.how_we_are_travelling.length > 0;
    case "dates":
      return data.dates.start_date.length > 0 && data.dates.end_date.length > 0;
    case "travelers":
      return data.people_travelling.length > 0;
    case "locations":
      return (
        data.journey_locations.travelling_from.trim().length > 0 &&
        data.journey_locations.travelling_to.trim().length > 0
      );
    case "flights":
      return true; // skippable
    case "preferences":
      return true; // skippable
    case "anything-else":
      return true; // skippable
    case "review":
      return true;
    default:
      return false;
  }
}
