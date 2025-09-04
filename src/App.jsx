import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { DocumentTree } from './components/DocumentTree';
import { ClauseContent } from './components/ClauseContent';
import { AlertsPanel } from './components/AlertsPanel';
import { CapacityModal } from './components/CapacityModal';
import { RuleCoveragePanel } from './components/RuleCoveragePanel';
import ErrorBoundary from './components/ErrorBoundary';
import { regulatoryDocuments, alerts, complianceMetrics } from './services/mockData';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(regulatoryDocuments[0]);
  const [selectedClause, setSelectedClause] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showRuleCoveragePanel, setShowRuleCoveragePanel] = useState(false);
  const [filters, setFilters] = useState({
    jurisdiction: 'US',
    productType: '',
    customerType: '',
    searchTerm: ''
  });

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  const handleDocumentSelect = useCallback((document) => {
    setSelectedDocument(document);
    setSelectedClause(null); // Reset clause selection when changing documents
  }, []);

  const handleClauseSelect = useCallback((clause) => {
    setSelectedClause(clause);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  const handleRuleSelect = useCallback((rule) => {
    setSelectedRule(rule);
    setShowRuleCoveragePanel(true);
  }, []);

  const handleRulePanelClose = useCallback(() => {
    setShowRuleCoveragePanel(false);
    setSelectedRule(null);
  }, []);

  // Filter clauses based on current filters - memoized for performance
  const filteredClauses = useMemo(() => {
    if (!selectedDocument) return [];
    
    return selectedDocument.clauses.filter(clause => {
      // Jurisdiction filter
      if (filters.jurisdiction && !clause.metadata.jurisdiction.includes(filters.jurisdiction)) {
        return false;
      }
      
      // Product type filter
      if (filters.productType && !clause.metadata.productType.includes(filters.productType)) {
        return false;
      }
      
      // Customer type filter
      if (filters.customerType && !clause.metadata.customerType.includes(filters.customerType)) {
        return false;
      }
      
      // Search term filter
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return clause.title.toLowerCase().includes(searchLower) ||
               clause.text.toLowerCase().includes(searchLower) ||
               clause.reference.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
  }, [selectedDocument, filters.jurisdiction, filters.productType, filters.customerType, debouncedSearchTerm]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        complianceScore={complianceMetrics.overallScore}
        filters={filters}
        onFilterChange={handleFilterChange}
        onCapacityClick={() => setShowCapacityModal(true)}
      />
      
      <div className="flex pt-20" style={{height: '100vh'}} role="main"> {/* Add top padding for fixed header */}
        {/* Left Panel: Document Tree */}
        <nav className="w-80 bg-white border-r border-gray-200 overflow-y-auto" aria-label="Regulatory document navigation">
          <DocumentTree 
            documents={regulatoryDocuments}
            selectedDocument={selectedDocument}
            onDocumentSelect={handleDocumentSelect}
            onClauseSelect={handleClauseSelect}
            filters={filters}
          />
        </nav>
        
        {/* Center Panel: Clause Content */}
        <main className="flex-1 bg-white overflow-y-auto" aria-label="Clause content and details">
          <ClauseContent 
            document={selectedDocument}
            clauses={filteredClauses}
            selectedClause={selectedClause}
            onClauseSelect={handleClauseSelect}
            onRuleSelect={handleRuleSelect}
          />
        </main>
        
        {/* Right Panel: Alerts */}
        <aside className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto" aria-label="System alerts and recommendations">
          <AlertsPanel 
            alerts={alerts}
            selectedClause={selectedClause}
          />
        </aside>
      </div>
      
      {/* Application Modals */}
      {showCapacityModal && (
        <CapacityModal 
          isOpen={showCapacityModal}
          onClose={() => setShowCapacityModal(false)}
        />
      )}
      
      {/* Rule Coverage Panel */}
      <RuleCoveragePanel 
        rule={selectedRule}
        isOpen={showRuleCoveragePanel}
        onClose={handleRulePanelClose}
      />
      </div>
    </ErrorBoundary>
  );
}

export default App;