import React, { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { DocumentTree } from './components/DocumentTree';
import { ClauseContent } from './components/ClauseContent';
import { ComplianceInsights } from './components/ComplianceInsights';
import { RiskCalibrationOverview } from './components/RiskCalibrationOverview';
import { CapacityModal } from './components/CapacityModal';
import ErrorBoundary from './components/ErrorBoundary';
import { ScoreSafelist } from './components/ScoreSafelist';
import { useDebounce } from './hooks/useDebounce';
import { useAppState } from './hooks/useAppState';
import { documentService, alertService } from './services/data';

function App() {
  // Risk calibration overview state
  const [showRiskCalibration, setShowRiskCalibration] = useState(false);

  // Use centralized state management
  const {
    selectedDocument,
    selectedClause,
    selectedRule,
    showCapacityModal,
    showRuleCoveragePanel,
    filters,
    handleDocumentSelect,
    handleClauseSelect,
    handleFilterChange,
    handleRuleSelect,
    handleRulePanelClose,
    openCapacityModal,
    closeCapacityModal
  } = useAppState();

  const handleRiskCalibrationSelect = () => {
    setShowRiskCalibration(true);
    handleDocumentSelect(null);
    handleClauseSelect(null);
  };

  const handleBackFromRiskCalibration = () => {
    setShowRiskCalibration(false);
  };

  // Override document selection to exit risk calibration when any document is selected
  const handleDocumentSelectWithRiskCalibrationExit = (document) => {
    if (showRiskCalibration) {
      setShowRiskCalibration(false);
    }
    handleDocumentSelect(document);
  };

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  // Filter clauses using the document service - memoized for performance
  const filteredClauses = useMemo(() => {
    if (!selectedDocument) return [];

    // Use document service for filtering with debounced search
    const filterParams = {
      jurisdiction: filters.jurisdiction,
      productType: filters.productType,
      customerType: filters.customerType,
      searchTerm: debouncedSearchTerm
    };

    return selectedDocument.clauses.filter(clause => {
      // Jurisdiction filter
      if (filterParams.jurisdiction && !clause.metadata.jurisdiction.includes(filterParams.jurisdiction)) {
        return false;
      }

      // Product type filter
      if (filterParams.productType && !clause.metadata.productType.includes(filterParams.productType)) {
        return false;
      }

      // Customer type filter
      if (filterParams.customerType && !clause.metadata.customerType.includes(filterParams.customerType)) {
        return false;
      }

      // Search term filter
      if (filterParams.searchTerm) {
        const searchLower = filterParams.searchTerm.toLowerCase();
        return clause.title.toLowerCase().includes(searchLower) ||
               clause.text.toLowerCase().includes(searchLower) ||
               clause.reference.toLowerCase().includes(searchLower);
      }

      return true;
    });
  }, [selectedDocument, filters.jurisdiction, filters.productType, filters.customerType, debouncedSearchTerm]);

  return (
    <ErrorBoundary>
      <ScoreSafelist />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header
        filters={filters}
        onFilterChange={handleFilterChange}
        onCapacityClick={openCapacityModal}
        documents={documentService.getAllDocuments()}
      />
      
      <div className="flex pt-20" style={{height: '100vh'}} role="main"> {/* Add top padding for fixed header */}
        {/* Left Panel: Document Tree */}
        <nav className="w-80 bg-white border-r border-gray-200 overflow-y-auto" aria-label="Regulatory document navigation">
          <DocumentTree
            documents={documentService.getAllDocuments()}
            selectedDocument={selectedDocument}
            onDocumentSelect={handleDocumentSelectWithRiskCalibrationExit}
            onClauseSelect={handleClauseSelect}
            onRiskCalibrationSelect={handleRiskCalibrationSelect}
            filters={filters}
          />
        </nav>
        
        {/* Center Panel: Clause Content or Risk Calibration Overview */}
        <main className="flex-1 bg-white overflow-y-auto" aria-label="Clause content and details">
          {showRiskCalibration ? (
            <RiskCalibrationOverview onBack={handleBackFromRiskCalibration} />
          ) : (
            <ClauseContent
              document={selectedDocument}
              clauses={filteredClauses}
              selectedClause={selectedClause}
              onClauseSelect={handleClauseSelect}
            />
          )}
        </main>
        
        {/* Right Panel: Compliance Insights */}
        <aside className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto" aria-label="Compliance insights and risk calibration">
          <ComplianceInsights
            selectedClause={selectedClause}
          />
        </aside>
      </div>
      
      {/* Application Modals */}
      {showCapacityModal && (
        <CapacityModal
          isOpen={showCapacityModal}
          onClose={closeCapacityModal}
        />
      )}
      
      </div>
    </ErrorBoundary>
  );
}

export default App;