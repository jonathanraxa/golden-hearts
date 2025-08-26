export interface OpportunityFormData {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  maxVolunteers: string;
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
}
