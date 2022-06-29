import React, { ReactNode, CSSProperties, SyntheticEvent } from "react";
import { useJourneyContext } from "./context";

export interface StepProps {
  id: string;
  render: (props: {
    next: (event: SyntheticEvent) => void;
    previous: (event: SyntheticEvent) => void;
  }) => ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Step({ render, id, style, className }: StepProps) {
  const { activeStep, setActiveStep, totalSteps } = useJourneyContext();
  const next = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const previous = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={id}
      style={{ width: "100%", height: "100%", style, className }}
    >
      {render({ next, previous })}
    </div>
  );
}
