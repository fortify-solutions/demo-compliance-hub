import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Scale, Building2 } from 'lucide-react';

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

  // Separate documents by type
  const regulatoryDocuments = filteredDocuments.filter(doc => doc.type === 'regulatory');
  const internalPolicies = filteredDocuments.filter(doc => doc.type === 'internal');

  // Component to render individual documents
  const renderDocument = (document) => {
    const isExpanded = expandedDocs.has(document.id);
    const isSelected = selectedDocument?.id === document.id;

    return (
      <div key={document.id} className="mb-2 mt-2">
        {/* Document Header */}
        <div
          className={`p-3 rounded-lg cursor-pointer transition-all ${
            document.type === 'internal'
              ? `internal-policy-document ${isSelected ? 'selected' : ''}`
              : `hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-2 border-blue-200' : 'border border-gray-200'}`
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
          aria-label={`Select ${document.title} document`}
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
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${document.title} requirements`}
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
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {document.clauses.length} requirements
            </div>
          </div>

          {document.matchCount !== document.clauses.length && (
            <div className="mt-2 text-xs text-blue-600">
              Showing {document.matchCount} of {document.clauses.length} requirements
            </div>
          )}
        </div>

        {/* Clause List */}
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {document.clauses.map(clause => {
              return (
                <div
                  key={clause.id}
                  className={`p-2 rounded text-xs cursor-pointer border border-gray-200 hover:bg-gray-50 ${
                    document.type === 'internal'
                      ? 'internal-policy-clause'
                      : 'bg-white'
                  }`}
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
                  aria-label={`View requirement ${clause.reference}: ${clause.title}`}
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
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {clause.linkedRules.length} rules
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Component to render a document section
  const renderDocumentSection = (documents, title, icon, bgColor, textColor) => (
    <div className="mb-4">
      <div className={`p-3 border-b border-gray-200 ${bgColor}`}>
        <h3 className={`font-semibold flex items-center space-x-2 ${textColor}`}>
          {icon}
          <span>{title}</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {documents.length} document{documents.length !== 1 ? 's' : ''} • {documents.reduce((sum, doc) => sum + doc.matchCount, 0)} requirements
        </p>
      </div>
      <div className="px-2 pb-2">
        {documents.map(document => renderDocument(document))}
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {/* Regulatory Documents Section */}
      {regulatoryDocuments.length > 0 && renderDocumentSection(
        regulatoryDocuments,
        'Regulatory Framework',
        <Scale className="w-5 h-5" />,
        'bg-slate-50',
        'text-slate-900'
      )}

      {/* Internal Policies Section */}
      {internalPolicies.length > 0 && renderDocumentSection(
        internalPolicies,
        'Internal Policies',
        <Building2 className="w-5 h-5" />,
        'bg-emerald-50',
        'text-emerald-900'
      )}

      {/* No documents message */}
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