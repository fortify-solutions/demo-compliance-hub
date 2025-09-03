import React, { useState } from 'react';
import { X, Users, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';
import { analystCapacity } from '../services/mockData';

export function CapacityModal({ isOpen, onClose }) {
  const [selectedScenario, setSelectedScenario] = useState('current');

  if (!isOpen) return null;

  const currentCapacity = analystCapacity.currentCapacity;
  const projectedCapacity = analystCapacity.projectedCapacity.withAdditionalAnalyst;
  const performance = analystCapacity.performanceMetrics;

  const thresholdImprovement = currentCapacity.investigationThreshold - projectedCapacity.investigationThreshold;
  const additionalInvestigations = Math.round((currentCapacity.investigationThreshold - projectedCapacity.investigationThreshold) / 1000 * 2.5); // Rough estimate

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-600" />
                <span>Analyst Capacity Planning</span>
              </h2>
              <p className="text-gray-600 mt-1">Current team performance and expansion analysis</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Scenario Selector */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedScenario('current')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === 'current'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Current State ({analystCapacity.currentStaff} analysts)
              </button>
              <button
                onClick={() => setSelectedScenario('projected')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === 'projected'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                +1 Analyst ({projectedCapacity.staffCount} analysts)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current vs Projected Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Capacity Metrics</span>
              </h3>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Daily Alert Processing</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {selectedScenario === 'current' ? currentCapacity.alertsPerDay : projectedCapacity.alertsPerDay}
                      </div>
                      <div className="text-xs text-gray-500">alerts/day</div>
                    </div>
                  </div>
                  {selectedScenario === 'projected' && (
                    <div className="text-xs text-green-600">
                      +{projectedCapacity.alertsPerDay - currentCapacity.alertsPerDay} alerts/day improvement
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Investigation Threshold</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${(selectedScenario === 'current' ? currentCapacity.investigationThreshold : projectedCapacity.investigationThreshold).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">minimum amount</div>
                    </div>
                  </div>
                  {selectedScenario === 'projected' && (
                    <div className="text-xs text-green-600">
                      ${thresholdImprovement.toLocaleString()} lower threshold ({Math.round((thresholdImprovement/currentCapacity.investigationThreshold)*100)}% improvement)
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Team Utilization</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {selectedScenario === 'current' ? currentCapacity.utilizationRate : projectedCapacity.utilizationRate}%
                      </div>
                      <div className="text-xs text-gray-500">capacity used</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (selectedScenario === 'current' ? currentCapacity.utilizationRate : projectedCapacity.utilizationRate) > 85 
                          ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${selectedScenario === 'current' ? currentCapacity.utilizationRate : projectedCapacity.utilizationRate}%` 
                      }}
                    />
                  </div>
                  {selectedScenario === 'projected' && (
                    <div className="text-xs text-green-600 mt-1">
                      {currentCapacity.utilizationRate - projectedCapacity.utilizationRate}% utilization reduction
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Impact Analysis */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Impact Analysis</span>
              </h3>

              {selectedScenario === 'projected' && (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Increased Coverage</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Can now investigate transactions as low as ${projectedCapacity.investigationThreshold.toLocaleString()}, 
                      capturing an estimated <strong>{additionalInvestigations} more suspicious cases</strong> per month.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Additional Investigations</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Expected <strong>+{projectedCapacity.additionalInvestigationsPerMonth} investigations per month</strong>, 
                      improving transaction monitoring coverage and reducing compliance risk.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Reduced Alert Backlog</span>
                    </div>
                    <p className="text-sm text-yellow-800">
                      Lower utilization rate ({projectedCapacity.utilizationRate}%) provides buffer for 
                      <strong> regulatory changes and alert volume spikes</strong>.
                    </p>
                  </div>
                </div>
              )}

              {selectedScenario === 'current' && (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{performance.avgInvestigationsPerAnalyst}</div>
                        <div className="text-xs text-gray-500">Investigations per analyst/month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{performance.avgAlertsPerAnalyst}</div>
                        <div className="text-xs text-gray-500">Alerts per analyst/month</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{performance.qualityScore}%</div>
                        <div className="text-xs text-gray-500">Quality Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{performance.timelyClosureRate}%</div>
                        <div className="text-xs text-gray-500">Timely Closure Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-900">Current Constraints</span>
                    </div>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• High utilization ({currentCapacity.utilizationRate}%) limits flexibility</li>
                      <li>• ${currentCapacity.investigationThreshold.toLocaleString()}+ threshold may miss smaller suspicious patterns</li>
                      <li>• Limited capacity for regulatory changes or volume spikes</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ROI Summary */}
          {selectedScenario === 'projected' && (
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-2">Investment Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Additional Cost:</span>
                  <div className="font-medium">~$120K annually (salary + benefits)</div>
                </div>
                <div>
                  <span className="text-gray-600">Risk Reduction:</span>
                  <div className="font-medium">Lower investigation threshold by {Math.round((thresholdImprovement/currentCapacity.investigationThreshold)*100)}%</div>
                </div>
                <div>
                  <span className="text-gray-600">Coverage Improvement:</span>
                  <div className="font-medium">+{projectedCapacity.additionalInvestigationsPerMonth} investigations/month</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
              Export Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}