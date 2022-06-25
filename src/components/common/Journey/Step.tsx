
import React, { ReactNode, CSSProperties } from 'react';
import Box from '@mui/material/Box';
import { useJourneyContext } from './context';

export interface StepProps {
  id: string;
  render: (next: () => void, previous: () => void) => ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Step({ render, id, style, className }: StepProps) {
  const { activeStep, setActiveStep, totalSteps } = useJourneyContext();
  const next = () => {
    if(activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const previous = () => {
    if(activeStep > 0)
    setActiveStep(activeStep - 1)
  };
  return (
    <div id={id} style={{ width: '100%', height: '100%', style, className}}>
      {render(next, previous)}
    </div>
  )
}