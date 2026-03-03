"use client";

import { useEffect, useState } from "react";

interface StepTransitionProps {
  stepKey: string;
  direction: "forward" | "backward";
  children: React.ReactNode;
}

export default function StepTransition({ stepKey, direction, children }: StepTransitionProps) {
  const [animClass, setAnimClass] = useState(`step-enter-${direction}`);

  useEffect(() => {
    setAnimClass(`step-enter-${direction}`);
  }, [stepKey, direction]);

  return (
    <div key={stepKey} className={animClass}>
      {children}
    </div>
  );
}
