import React, { createContext, useContext } from 'react';

export interface JourneyState {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export const JourneyContext = createContext<JourneyState>(null);

export const useJourneyContext = () => useContext(JourneyContext);
