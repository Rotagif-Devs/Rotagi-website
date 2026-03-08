import { ReactNode } from "react";

export interface Program {
  id: string;
  name: string;
  ages: string;
  description: string;
  image: string;
  accent: string;
  learnMoreUrl: string;
  extendedDescription?: ReactNode; 
  slug?: string;               
}