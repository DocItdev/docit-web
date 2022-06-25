import React, { createContext, useContext } from 'react';

export interface JourneyState {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}

export const JourneyContext = createContext<JourneyState>(null);

export const useJourneyContext = () => useContext(JourneyContext);
