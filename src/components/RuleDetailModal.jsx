import React from 'react';
import { DetailModal } from './DetailModal';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, Calendar, Activity } from 'lucide-react';

export function RuleDetailModal({ isOpen, onClose, rule }) {
  if (!rule) return null;

  // Calculate metrics for display
  const dailyAlerts = (rule.performance.alertsPerMonth / 30).toFixed(1);
  const accuracy = Math.round(rule.performance.truePositiveRate * 100);
  const falsePositiveRate = Math.round((1 - rule.performance.truePositiveRate) * 100);
  const investigationLoad = Math.round((rule.performance.alertsInvestigated / rule.performance.alertsPerMonth) * 100);

  // Calculate efficiency score
  const efficiency = (rule.performance.truePositiveRate * 100) - ((1 - rule.performance.truePositiveRate) * investigationLoad * 0.5);

  // Generate trend data (simulated)
  const trendDirection = efficiency > 70 ? 'improving' : efficiency < 40 ? 'declining' : 'stable';
  const trendIcon = trendDirection === 'improving' ? TrendingUp :
                   trendDirection === 'declining' ? TrendingDown : Activity;
  const TrendIcon = trendIcon;

  return (
    <DetailModal isOpen={isOpen} onClose={onClose} title={`Rule Details: ${rule.name}`}>
      <div className="space-y-8">
        {/* Rule Overview */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
              <p className="text-gray-900">{rule.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {rule.category}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance Metrics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Daily Alerts</p>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{dailyAlerts}</p>
              <p className="text-xs text-gray-500">{rule.performance.alertsPerMonth}/month</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Accuracy</p>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <p className={`text-2xl font-bold ${
                accuracy >= 80 ? 'text-green-600' :
                accuracy >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>{accuracy}%</p>
              <p className="text-xs text-gray-500">True Positive Rate</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">False Positives</p>
                <CheckCircle className="w-4 h-4 text-gray-400" />
              </div>
              <p className={`text-2xl font-bold ${
                falsePositiveRate <= 20 ? 'text-green-600' :
                falsePositiveRate <= 40 ? 'text-yellow-600' :
                'text-red-600'
              }`}>{falsePositiveRate}%</p>
              <p className="text-xs text-gray-500">False Positive Rate</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Investigation Load</p>
                <Activity className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{investigationLoad}%</p>
              <p className="text-xs text-gray-500">{rule.performance.alertsInvestigated} investigated</p>
            </div>
          </div>
        </div>

        {/* Rule Configuration */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Configuration</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Metadata</p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-gray-600">Jurisdiction:</span>
                  {rule.metadata.jurisdiction.map(j => (
                    <span key={j} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {j}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-gray-600">Product Type:</span>
                  {rule.metadata.productType.map(p => (
                    <span key={p} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {p.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-gray-600">Customer Type:</span>
                  {rule.metadata.customerType.map(c => (
                    <span key={c} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">Risk Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rule.metadata.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                    rule.metadata.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                    rule.metadata.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rule.metadata.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Performance Trend</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Trend</span>
                  <TrendIcon className={`w-5 h-5 ${
                    trendDirection === 'improving' ? 'text-green-500' :
                    trendDirection === 'declining' ? 'text-red-500' :
                    'text-gray-500'
                  }`} />
                </div>
                <p className={`text-lg font-semibold capitalize ${
                  trendDirection === 'improving' ? 'text-green-600' :
                  trendDirection === 'declining' ? 'text-red-600' :
                  'text-gray-600'
                }`}>{trendDirection}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on recent performance data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Information */}
        {rule.coverage && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Analysis</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(rule.coverage).map(([type, percentage]) => (
                <div key={type} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2 capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">{percentage}%</p>
                    <div className={`w-3 h-3 rounded-full ${
                      percentage >= 90 ? 'bg-green-500' :
                      percentage >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${
                        percentage >= 90 ? 'bg-green-500' :
                        percentage >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Metrics */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Backtest Performance</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 mr-2">
                  {rule.performance.backtestScore}
                </span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Last Updated</p>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-900">
                  {rule.lastUpdated ? new Date(rule.lastUpdated).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailModal>
  );
}