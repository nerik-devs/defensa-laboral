import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { initialFlowState } from '../../types/flow';
import type { FlowState } from '../../types/flow';
import ConsentStep from './steps/ConsentStep';
import WorkerDataStep from './steps/WorkerDataStep';
import EmployerDataStep from './steps/EmployerDataStep';
import ProblemTypeStep from './steps/ProblemTypeStep';
import EstimationStep from './steps/EstimationStep';
import SummaryStep from './steps/SummaryStep';
import ResultStep from './steps/ResultStep';

interface LaboralFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FlowSection = 'worker' | 'employer' | 'problem';

export type StepProps = {
  onNext: () => void;
  onBack?: () => void;
  onClose: () => void;
  /** Jump to a specific flow step by index (used to send the user back to the step that owns a field with a server-side error). */
  goToStep: (step: number) => void;
  data: FlowState;
  updateData: <K extends FlowSection>(key: K, newData: Partial<FlowState[K]>) => void;
};

/** Number of user-visible steps the progress indicator tracks (Worker → Result; consent is step 0 and has no progress bar). */
const TOTAL_STEPS = 6;

const LaboralFlowModal: React.FC<LaboralFlowModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FlowState>(initialFlowState);

  // Keep track of the highest step reached for progress bar (optional)
  
  const handleClose = () => {
    // Optionally confirm before closing if user has entered data
    onClose();
    // Reset after animation
    setTimeout(() => {
      setCurrentStep(0);
      setFormData(initialFlowState);
    }, 500);
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const handleGoToStep = (step: number) => setCurrentStep(step);

  const updateData = <K extends FlowSection>(section: K, newData: Partial<FlowState[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newData,
      },
    }));
  };

  const stepProps: StepProps = {
    onNext: handleNext,
    onBack: handleBack,
    onClose: handleClose,
    goToStep: handleGoToStep,
    data: formData,
    updateData,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ConsentStep {...stepProps} />;
      case 1:
        return <WorkerDataStep {...stepProps} />;
      case 2:
        return <EmployerDataStep {...stepProps} />;
      case 3:
        return <ProblemTypeStep {...stepProps} />;
      case 4:
        return <EstimationStep {...stepProps} />;
      case 5:
        return <SummaryStep {...stepProps} />;
      case 6:
        return <ResultStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton>
      {/* Honeypot anti-bot field: never visible to users; a non-empty value marks the submission as a bot. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="website-honeypot">Website</label>
        <input
          id="website-honeypot"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>

      {/* 
        We use motion inside steps or a wrapper here for transitions. 
        For simplicity, steps will define their own animated entry.
      */}
      {/* Progress Indicator */}
      {currentStep > 0 && currentStep <= TOTAL_STEPS && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Paso {currentStep} de {TOTAL_STEPS}</span>
            <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {renderStep()}
    </Modal>
  );
};

export default LaboralFlowModal;
