export interface CompanyInfo {
  company: string;
  url: string;
  industry: string;
  size: string;
  role: string;
  context: string;
}

export interface MaturityData {
  dataQuality: number;
  teamReadiness: number;
  infrastructure: number;
  strategy: number;
  experience: string;
  budget: string;
}

export interface PriorityData {
  areas: string[];
  timeline: string;
  kpi: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface DiagnosticSession {
  id: string;
  timestamp: string;
  companyInfo: CompanyInfo;
  challenges: string[];
  maturity: MaturityData;
  priorities: PriorityData;
  contact: ContactInfo;
  overallScore: number;
}

export interface AICard {
  id: string;
  t: string;
  cat: string;
  cc: string;
  i: string;
  d: string;
  ex: string;
  tg: string[];
  ind: string[];
}

export interface ScoredCard extends AICard {
  rel: number;
}

export interface Finding {
  i: string;
  t: string;
  d: string;
}

export interface MaturityLevel {
  max: number;
  label: string;
  cls: string;
  desc: string;
}
