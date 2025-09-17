import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Settings, AlertTriangle, CheckCircle, Edit3, Save, X, RotateCcw } from 'lucide-react';
import { ruleService, riskCalibrationService } from '../services/data';
import { useRiskCalibrationState } from '../hooks/useAppState';
import { RiskCalibrationTableBody } from './RiskCalibrationTableBody';

export function RiskCalibrationOverview({ onBack }) {
  const { calibrationData, isUpdating, updateSegmentCalibration, resetToDefaults, getSummaryStats } = useRiskCalibrationState();
  const [editingSegment, setEditingSegment] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [error, setError] = useState(null);

  // Get all rules for rule count calculation
  const allRules = ruleService.getAllRules();

  // Enhanced calibration data with rule counts
  const enhancedCalibrationData = useMemo(() => {
    return calibrationData.map(item => ({
      ...item,
      ruleCount: allRules.filter(rule =>
        rule.metadata && rule.metadata.customerType && rule.metadata.customerType.some(type =>
          (item.segment.includes('Retail') && type === 'Individual') ||
          (item.segment.includes('Corporate') && type === 'Business') ||
          (item.segment.includes('High Net Worth') && type === 'Corporate')
        )
      ).length
    }));
  }, [calibrationData, allRules]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const baseStats = getSummaryStats();
    const totalRules = enhancedCalibrationData.reduce((sum, item) => sum + item.ruleCount, 0);

    return {
      ...baseStats,
      totalRules
    };
  }, [enhancedCalibrationData, getSummaryStats]);

  // Handle editing
  const handleEditStart = (segment) => {
    const segmentData = enhancedCalibrationData.find(item => item.segment === segment);
    if (segmentData && segmentData.rawValues) {
      setEditingSegment(segment);
      setEditValues(segmentData.rawValues);
      setError(null);
    }
  };

  const handleEditCancel = () => {
    setEditingSegment(null);
    setEditValues({});
    setError(null);
  };

  const handleEditSave = async () => {
    if (!editingSegment) return;

    try {
      await updateSegmentCalibration(editingSegment, editValues);
      setEditingSegment(null);
      setEditValues({});
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setEditValues(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const handleResetDefaults = async () => {
    try {
      await resetToDefaults();
      setError(null);
    } catch (err) {
      setError('Failed to reset to defaults: ' + err.message);
    }
  };


  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-100 to-teal-50">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Internal Policies</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-semibold rounded-full">
                CONFIGURATION INTERFACE
              </div>
              <div className="px-3 py-1 bg-teal-200 text-teal-800 text-xs font-semibold rounded-full">
                LIVE PARAMETERS
              </div>
            </div>
            <h1 className="text-2xl font-bold text-emerald-900 mb-2">Risk Calibration Overview</h1>
            <p className="text-emerald-700">
              Interactive configuration dashboard for transaction monitoring thresholds and risk parameters
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetDefaults}
              disabled={isUpdating}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-500 hover:bg-emerald-100 rounded-lg transition-colors disabled:opacity-50"
              title="Reset all parameters to defaults"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
            <Settings className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">

        {/* Detailed Risk Calibration Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Risk Calibration Parameters by Segment</h3>
            <p className="text-sm text-gray-600 mt-1">
              Transaction thresholds, velocity limits, and geographic multipliers for each customer segment
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Segment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Threshold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Velocity Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Behaviour Delta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comparison to Peers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Cumulative
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <RiskCalibrationTableBody
                enhancedCalibrationData={enhancedCalibrationData}
                editingSegment={editingSegment}
                editValues={editValues}
                isUpdating={isUpdating}
                handleEditStart={handleEditStart}
                handleEditSave={handleEditSave}
                handleEditCancel={handleEditCancel}
                handleInputChange={handleInputChange}
              />
            </table>
          </div>
        </div>

        {/* Risk Insights */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Calibration Issues & Insights
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                <p className="text-sm font-medium text-red-800">Sensitivity Analysis Overdue</p>
                <p className="text-xs text-red-600 mt-1">
                  High Net Worth Clients transaction threshold ($75,000) hasn't undergone sensitivity analysis in 14 months - last review: November 2023
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm font-medium text-yellow-800">Alert Generation Gap</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Corporate Clients monthly cumulative threshold has generated zero alerts in the past 3 months - potential calibration issue or market shift
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm font-medium text-orange-800">Behaviour Delta Inconsistency</p>
                <p className="text-xs text-orange-600 mt-1">
                  Medium Risk Retail (3.0x) has higher behaviour delta than High Risk Retail (2.0x) - review risk tier alignment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}