import React, { useState, ReactNode, } from "react";
import { JourneyContext } from "./context";

export interface JourneyProps {
  children: ReactNode;
  startStepId?: string;
}

export default function Journey({ children }: JourneyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState(null);
  return (
    <JourneyContext.Provider
      value={{
        activeStep,
        setActiveStep,
        totalSteps: (children as ReactNode[]).length || 0,
        data,
        setData
      }}
    >
      {children[activeStep]}
    </JourneyContext.Provider>
  );
}
