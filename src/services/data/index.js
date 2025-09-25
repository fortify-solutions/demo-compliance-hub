// Data Services Index - Centralized export for all data services
export { documentService, DocumentService } from './documentService';
export { alertService, AlertService } from './alertService';
export { ruleService, RuleService } from './ruleService';
export { riskCalibrationService, RiskCalibrationService } from './riskCalibrationService';
export { complianceAnalysisService, ComplianceAnalysisService } from './complianceAnalysisService';

// Re-export commonly used utilities from mockData for backward compatibility
export {
  validateDocumentData,
  validateAlerts,
  complianceMetrics
} from '../mockData';

// Service factory for dependency injection (future use)
export class ServiceFactory {
  constructor() {
    this.services = new Map();
  }

  register(serviceName, serviceInstance) {
    this.services.set(serviceName, serviceInstance);
  }

  get(serviceName) {
    return this.services.get(serviceName);
  }

  has(serviceName) {
    return this.services.has(serviceName);
  }

  clear() {
    this.services.clear();
  }
}

// Default service factory instance
export const serviceFactory = new ServiceFactory();

// Register default services
import { documentService } from './documentService';
import { alertService } from './alertService';
import { ruleService } from './ruleService';
import { riskCalibrationService } from './riskCalibrationService';
import { complianceAnalysisService } from './complianceAnalysisService';

serviceFactory.register('documents', documentService);
serviceFactory.register('alerts', alertService);
serviceFactory.register('rules', ruleService);
serviceFactory.register('riskCalibration', riskCalibrationService);
serviceFactory.register('complianceAnalysis', complianceAnalysisService);