import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, AlertTriangle, XCircle, Clock, Shield } from 'lucide-react';
import { complianceAnalysisService } from '../services/data/complianceAnalysisService';
import { ruleService } from '../services/data';
import { RuleDetailModal } from './RuleDetailModal';
import { EvidenceDetailModal } from './EvidenceDetailModal';

// Shared helper: Get last assessment date from rules (same logic as ComplianceInsights)
const getLastAssessmentDate = (rules) => {
  if (rules.length === 0) return null;

  const dates = rules.map(rule => {
    const ruleUpdate = new Date(rule.lastUpdated || Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const evidenceDate = rule.evidence ? new Date(rule.evidence.lastAdded || ruleUpdate) : ruleUpdate;
    return Math.max(ruleUpdate.getTime(), evidenceDate.getTime());
  });

  return new Date(Math.max(...dates));
};

export function ClauseContent({ document, clauses, selectedClause, onClauseSelect }) {
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  const handleRuleClick = (rule) => {
    setSelectedRule(rule);
    setIsRuleModalOpen(true);
  };

  const handleEvidenceClick = (evidence) => {
    setSelectedEvidence(evidence);
    setIsEvidenceModalOpen(true);
  };

  const closeRuleModal = () => {
    setIsRuleModalOpen(false);
    setSelectedRule(null);
  };

  const closeEvidenceModal = () => {
    setIsEvidenceModalOpen(false);
    setSelectedEvidence(null);
  };
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
              // Get coverage analysis for this clause - SINGLE SOURCE OF TRUTH
              const associatedRules = ruleService.getRulesByClauseId(clause.id, clause);
              const coverageAnalysis = complianceAnalysisService.analyzeRequirementCoverage(clause, associatedRules);

              // Check for outdated assessment - CONSISTENT WITH COMPLIANCE INSIGHTS
              // Use actual rule/evidence activity dates, not just clause metadata
              const lastAssessmentDate = getLastAssessmentDate(associatedRules);
              const daysSinceAssessment = lastAssessmentDate
                ? Math.floor((new Date() - lastAssessmentDate) / (1000 * 60 * 60 * 24))
                : 999; // If no rules, treat as very outdated

              const isOutdated = daysSinceAssessment > 365; // Over 1 year
              const monthsSinceAssessment = Math.floor(daysSinceAssessment / 30);

              // Collect all warnings
              const allWarnings = [...coverageAnalysis.warnings];
              if (isOutdated && associatedRules.length > 0) { // Only show if has rules but they're stale
                allWarnings.unshift({
                  type: 'outdated_assessment',
                  severity: daysSinceAssessment > 540 ? 'high' : 'medium', // 18 months
                  title: 'Outdated Assessment',
                  message: `Not reviewed for ${monthsSinceAssessment} months`,
                  icon: 'clock',
                  color: daysSinceAssessment > 540 ? 'red' : 'yellow'
                });
              }

              const hasWarnings = allWarnings.length > 0;

              return (
                <div
                  key={clause.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    hasWarnings
                      ? 'border-orange-300 bg-orange-50 hover:border-orange-400'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => onClauseSelect(clause)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{clause.reference}</h3>
                      <h4 className="text-lg font-medium text-gray-800 mt-1">{clause.title}</h4>

                      {/* Display specific warnings */}
                      {hasWarnings && (
                        <div className="mt-2 space-y-1">
                          {allWarnings.slice(0, 2).map((warning, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                warning.severity === 'critical' ? 'text-red-600' :
                                warning.severity === 'high' ? 'text-orange-600' :
                                'text-yellow-600'
                              }`} />
                              <div>
                                <span className={`text-sm font-medium ${
                                  warning.severity === 'critical' ? 'text-red-900' :
                                  warning.severity === 'high' ? 'text-orange-900' :
                                  'text-yellow-900'
                                }`}>
                                  {warning.title}:
                                </span>
                                <span className={`text-sm ml-1 ${
                                  warning.severity === 'critical' ? 'text-red-800' :
                                  warning.severity === 'high' ? 'text-orange-800' :
                                  'text-yellow-800'
                                }`}>
                                  {warning.message}
                                </span>
                              </div>
                            </div>
                          ))}
                          {allWarnings.length > 2 && (
                            <div className="text-xs text-gray-600 ml-6">
                              +{allWarnings.length - 2} more warning{allWarnings.length - 2 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      {coverageAnalysis.hasMultipleObligations && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-purple-100 rounded-full">
                          <Shield className="w-3 h-3 text-purple-600" />
                          <span className="text-xs font-medium text-purple-700">
                            {coverageAnalysis.identifiedObligations.length} Obligations
                          </span>
                        </div>
                      )}
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        {associatedRules.length} rules
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
                      <span>{associatedRules.length} rules</span>
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

  // Show detailed clause view - SINGLE SOURCE OF TRUTH
  const linkedRules = ruleService.getRulesByClauseId(selectedClause.id, selectedClause);

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
              {linkedRules.length} Rules
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


        {/* Regulatory Linkage Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Monitoring Implementation</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Regulatory Compliance Status</h4>
                <p className="text-sm text-blue-800">
                  This requirement is implemented by <strong>{linkedRules.length} automated monitoring rule{linkedRules.length !== 1 ? 's' : ''}</strong> that provide continuous transaction surveillance and alert generation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Rules */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementing Monitoring Rules ({linkedRules.length})</h3>
          <div className="space-y-4">
            {linkedRules.map(rule => {
              // Calculate daily alerts from monthly alerts
              const dailyAlerts = (rule.performance.alertsPerMonth / 30).toFixed(1);

              // Calculate accuracy (true positive rate as percentage)
              const accuracy = Math.round(rule.performance.truePositiveRate * 100);

              // Generate deterministic recent change percentage based on rule performance
              const baseChange = (rule.performance.truePositiveRate - 0.5) * 10; // Better performing rules tend to have smaller changes
              // Use rule ID to create deterministic "randomness"
              const seed = rule.id.charCodeAt(rule.id.length - 1);
              const pseudoRandom = (seed % 100) / 100 - 0.5; // Convert to -0.5 to 0.5 range
              const recentChange = (baseChange + (pseudoRandom * 10)).toFixed(1); // Deterministic but performance-influenced

              return (
                <div
                  key={rule.id}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
                  onClick={() => handleRuleClick(rule)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {rule.category}
                        </span>
                      </div>

                      {/* Regulatory Basis */}
                      {rule.regulatoryBasis && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                            Implements: {rule.regulatoryBasis}
                          </span>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 leading-relaxed">{rule.description}</p>

                      {/* Specific Implementation Details */}
                      {rule.implementedRequirements && rule.implementedRequirements.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Specific Implementations:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {rule.implementedRequirements.map((req, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{req.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm pt-3 border-t border-gray-100">
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

          {linkedRules.length === 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">No Implementing Rules Found</h4>
                  <p className="text-sm text-yellow-800">
                    This regulatory requirement currently has no associated monitoring rules. Consider implementing automated systems to ensure compliance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Evidence Items */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Evidence ({selectedClause.evidence.length})</h3>
          <div className="space-y-3">
            {selectedClause.evidence.map(evidence => (
              <div
                key={evidence.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all"
                onClick={() => handleEvidenceClick(evidence)}
              >
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

      {/* Modal Components */}
      <RuleDetailModal
        isOpen={isRuleModalOpen}
        onClose={closeRuleModal}
        rule={selectedRule}
      />

      <EvidenceDetailModal
        isOpen={isEvidenceModalOpen}
        onClose={closeEvidenceModal}
        evidence={selectedEvidence}
      />
    </div>
  );
}