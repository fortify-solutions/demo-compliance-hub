import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Scale } from 'lucide-react';
import { getScoreClass } from '../services/mockData';

export function DocumentTree({ documents, selectedDocument, onDocumentSelect, onClauseSelect, filters }) {
  const [expandedDocs, setExpandedDocs] = useState(new Set([documents[0]?.id]));

  const toggleDocument = (docId) => {
    const newExpanded = new Set(expandedDocs);
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId);
    } else {
      newExpanded.add(docId);
    }
    setExpandedDocs(newExpanded);
  };

  const getFilteredDocuments = () => {
    return documents.map(doc => {
      // Filter clauses within each document
      const filteredClauses = doc.clauses.filter(clause => {
        if (filters.jurisdiction && !clause.metadata.jurisdiction.includes(filters.jurisdiction)) {
          return false;
        }
        if (filters.productType && !clause.metadata.productType.includes(filters.productType)) {
          return false;
        }
        if (filters.customerType && !clause.metadata.customerType.includes(filters.customerType)) {
          return false;
        }
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          return clause.title.toLowerCase().includes(searchLower) ||
                 clause.text.toLowerCase().includes(searchLower) ||
                 clause.reference.toLowerCase().includes(searchLower);
        }
        return true;
      });

      return {
        ...doc,
        clauses: filteredClauses,
        matchCount: filteredClauses.length
      };
    }).filter(doc => doc.matchCount > 0 || !filters.jurisdiction && !filters.productType && !filters.customerType && !filters.searchTerm);
  };

  const filteredDocuments = getFilteredDocuments();

  return (
    <div className="h-full">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
          <Scale className="w-5 h-5" />
          <span>Regulatory Framework</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {filteredDocuments.length} documents • {filteredDocuments.reduce((sum, doc) => sum + doc.matchCount, 0)} clauses
        </p>
      </div>

      <div className="p-2">
        {filteredDocuments.map(document => {
          const isExpanded = expandedDocs.has(document.id);
          const isSelected = selectedDocument?.id === document.id;
          const scoreClass = getScoreClass(document.aggregateScore);

          return (
            <div key={document.id} className="mb-2">
              {/* Document Header */}
              <div
                className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-2 border-blue-200' : 'border border-gray-200'
                }`}
                onClick={() => {
                  onDocumentSelect(document);
                  if (!isExpanded) {
                    toggleDocument(document.id);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDocumentSelect(document);
                    if (!isExpanded) {
                      toggleDocument(document.id);
                    }
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${document.title} document, compliance score ${document.aggregateScore}`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDocument(document.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${document.title} clauses`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{document.title}</h3>
                      <p className="text-xs text-gray-500">
                        {document.jurisdiction} • Updated {new Date(document.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium score-${scoreClass}`}>
                    {document.aggregateScore}
                  </div>
                </div>

                {document.matchCount !== document.clauses.length && (
                  <div className="mt-2 text-xs text-blue-600">
                    Showing {document.matchCount} of {document.clauses.length} clauses
                  </div>
                )}
              </div>

              {/* Clause List */}
              {isExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {document.clauses.map(clause => {
                    const clauseScoreClass = getScoreClass(clause.score);
                    return (
                      <div
                        key={clause.id}
                        className={`p-2 rounded text-xs hover:bg-gray-50 cursor-pointer clause-score-${clauseScoreClass}`}
                        onClick={() => {
                          onDocumentSelect(document);
                          onClauseSelect(clause);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onDocumentSelect(document);
                            onClauseSelect(clause);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`View clause ${clause.reference}: ${clause.title}`}
                      >
                        <div className="font-medium text-gray-800">{clause.reference}</div>
                        <div className="text-gray-600 mt-1">{clause.title}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex flex-wrap gap-1">
                            {clause.metadata.productType.slice(0, 2).map(type => (
                              <span key={type} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                {type.replace('-', ' ')}
                              </span>
                            ))}
                            {clause.metadata.productType.length > 2 && (
                              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                +{clause.metadata.productType.length - 2}
                              </span>
                            )}
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium score-${clauseScoreClass}`}>
                            {clause.score}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No documents match current filters</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}