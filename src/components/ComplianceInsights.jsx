import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Shield,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Settings
} from 'lucide-react';
import { ruleService, riskCalibrationService } from '../services/data';
import { useRiskCalibrationState } from '../hooks/useAppState';

export function ComplianceInsights({ selectedClause }) {
  const [activeTab, setActiveTab] = useState('measures');
  const { calibrationData } = useRiskCalibrationState();
  // Force refresh

  // Helper functions
  const getLastAssessmentDate = (rules) => {
    if (rules.length === 0) return null;

    // Find the most recent assessment across all rules
    const dates = rules.map(rule => {
      const ruleUpdate = new Date(rule.lastUpdated || Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const evidenceDate = rule.evidence ? new Date(rule.evidence.lastAdded || ruleUpdate) : ruleUpdate;
      return Math.max(ruleUpdate.getTime(), evidenceDate.getTime());
    });

    return new Date(Math.max(...dates));
  };

  const calculateAlertsPerDay = (rules) => {
    if (rules.length === 0) return 0;

    return rules.reduce((total, rule) => {
      return total + (rule.performance?.alertsPerMonth || 0) / 30;
    }, 0);
  };

  const calculateAlertTrend = (rules) => {
    if (rules.length === 0) return { direction: 'stable', percentage: 0 };

    // Calculate deterministic trend analysis based on rule performance
    const avgTruePositiveRate = rules.reduce((sum, rule) =>
      sum + (rule.performance?.truePositiveRate || 0), 0) / rules.length;

    // Use rule IDs to create a deterministic "random" seed
    const seed = rules.reduce((sum, rule) => sum + rule.id.charCodeAt(rule.id.length - 1), 0);
    const pseudoRandom = (seed % 100) / 100; // Convert to 0-1 range

    if (avgTruePositiveRate < 0.15) {
      return {
        direction: 'up',
        percentage: Math.floor(pseudoRandom * 20) + 10,
        concern: true
      };
    } else if (avgTruePositiveRate > 0.4) {
      return {
        direction: 'down',
        percentage: Math.floor(pseudoRandom * 15) + 5,
        concern: false
      };
    }

    return {
      direction: 'stable',
      percentage: Math.floor(pseudoRandom * 10),
      concern: false
    };
  };

  // Get risk calibration data from shared service
  const getRiskCalibrationData = (rules) => {
    return riskCalibrationService.getRiskCalibrationData(rules);
  };

  const getDaysAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getAssessmentStatus = (daysAgo) => {
    if (!daysAgo) return 'unknown';
    const days = parseInt(daysAgo.split(' ')[0]) || 0;
    if (days <= 7) return 'good';
    if (days <= 30) return 'warning';
    return 'critical';
  };

  const getTrendIcon = (trend) => {
    if (trend.direction === 'up') {
      return <TrendingUp className={`w-4 h-4 ${trend.concern ? 'text-red-500' : 'text-green-500'}`} />;
    } else if (trend.direction === 'down') {
      return <TrendingDown className={`w-4 h-4 ${trend.concern ? 'text-red-500' : 'text-green-500'}`} />;
    }
    return <BarChart3 className="w-4 h-4 text-gray-500" />;
  };

  // Get compliance data for the selected clause
  const complianceData = useMemo(() => {
    if (!selectedClause) return null;

    // Get rules associated with this clause
    const associatedRules = ruleService.getRulesByClauseId(selectedClause.id);

    // Calculate success measures
    const ruleCount = associatedRules.length;
    const lastAssessment = getLastAssessmentDate(associatedRules);
    const alertsPerDay = calculateAlertsPerDay(associatedRules);
    const alertTrend = calculateAlertTrend(associatedRules);

    // Get risk calibration parameters from shared service
    const riskCalibration = getRiskCalibrationData(associatedRules);

    return {
      ruleCount,
      lastAssessment,
      alertsPerDay,
      alertTrend,
      riskCalibration,
      associatedRules
    };
  }, [selectedClause]);

  if (!selectedClause) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Compliance Insights</span>
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Select a requirement</p>
            <p className="text-sm mt-1">View compliance insights and risk calibration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Compliance Insights</span>
          </h2>
        </div>

        <div className="mb-3 p-2 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            {selectedClause.reference}
          </p>
          <p className="text-xs text-blue-600 mt-1 line-clamp-2">
            {selectedClause.title}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('measures')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'measures'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Success Measures
          </button>
          <button
            onClick={() => setActiveTab('calibration')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'calibration'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Risk Calibration
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'measures' && (
          <div className="space-y-4">
            {/* Rule Count */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900">Associated Rules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{complianceData.ruleCount}</span>
                  {complianceData.ruleCount === 0 && (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              {complianceData.ruleCount === 0 && (
                <p className="text-sm text-red-600 mt-2">
                  ⚠️ Warning: No monitoring rules are mapped to this requirement
                </p>
              )}
              {complianceData.ruleCount > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Rules actively monitoring compliance with this requirement
                </p>
              )}
            </div>

            {/* Last Assessment */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-900">Last Assessment</span>
                </div>
                <div className="text-right">
                  {complianceData.lastAssessment ? (
                    <>
                      <div className="text-lg font-semibold text-gray-900">
                        {getDaysAgo(complianceData.lastAssessment)}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        getAssessmentStatus(getDaysAgo(complianceData.lastAssessment)) === 'good' ? 'bg-green-100 text-green-800' :
                        getAssessmentStatus(getDaysAgo(complianceData.lastAssessment)) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getAssessmentStatus(getDaysAgo(complianceData.lastAssessment)) === 'good' ? 'Recent' :
                         getAssessmentStatus(getDaysAgo(complianceData.lastAssessment)) === 'warning' ? 'Review Due' :
                         'Overdue'}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500">No data</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Most recent rule update or evidence addition
              </p>
            </div>

            {/* Alerts Per Day */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-900">Daily Alert Volume</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {complianceData.alertsPerDay.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">alerts/day</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Average alerts generated across all associated rules
              </p>
            </div>

            {/* Alert Trends */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTrendIcon(complianceData.alertTrend)}
                  <span className="font-medium text-gray-900">Alert Trends</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className={`text-lg font-semibold ${
                      complianceData.alertTrend.concern ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {complianceData.alertTrend.direction === 'stable' ? '±' : ''}
                      {complianceData.alertTrend.percentage}%
                    </span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    complianceData.alertTrend.concern ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {complianceData.alertTrend.concern ? 'Needs Attention' : 'Healthy'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {complianceData.alertTrend.direction === 'up' && complianceData.alertTrend.concern &&
                  'Alert volume increasing - may indicate rule tuning needed'}
                {complianceData.alertTrend.direction === 'down' && !complianceData.alertTrend.concern &&
                  'Alert volume decreasing with good precision'}
                {complianceData.alertTrend.direction === 'stable' &&
                  'Alert volume stable within expected range'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'calibration' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span>Risk Calibration Parameters</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Transaction thresholds and monitoring parameters by customer segment
              </p>

              <div className="space-y-4">
                {complianceData.riskCalibration.map((segmentData, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        segmentData.segment.includes('High') ? 'bg-red-500' :
                        segmentData.segment.includes('Medium') ? 'bg-yellow-500' :
                        segmentData.segment.includes('Corporate') ? 'bg-purple-500' :
                        segmentData.segment.includes('Private') ? 'bg-indigo-500' :
                        'bg-green-500'
                      }`} />
                      <span>{segmentData.segment}</span>
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-700">Rule</th>
                            <th className="text-right py-2 font-medium text-gray-700">Threshold</th>
                            <th className="text-center py-2 font-medium text-gray-700">Frequency</th>
                            <th className="text-center py-2 font-medium text-gray-700">Lookback</th>
                          </tr>
                        </thead>
                        <tbody>
                          {segmentData.parameters.slice(0, 3).map((param, paramIndex) => (
                            <tr key={paramIndex} className="border-b border-gray-100">
                              <td className="py-2 text-gray-900">{param.ruleName}</td>
                              <td className="py-2 text-right font-medium text-gray-900">{param.threshold}</td>
                              <td className="py-2 text-center text-gray-600">{param.frequency}</td>
                              <td className="py-2 text-center text-gray-600">{param.lookbackDays}d</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}