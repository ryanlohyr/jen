export interface FormResponseType {
  name?: string;
  email: string;
  marryDate?: string;
  whyLuna?: string;
  canInform: boolean;
}

export const supportType = ["Feature", "Bug", "Others"] as const;
export interface HelpResponseType {
  email: string;
  details: string;
  supportType: "Feature" | "Bug" | "Others";
}
