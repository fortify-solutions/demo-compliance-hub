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
      <div className="p-6 border-b border-gray-200 bg-emerald-50">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Internal Policies</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-900 mb-2">Risk Calibration Overview</h1>
            <p className="text-emerald-700">
              Comprehensive view of risk parameters across all customer segments and regulatory requirements
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
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Segments</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalSegments}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Base Amount</p>
                <p className="text-2xl font-bold text-gray-900">${summaryStats.averageBaseAmount?.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Segments</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.highRiskSegments}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rules</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalRules}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Calibration Insights
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Active Monitoring</p>
                <p className="text-xs text-green-600 mt-1">
                  {enhancedCalibrationData.reduce((sum, item) => sum + item.ruleCount, 0)} total rules actively monitoring across all segments
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Corporate Focus</p>
                <p className="text-xs text-blue-600 mt-1">
                  Corporate and High Net Worth segments have the highest transaction thresholds
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Attention Required
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Threshold Sensitivity</p>
                <p className="text-xs text-yellow-600 mt-1">
                  High Risk Retail has the most sensitive thresholds at 2.0x customer change detection
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">High Risk Monitoring</p>
                <p className="text-xs text-red-600 mt-1">
                  International and High Risk Retail segments require enhanced monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}