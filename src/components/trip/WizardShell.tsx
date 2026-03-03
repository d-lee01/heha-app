"use client";

import { useReducer, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { TripData } from "@/types/trip";
import { emptyTripData } from "@/types/trip";
import { WIZARD_STEPS } from "@/lib/wizard-steps";
import type { WizardMode } from "./ModeSelector";
import ModeSelector from "./ModeSelector";
import ProgressBar from "./ProgressBar";
import StepTransition from "./StepTransition";
import StepReason from "./steps/StepReason";
import StepName from "./steps/StepName";
import StepTravelMode from "./steps/StepTravelMode";
import StepDates from "./steps/StepDates";
import StepTravelers from "./steps/StepTravelers";
import StepLocations from "./steps/StepLocations";
import StepFlights from "./steps/StepFlights";
import StepPreferences from "./steps/StepPreferences";
import StepAnythingElse from "./steps/StepAnythingElse";
import StepReview from "./steps/StepReview";
import AgentChat from "@/components/agent/AgentChat";
import VoiceMode from "@/components/voice/VoiceMode";

interface WizardState {
  mode: WizardMode;
  currentStep: number;
  direction: "forward" | "backward";
  tripData: TripData;
}

type WizardAction =
  | { type: "SET_MODE"; mode: WizardMode }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "UPDATE_DATA"; data: TripData };

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, WIZARD_STEPS.length - 1),
        direction: "forward",
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        direction: "backward",
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.step,
        direction: action.step > state.currentStep ? "forward" : "backward",
      };
    case "UPDATE_DATA":
      return { ...state, tripData: action.data };
    default:
      return state;
  }
}

export default function WizardShell() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    mode: "guided",
    currentStep: 0,
    direction: "forward" as const,
    tripData: emptyTripData,
  });

  const { mode, currentStep, direction, tripData } = state;

  const onUpdate = useCallback(
    (data: TripData) => dispatch({ type: "UPDATE_DATA", data }),
    []
  );
  const onNext = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const onBack = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const goTo = useCallback(
    (step: number) => dispatch({ type: "GO_TO_STEP", step }),
    []
  );

  const handleSubmit = useCallback(() => {
    sessionStorage.setItem("heha-trip-data", JSON.stringify(tripData));
    router.push("/trip/generated");
  }, [tripData, router]);

  const handleSkip = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);

  const stepId = WIZARD_STEPS[currentStep].id;

  const renderStep = () => {
    switch (stepId) {
      case "reason":
        return <StepReason data={tripData} onUpdate={onUpdate} onNext={onNext} />;
      case "name":
        return <StepName data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} />;
      case "travel-mode":
        return <StepTravelMode data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} />;
      case "dates":
        return <StepDates data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} />;
      case "travelers":
        return <StepTravelers data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} />;
      case "locations":
        return <StepLocations data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} />;
      case "flights":
        return <StepFlights data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} onSkip={handleSkip} />;
      case "preferences":
        return <StepPreferences data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} onSkip={handleSkip} />;
      case "anything-else":
        return <StepAnythingElse data={tripData} onUpdate={onUpdate} onNext={onNext} onBack={onBack} onSkip={handleSkip} />;
      case "review":
        return <StepReview data={tripData} onNext={handleSubmit} onBack={onBack} onEdit={goTo} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      {/* Mode selector + progress */}
      <div className="mb-8 flex flex-col items-center gap-6">
        <ModeSelector
          mode={mode}
          onChange={(m) => dispatch({ type: "SET_MODE", mode: m })}
        />
        {mode === "guided" && (
          <ProgressBar current={currentStep} total={WIZARD_STEPS.length} />
        )}
      </div>

      {/* Content */}
      {mode === "guided" && (
        <StepTransition stepKey={stepId} direction={direction}>
          {renderStep()}
        </StepTransition>
      )}

      {mode === "agent" && (
        <div className="mode-enter">
          <AgentChat
            tripData={tripData}
            onTripDataChange={onUpdate}
            onComplete={handleSubmit}
          />
        </div>
      )}

      {mode === "voice" && (
        <div className="mode-enter">
          <VoiceMode
            tripData={tripData}
            onTripDataChange={onUpdate}
            onComplete={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
