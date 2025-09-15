// Centralized Application State Management
// Custom hooks for managing app-wide state with proper separation of concerns

import { useState, useCallback } from 'react';
import { regulatoryDocuments } from '../services/mockData';

// Document and Clause Selection Hook
export function useDocumentSelection() {
  const [selectedDocument, setSelectedDocument] = useState(regulatoryDocuments[0]);
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
    jurisdiction: 'US',
    productType: '',
    customerType: '',
    searchTerm: ''
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      jurisdiction: 'US',
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

// Combined App State Hook
export function useAppState() {
  const documentSelection = useDocumentSelection();
  const filterState = useFilterState();
  const ruleAnalysis = useRuleAnalysis();
  const modalState = useModalState();
  const layoutState = useLayoutState();

  return {
    ...documentSelection,
    ...filterState,
    ...ruleAnalysis,
    ...modalState,
    ...layoutState
  };
}