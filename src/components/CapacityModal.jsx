import React, { useState } from 'react';
import { X, Users, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';
import { analystCapacity } from '../services/mockData';

export function CapacityModal({ isOpen, onClose }) {
  const [selectedScenario, setSelectedScenario] = useState('current');

  if (!isOpen) return null;

  const currentCapacity = analystCapacity.currentCapacity;
  const scenarios = analystCapacity.scenarios;
  const performance = analystCapacity.performanceMetrics;

  const getSelectedCapacity = () => {
    if (selectedScenario === 'current') {
      return currentCapacity;
    }
    return scenarios[selectedScenario];
  };

  const selectedCapacity = getSelectedCapacity();
  const thresholdImprovement = selectedScenario !== 'current' 
    ? currentCapacity.investigationThreshold - selectedCapacity.investigationThreshold 
    : 0;

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
            <div className="grid grid-cols-5 gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedScenario('-2')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === '-2'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                -2 Analysts ({scenarios['-2'].staffCount})
              </button>
              <button
                onClick={() => setSelectedScenario('-1')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === '-1'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                -1 Analyst ({scenarios['-1'].staffCount})
              </button>
              <button
                onClick={() => setSelectedScenario('current')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === 'current'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Current ({analystCapacity.currentStaff})
              </button>
              <button
                onClick={() => setSelectedScenario('+1')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === '+1'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                +1 Analyst ({scenarios['+1'].staffCount})
              </button>
              <button
                onClick={() => setSelectedScenario('+2')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedScenario === '+2'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                +2 Analysts ({scenarios['+2'].staffCount})
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
                        {selectedCapacity.alertsPerDay}
                      </div>
                      <div className="text-xs text-gray-500">alerts/day</div>
                    </div>
                  </div>
                  {selectedScenario !== 'current' && (
                    <div className={`text-xs ${selectedCapacity.alertsPerDay > currentCapacity.alertsPerDay ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCapacity.alertsPerDay > currentCapacity.alertsPerDay ? '+' : ''}{selectedCapacity.alertsPerDay - currentCapacity.alertsPerDay} alerts/day change
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Investigation Threshold</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${selectedCapacity.investigationThreshold.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">minimum amount</div>
                    </div>
                  </div>
                  {selectedScenario !== 'current' && (
                    <div className={`text-xs ${thresholdImprovement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {thresholdImprovement > 0 
                        ? `$${thresholdImprovement.toLocaleString()} lower threshold (${Math.round((thresholdImprovement/currentCapacity.investigationThreshold)*100)}% improvement)`
                        : `$${Math.abs(thresholdImprovement).toLocaleString()} higher threshold (${Math.round((Math.abs(thresholdImprovement)/currentCapacity.investigationThreshold)*100)}% reduction)`
                      }
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Team Utilization</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {selectedCapacity.utilizationRate}%
                      </div>
                      <div className="text-xs text-gray-500">capacity used</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedCapacity.utilizationRate > 85 
                          ? 'bg-red-500' 
                          : selectedCapacity.utilizationRate > 75
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${selectedCapacity.utilizationRate}%` 
                      }}
                    />
                  </div>
                  {selectedScenario !== 'current' && (
                    <div className={`text-xs mt-1 ${selectedCapacity.utilizationRate < currentCapacity.utilizationRate ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCapacity.utilizationRate < currentCapacity.utilizationRate 
                        ? `${currentCapacity.utilizationRate - selectedCapacity.utilizationRate}% utilization reduction`
                        : `${selectedCapacity.utilizationRate - currentCapacity.utilizationRate}% utilization increase`
                      }
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

              {selectedScenario !== 'current' && (
                <div className="space-y-3">
                  {thresholdImprovement > 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-900">Increased Coverage</span>
                      </div>
                      <p className="text-sm text-green-800">
                        Can now investigate transactions as low as ${selectedCapacity.investigationThreshold.toLocaleString()}, 
                        capturing more suspicious cases with lower threshold.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-900">Reduced Coverage</span>
                      </div>
                      <p className="text-sm text-orange-800">
                        Higher threshold of ${selectedCapacity.investigationThreshold.toLocaleString()} means fewer cases investigated, 
                        potentially missing smaller suspicious patterns.
                      </p>
                    </div>
                  )}

                  <div className={`border rounded-lg p-4 ${
                    selectedCapacity.additionalInvestigationsPerMonth > 0 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className={`w-4 h-4 ${
                        selectedCapacity.additionalInvestigationsPerMonth > 0 
                          ? 'text-blue-600' 
                          : 'text-red-600'
                      }`} />
                      <span className={`font-medium ${
                        selectedCapacity.additionalInvestigationsPerMonth > 0 
                          ? 'text-blue-900' 
                          : 'text-red-900'
                      }`}>
                        {selectedCapacity.additionalInvestigationsPerMonth > 0 ? 'Additional' : 'Reduced'} Investigations
                      </span>
                    </div>
                    <p className={`text-sm ${
                      selectedCapacity.additionalInvestigationsPerMonth > 0 
                        ? 'text-blue-800' 
                        : 'text-red-800'
                    }`}>
                      Expected <strong>{selectedCapacity.additionalInvestigationsPerMonth > 0 ? '+' : ''}{selectedCapacity.additionalInvestigationsPerMonth} investigations per month</strong>, 
                      {selectedCapacity.additionalInvestigationsPerMonth > 0 
                        ? ' improving transaction monitoring coverage and reducing compliance risk.'
                        : ' reducing transaction monitoring coverage and increasing compliance risk.'
                      }
                    </p>
                  </div>

                  <div className={`border rounded-lg p-4 ${
                    selectedCapacity.utilizationRate <= 85 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className={`w-4 h-4 ${
                        selectedCapacity.utilizationRate <= 85 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`} />
                      <span className={`font-medium ${
                        selectedCapacity.utilizationRate <= 85 
                          ? 'text-green-900' 
                          : 'text-red-900'
                      }`}>
                        {selectedCapacity.utilizationRate <= 85 ? 'Manageable' : 'High'} Workload
                      </span>
                    </div>
                    <p className={`text-sm ${
                      selectedCapacity.utilizationRate <= 85 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      Utilization rate of {selectedCapacity.utilizationRate}% 
                      {selectedCapacity.utilizationRate <= 85 
                        ? ' provides adequate buffer for regulatory changes and alert volume spikes.'
                        : ' indicates team strain with limited flexibility for unexpected workload increases.'
                      }
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
          {selectedScenario !== 'current' && (
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-2">
                {selectedScenario.startsWith('+') ? 'Investment' : 'Cost Reduction'} Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">
                    {selectedScenario.startsWith('+') ? 'Additional Cost:' : 'Cost Savings:'}
                  </span>
                  <div className="font-medium">
                    {selectedScenario === '+1' && '~$120K annually (salary + benefits)'}
                    {selectedScenario === '+2' && '~$240K annually (salary + benefits)'}
                    {selectedScenario === '-1' && '~$120K annually savings'}
                    {selectedScenario === '-2' && '~$240K annually savings'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Threshold Impact:</span>
                  <div className="font-medium">
                    {thresholdImprovement > 0 
                      ? `Lower by ${Math.round((thresholdImprovement/currentCapacity.investigationThreshold)*100)}%`
                      : `Higher by ${Math.round((Math.abs(thresholdImprovement)/currentCapacity.investigationThreshold)*100)}%`
                    }
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Coverage Change:</span>
                  <div className="font-medium">
                    {selectedCapacity.additionalInvestigationsPerMonth > 0 ? '+' : ''}{selectedCapacity.additionalInvestigationsPerMonth} investigations/month
                  </div>
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