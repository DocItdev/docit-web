import React, { useState, ReactNode, useEffect, ReactChildren, ReactChild } from "react";
import { JourneyContext } from "./context";

export interface JourneyProps {
  children: ReactNode;
  startStepId?: string;
}

export default function Journey({ children, startStepId }: JourneyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    if(startStepId) {
      const nodes = children as ReactChildren;
     
    }
  }, [startStepId])
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
