import { useState, useCallback } from 'react';
import type { CompanyInfo, MaturityData, PriorityData, ContactInfo } from '../types';

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    company: '', url: '', industry: '', size: '', role: '', context: '',
  });

  const [challenges, setChallenges] = useState<string[]>([]);

  const [maturity, setMaturity] = useState<MaturityData>({
    dataQuality: 2, teamReadiness: 2, infrastructure: 2, strategy: 1,
    experience: '0', budget: '0',
  });

  const [priorities, setPriorities] = useState<PriorityData>({
    areas: [], timeline: '3-6', kpi: '',
  });

  const [contact, setContact] = useState<ContactInfo>({
    name: '', email: '', phone: '', message: '',
  });

  const toggleChallenge = useCallback((id: string) => {
    setChallenges(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }, []);

  const togglePriority = useCallback((id: string) => {
    setPriorities(prev => ({
      ...prev,
      areas: prev.areas.includes(id) ? prev.areas.filter(a => a !== id) : [...prev.areas, id],
    }));
  }, []);

  const goStep = useCallback((n: number) => {
    setCurrentStep(n);
  }, []);

  return {
    currentStep, goStep,
    companyInfo, setCompanyInfo,
    challenges, toggleChallenge,
    maturity, setMaturity,
    priorities, setPriorities, togglePriority,
    contact, setContact,
  };
}
