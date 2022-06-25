import React, { useState, ReactNode, ReactChildren } from "react";
import { JourneyContext } from "./context";

export interface JourneyProps {
  children: ReactNode;
}

export default function Journey({ children }: JourneyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  return (
    <JourneyContext.Provider
      value={{
        activeStep,
        setActiveStep,
        totalSteps: (children as ReactNode[]).length || 0,
      }}
    >
      {children[activeStep]}
    </JourneyContext.Provider>
  );
}
