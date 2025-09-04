import React from 'react';
import { X, Activity, Users, Globe, CreditCard, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { getScoreClass } from '../services/mockData';

export function RuleCoveragePanel({ rule, isOpen, onClose }) {
  if (!isOpen || !rule) return null;

  const scoreClass = getScoreClass(rule.performance.backtestScore);

  // Mock detailed coverage data - in real app this would come from API
  const coverageDetails = {
    transactionCoverage: {
      total: rule.performance.coverage,
      breakdown: {
        'High Value (>$50K)': 98,
        'Cross-Border': 92,
        'Domestic Retail': 89,
        'Business Banking': 95
      }
    },
    customerCoverage: {
      total: 87,
      breakdown: {
        'Individual': 91,
        'Business': 85,
        'Corporate': 83,
        'High-Risk PEPs': 96
      }
    },
    geographicCoverage: {
      total: 94,
      regions: {
        'Domestic': 99,
        'EU/EEA': 93,
        'High-Risk Countries': 78,
        'OFAC Jurisdictions': 100
      }
    },
    operationalCoverage: {
      dailyProcessing: 99.7,
      weekendProcessing: 98.2,
      monthlyBacktest: 100
    },
    gaps: [
      { area: 'Small Value Aggregation (<$5K)', impact: 'Medium', coverage: 67 },
      { area: 'Weekend Cross-Border Wires', impact: 'Low', coverage: 34 },
      { area: 'Cryptocurrency Exchanges', impact: 'High', coverage: 12 }
    ]
  };

  const CoverageBar = ({ label, percentage, className = '' }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${className || 'bg-blue-500'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  const MetricCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{rule.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{rule.category}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-2 py-1 rounded text-xs font-medium score-${scoreClass}`}>
                  {rule.performance.backtestScore}% Performance
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {rule.status}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 p-1 rounded hover:bg-gray-200 transition-colors"
              aria-label="Close coverage panel"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Key Metrics */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Performance Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard 
                  icon={TrendingUp}
                  title="Monthly Alerts"
                  value={rule.performance.alertsPerMonth.toLocaleString()}
                  subtitle="Current volume"
                  color="blue"
                />
                <MetricCard 
                  icon={CheckCircle}
                  title="True Positive"
                  value={`${rule.performance.truePositiveRate}%`}
                  subtitle="Accuracy rate"
                  color="green"
                />
              </div>
            </section>

            {/* Transaction Coverage */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Transaction Coverage
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">{coverageDetails.transactionCoverage.total}%</span>
                  <p className="text-sm text-gray-600">Overall Coverage</p>
                </div>
                {Object.entries(coverageDetails.transactionCoverage.breakdown).map(([category, percentage]) => (
                  <CoverageBar 
                    key={category}
                    label={category}
                    percentage={percentage}
                    className={percentage >= 95 ? 'bg-green-500' : percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'}
                  />
                ))}
              </div>
            </section>

            {/* Customer Coverage */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Customer Segments
              </h3>
              <div className="space-y-3">
                {Object.entries(coverageDetails.customerCoverage.breakdown).map(([segment, percentage]) => (
                  <CoverageBar 
                    key={segment}
                    label={segment}
                    percentage={percentage}
                    className={percentage >= 90 ? 'bg-green-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}
                  />
                ))}
              </div>
            </section>

            {/* Geographic Coverage */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Geographic Coverage
              </h3>
              <div className="space-y-3">
                {Object.entries(coverageDetails.geographicCoverage.regions).map(([region, percentage]) => (
                  <CoverageBar 
                    key={region}
                    label={region}
                    percentage={percentage}
                    className={percentage >= 95 ? 'bg-green-500' : percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'}
                  />
                ))}
              </div>
            </section>

            {/* Operational Coverage */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Processing Coverage
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{coverageDetails.operationalCoverage.dailyProcessing}%</p>
                  <p className="text-xs text-gray-600">Daily Processing</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{coverageDetails.operationalCoverage.weekendProcessing}%</p>
                  <p className="text-xs text-gray-600">Weekend Processing</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{coverageDetails.operationalCoverage.monthlyBacktest}%</p>
                  <p className="text-xs text-gray-600">Monthly Backtest</p>
                </div>
              </div>
            </section>

            {/* Coverage Gaps */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Coverage Gaps
              </h3>
              <div className="space-y-3">
                {coverageDetails.gaps.map((gap, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{gap.area}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        gap.impact === 'High' ? 'bg-red-100 text-red-800' :
                        gap.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {gap.impact} Impact
                      </span>
                    </div>
                    <CoverageBar 
                      label="Current Coverage"
                      percentage={gap.coverage}
                      className={gap.coverage >= 70 ? 'bg-yellow-500' : 'bg-red-500'}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Rule Details */}
            <section className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Rule Configuration</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="text-gray-700 mb-2"><strong>Description:</strong> {rule.description}</p>
                <p className="text-gray-700 mb-2"><strong>Last Backtest:</strong> {new Date(rule.performance.lastBacktest).toLocaleDateString()}</p>
                <p className="text-gray-700"><strong>Linked Clauses:</strong> {rule.linkedClauses.length} regulatory requirements</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}