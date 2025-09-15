import React from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { getRuleById } from '../services/mockData';

export function ClauseContent({ document, clauses, selectedClause, onClauseSelect }) {
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
            <span>{clauses.length} requirements shown</span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {clauses.map(clause => {
              const riskIcon = clause.metadata.riskLevel === 'critical' ? XCircle :
                              clause.metadata.riskLevel === 'high' ? AlertTriangle :
                              clause.metadata.riskLevel === 'medium' ? Clock : CheckCircle;
              const RiskIcon = riskIcon;

              return (
                <div
                  key={clause.id}
                  className="p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
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
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        {clause.linkedRules.length} rules
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
            <div className="px-4 py-2 rounded-lg text-lg font-bold bg-blue-100 text-blue-800">
              {selectedClause.linkedRules.length} Rules
            </div>
          </div>

          {/* Taxonomy Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Jurisdictions */}
            {selectedClause.metadata.jurisdiction.map(jurisdiction => (
              <span key={jurisdiction} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                {jurisdiction}
              </span>
            ))}

            {/* Product Types */}
            {selectedClause.metadata.productType.map(type => (
              <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                {type.replace('-', ' ')}
              </span>
            ))}

            {/* Customer Types */}
            {selectedClause.metadata.customerType.map(type => (
              <span key={type} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                {type}
              </span>
            ))}

            {/* Risk Level and Last Reviewed */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedClause.metadata.riskLevel === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
              selectedClause.metadata.riskLevel === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
              selectedClause.metadata.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-green-100 text-green-800 border-green-200'
            }`}>
              Risk: {selectedClause.metadata.riskLevel.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium border border-slate-200">
              Updated: {new Date(selectedClause.metadata.lastReviewed).toLocaleDateString()}
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


        {/* Linked Rules */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Monitoring Rules ({linkedRules.length})</h3>
          <div className="space-y-3">
            {linkedRules.map(rule => {
              // Calculate daily alerts from monthly alerts
              const dailyAlerts = (rule.performance.alertsPerMonth / 30).toFixed(1);

              // Calculate accuracy (true positive rate as percentage)
              const accuracy = Math.round(rule.performance.truePositiveRate * 100);

              // Generate simulated recent change percentage based on rule performance
              const baseChange = (rule.performance.truePositiveRate - 0.5) * 10; // Better performing rules tend to have smaller changes
              const recentChange = (baseChange + (Math.random() * 10 - 5)).toFixed(1); // Some randomness but performance-influenced

              return (
                <div
                  key={rule.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{rule.name}</h4>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 text-xs">Daily Alerts</span>
                      <div className="font-medium text-gray-900">{dailyAlerts}</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Accuracy</span>
                      <div className={`font-medium ${
                        accuracy >= 80 ? 'text-green-600' :
                        accuracy >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{accuracy}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Recent Change</span>
                      <div className={`font-medium ${
                        parseFloat(recentChange) > 0 ? 'text-green-600' :
                        parseFloat(recentChange) < 0 ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {parseFloat(recentChange) > 0 ? '+' : ''}{recentChange}%
                      </div>
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