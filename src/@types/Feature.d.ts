import { SyntheticEvent } from "react";

export interface Feature {
  featureName: string;
  featureDescription: string;
  icon: string;
  onClick?: (event: SyntheticEvent) => void
}