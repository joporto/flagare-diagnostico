import { useState, useCallback } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Step1Company from './components/Step1Company';
import Step2Challenges from './components/Step2Challenges';
import Step3Maturity from './components/Step3Maturity';
import Step4Priorities from './components/Step4Priorities';
import Step5Results from './components/Step5Results';
import SavedSessions from './components/SavedSessions';
import { useWizard } from './hooks/useWizard';
import { saveDiagnostic, generateId } from './utils/storage';
import { calculateOverallScore } from './utils/scoring';

export default function App() {
  const wizard = useWizard();
  const [showSaved, setShowSaved] = useState(false);

  const maturityPercent = Math.round(
    (wizard.maturity.dataQuality + wizard.maturity.teamReadiness +
     wizard.maturity.infrastructure + wizard.maturity.strategy) / 4 * 20
  );

  const handleSaveSession = useCallback(() => {
    saveDiagnostic({
      id: generateId(),
      timestamp: new Date().toISOString(),
      companyInfo: wizard.companyInfo,
      challenges: wizard.challenges,
      maturity: wizard.maturity,
      priorities: wizard.priorities,
      contact: wizard.contact,
      overallScore: calculateOverallScore(wizard.maturity),
    });
  }, [wizard.companyInfo, wizard.challenges, wizard.maturity, wizard.priorities, wizard.contact]);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const renderStep = () => {
    switch (wizard.currentStep) {
      case 1:
        return <Step1Company data={wizard.companyInfo} onChange={wizard.setCompanyInfo} onNext={() => wizard.goStep(2)} />;
      case 2:
        return <Step2Challenges selected={wizard.challenges} onToggle={wizard.toggleChallenge} onPrev={() => wizard.goStep(1)} onNext={() => wizard.goStep(3)} />;
      case 3:
        return <Step3Maturity data={wizard.maturity} onChange={wizard.setMaturity} onPrev={() => wizard.goStep(2)} onNext={() => wizard.goStep(4)} />;
      case 4:
        return <Step4Priorities data={wizard.priorities} onToggle={wizard.togglePriority} onChange={wizard.setPriorities} onPrev={() => wizard.goStep(3)} onGenerate={() => wizard.goStep(5)} />;
      case 5:
        return <Step5Results companyInfo={wizard.companyInfo} challenges={wizard.challenges} maturity={wizard.maturity} priorities={wizard.priorities.areas} contact={wizard.contact} onContactChange={wizard.setContact} onSaveSession={handleSaveSession} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <>
      <TopBar />
      <div className="topbar-actions">
        <button className="btn btn-s" onClick={() => setShowSaved(true)} style={{ fontSize: '12px', padding: '6px 14px' }}>
          Ver consultas guardadas
        </button>
      </div>
      <div className="app">
        <Sidebar currentStep={wizard.currentStep} challengeCount={wizard.challenges.length} maturityPercent={maturityPercent} />
        <div className="panel" id="panel">
          {renderStep()}
        </div>
      </div>
      {showSaved && <SavedSessions onClose={() => setShowSaved(false)} />}
    </>
  );
}
