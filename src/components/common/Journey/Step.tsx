import React, { ReactNode, CSSProperties, SyntheticEvent } from "react";
import { useJourneyContext } from "./context";

export interface StepProps {
  id: string;
  render: (props: {
    next: (event: SyntheticEvent, additionalData?: any) => void;
    previous: (event: SyntheticEvent) => void;
    data?: any
  }) => ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Step({ render, id, style, className }: StepProps) {
  const { activeStep, setActiveStep, totalSteps, data, setData } = useJourneyContext();
  const next = (event: SyntheticEvent, additionalData: any) => {
    event?.stopPropagation();
    if (activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1);
    }
    if(additionalData) {
      setData(additionalData);
    }
  };
  const previous = (event: SyntheticEvent) => {
    event?.stopPropagation();
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={id}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {render({ next, previous, data })}
    </div>
  );
}
