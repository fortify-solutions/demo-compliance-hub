import React, { useState } from 'react';
import { Header } from './components/Header';
import { DocumentTree } from './components/DocumentTree';
import { ClauseContent } from './components/ClauseContent';
import { AlertsPanel } from './components/AlertsPanel';
import { CapacityModal } from './components/CapacityModal';
import { regulatoryDocuments, alerts, complianceMetrics } from './services/mockData';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(regulatoryDocuments[0]);
  const [selectedClause, setSelectedClause] = useState(null);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [filters, setFilters] = useState({
    jurisdiction: 'US',
    productType: '',
    customerType: '',
    searchTerm: ''
  });

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setSelectedClause(null); // Reset clause selection when changing documents
  };

  const handleClauseSelect = (clause) => {
    setSelectedClause(clause);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Filter clauses based on current filters
  const getFilteredClauses = () => {
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
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return clause.title.toLowerCase().includes(searchLower) ||
               clause.text.toLowerCase().includes(searchLower) ||
               clause.reference.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        complianceScore={complianceMetrics.overallScore}
        filters={filters}
        onFilterChange={handleFilterChange}
        onCapacityClick={() => setShowCapacityModal(true)}
      />
      
      <div className="flex pt-20" style={{height: '100vh'}}> {/* Add top padding for fixed header */}
        {/* Left Panel: Document Tree */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <DocumentTree 
            documents={regulatoryDocuments}
            selectedDocument={selectedDocument}
            onDocumentSelect={handleDocumentSelect}
            filters={filters}
          />
        </div>
        
        {/* Center Panel: Clause Content */}
        <div className="flex-1 bg-white overflow-y-auto">
          <ClauseContent 
            document={selectedDocument}
            clauses={getFilteredClauses()}
            selectedClause={selectedClause}
            onClauseSelect={handleClauseSelect}
          />
        </div>
        
        {/* Right Panel: Alerts */}
        <div className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
          <AlertsPanel 
            alerts={alerts}
            selectedClause={selectedClause}
          />
        </div>
      </div>
      
      {/* Modals */}
      {showCapacityModal && (
        <CapacityModal 
          isOpen={showCapacityModal}
          onClose={() => setShowCapacityModal(false)}
        />
      )}
    </div>
  );
}

export default App;