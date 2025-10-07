// Centralized Application State Management
// Custom hooks for managing app-wide state with proper separation of concerns

import { useState, useCallback, useEffect } from 'react';
import { documentService, riskCalibrationService } from '../services/data';

// Document and Clause Selection Hook
export function useDocumentSelection() {
  const [selectedDocument, setSelectedDocument] = useState(() => {
    // Get first visible document on initialization
    const visibleDocs = documentService.getAllDocuments();
    return visibleDocs.length > 0 ? visibleDocs[0] : null;
  });
  const [selectedClause, setSelectedClause] = useState(null);

  const handleDocumentSelect = useCallback((document) => {
    setSelectedDocument(document);
    setSelectedClause(null); // Reset clause when changing documents
  }, []);

  const handleClauseSelect = useCallback((clause) => {
    setSelectedClause(clause);
  }, []);

  return {
    selectedDocument,
    selectedClause,
    handleDocumentSelect,
    handleClauseSelect
  };
}

// Filter State Hook
export function useFilterState() {
  const [filters, setFilters] = useState({
    jurisdiction: '',
    productType: '',
    customerType: '',
    searchTerm: ''
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      jurisdiction: '',
      productType: '',
      customerType: '',
      searchTerm: ''
    });
  }, []);

  return {
    filters,
    handleFilterChange,
    resetFilters
  };
}

// Rule Analysis Hook
export function useRuleAnalysis() {
  const [selectedRule, setSelectedRule] = useState(null);
  const [showRuleCoveragePanel, setShowRuleCoveragePanel] = useState(false);

  const handleRuleSelect = useCallback((rule) => {
    setSelectedRule(rule);
    setShowRuleCoveragePanel(true);
  }, []);

  const handleRulePanelClose = useCallback(() => {
    setShowRuleCoveragePanel(false);
    setSelectedRule(null);
  }, []);

  return {
    selectedRule,
    showRuleCoveragePanel,
    handleRuleSelect,
    handleRulePanelClose
  };
}

// Modal State Hook
export function useModalState() {
  const [showCapacityModal, setShowCapacityModal] = useState(false);

  const openCapacityModal = useCallback(() => {
    setShowCapacityModal(true);
  }, []);

  const closeCapacityModal = useCallback(() => {
    setShowCapacityModal(false);
  }, []);

  return {
    showCapacityModal,
    openCapacityModal,
    closeCapacityModal
  };
}

// Layout State Hook
export function useLayoutState() {
  const [collapsedPanels, setCollapsedPanels] = useState(new Set());

  const togglePanelCollapse = useCallback((panelId) => {
    setCollapsedPanels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(panelId)) {
        newSet.delete(panelId);
      } else {
        newSet.add(panelId);
      }
      return newSet;
    });
  }, []);

  const isPanelCollapsed = useCallback((panelId) => {
    return collapsedPanels.has(panelId);
  }, [collapsedPanels]);

  return {
    collapsedPanels,
    togglePanelCollapse,
    isPanelCollapsed
  };
}

// Risk Calibration State Hook
export function useRiskCalibrationState() {
  const [calibrationData, setCalibrationData] = useState(
    () => riskCalibrationService.getAllCalibrationData()
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Subscribe to calibration changes
  useEffect(() => {
    const unsubscribe = riskCalibrationService.addListener(({ segment, changes }) => {
      // Refresh calibration data when changes occur
      setCalibrationData(riskCalibrationService.getAllCalibrationData());
    });

    return unsubscribe;
  }, []);

  const updateSegmentCalibration = useCallback(async (segment, updates) => {
    setIsUpdating(true);
    try {
      riskCalibrationService.updateSegmentCalibration(segment, updates);
      // Data will be updated via listener
    } catch (error) {
      console.error('Failed to update risk calibration:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const resetToDefaults = useCallback(async () => {
    setIsUpdating(true);
    try {
      riskCalibrationService.resetToDefaults();
      // Data will be updated via listener
    } catch (error) {
      console.error('Failed to reset risk calibration:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const getSummaryStats = useCallback(() => {
    return riskCalibrationService.getSummaryStats();
  }, [calibrationData]);

  return {
    calibrationData,
    isUpdating,
    updateSegmentCalibration,
    resetToDefaults,
    getSummaryStats
  };
}

// Combined App State Hook
export function useAppState() {
  const documentSelection = useDocumentSelection();
  const filterState = useFilterState();
  const ruleAnalysis = useRuleAnalysis();
  const modalState = useModalState();
  const layoutState = useLayoutState();
  const riskCalibrationState = useRiskCalibrationState();

  return {
    ...documentSelection,
    ...filterState,
    ...ruleAnalysis,
    ...modalState,
    ...layoutState,
    ...riskCalibrationState
  };
}