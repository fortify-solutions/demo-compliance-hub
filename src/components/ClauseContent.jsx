import React from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { getScoreClass, getRuleById } from '../services/mockData';

export function ClauseContent({ document, clauses, selectedClause, onClauseSelect, onRuleSelect }) {
  if (!document) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">Select a regulatory document</p>
          <p className="text-sm">Choose from the document tree to view compliance details</p>
        </div>
      </div>
    );
  }

  // Show clause list view
  if (!selectedClause) {
    return (
      <div className="h-full">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{document.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Jurisdiction: {document.jurisdiction}</span>
            <span>•</span>
            <span>Last Updated: {new Date(document.lastUpdated).toLocaleDateString()}</span>
            <span>•</span>
            <span>{clauses.length} clauses shown</span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Overall Document Score:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold score-${getScoreClass(document.aggregateScore)}`}>
              {document.aggregateScore}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {clauses.map(clause => {
              const scoreClass = getScoreClass(clause.score);
              const riskIcon = clause.metadata.riskLevel === 'critical' ? XCircle :
                              clause.metadata.riskLevel === 'high' ? AlertTriangle :
                              clause.metadata.riskLevel === 'medium' ? Clock : CheckCircle;
              const RiskIcon = riskIcon;

              return (
                <div
                  key={clause.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md clause-score-${scoreClass}`}
                  onClick={() => onClauseSelect(clause)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <RiskIcon className={`w-5 h-5 mt-0.5 ${
                        clause.metadata.riskLevel === 'critical' ? 'text-red-500' :
                        clause.metadata.riskLevel === 'high' ? 'text-orange-500' :
                        clause.metadata.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{clause.reference}</h3>
                        <h4 className="text-lg font-medium text-gray-800 mt-1">{clause.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold score-${scoreClass}`}>
                        {clause.score}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {clause.text}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {clause.metadata.jurisdiction.map(jurisdiction => (
                        <span key={jurisdiction} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {jurisdiction}
                        </span>
                      ))}
                      {clause.metadata.productType.slice(0, 2).map(type => (
                        <span key={type} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {type.replace('-', ' ')}
                        </span>
                      ))}
                      {clause.metadata.productType.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{clause.metadata.productType.length - 2} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{clause.linkedRules.length} rules</span>
                      <span>{clause.evidence.length} evidence items</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {clauses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No clauses match current filters</p>
              <p className="text-sm">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show detailed clause view
  const scoreClass = getScoreClass(selectedClause.score);
  const linkedRules = selectedClause.linkedRules.map(ruleId => getRuleById(ruleId)).filter(Boolean);

  return (
    <div className="h-full overflow-y-auto">
      {/* Back Navigation */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => onClauseSelect(null)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to {document.title}</span>
        </button>
      </div>

      <div className="p-6">
        {/* Clause Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedClause.reference}</h1>
              <h2 className="text-xl font-semibold text-gray-800">{selectedClause.title}</h2>
            </div>
            <div className={`px-4 py-2 rounded-lg text-lg font-bold score-${scoreClass}`}>
              {selectedClause.score}
            </div>
          </div>

          {/* Metadata Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Risk Level: {selectedClause.metadata.riskLevel.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Last Reviewed: {new Date(selectedClause.metadata.lastReviewed).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Clause Text */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Requirement</h3>
          <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">{selectedClause.text}</p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Jurisdictions</h4>
            <div className="space-y-1">
              {selectedClause.metadata.jurisdiction.map(jurisdiction => (
                <span key={jurisdiction} className="block px-2 py-1 bg-blue-50 text-blue-800 rounded text-sm">
                  {jurisdiction}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Product Types</h4>
            <div className="space-y-1">
              {selectedClause.metadata.productType.map(type => (
                <span key={type} className="block px-2 py-1 bg-green-50 text-green-800 rounded text-sm">
                  {type.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Types</h4>
            <div className="space-y-1">
              {selectedClause.metadata.customerType.map(type => (
                <span key={type} className="block px-2 py-1 bg-purple-50 text-purple-800 rounded text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Linked Rules */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Monitoring Rules ({linkedRules.length})</h3>
          <div className="space-y-3">
            {linkedRules.map(rule => {
              const performanceScore = rule.performance.backtestScore;
              const performanceClass = getScoreClass(performanceScore);
              
              return (
                <div 
                  key={rule.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer hover:bg-gray-50"
                  onClick={() => onRuleSelect?.(rule)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRuleSelect?.(rule);
                    }
                  }}
                  aria-label={`View coverage details for ${rule.name}`}
                >
                  <div className="mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-500">Monthly Alerts</span>
                      <div className="font-medium">{rule.performance.alertsPerMonth.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">True Positive Rate</span>
                      <div className="font-medium">{rule.performance.truePositiveRate}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Alerts Investigated</span>
                      <div className="font-medium">{rule.performance.alertsInvestigated}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance Score</span>
                      <span>{performanceScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full score-${performanceClass}`} 
                        style={{ width: `${(performanceScore / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Items */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Evidence ({selectedClause.evidence.length})</h3>
          <div className="space-y-3">
            {selectedClause.evidence.map(evidence => (
              <div key={evidence.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{evidence.description}</h4>
                    <p className="text-sm text-gray-600 capitalize">{evidence.type.replace('-', ' ')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    evidence.quality === 'excellent' ? 'bg-green-100 text-green-800' :
                    evidence.quality === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {evidence.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}