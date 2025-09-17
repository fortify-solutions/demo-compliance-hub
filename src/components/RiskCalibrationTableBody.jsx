import React from 'react';
import { Edit3, Save, X } from 'lucide-react';

export function RiskCalibrationTableBody({
  enhancedCalibrationData,
  editingSegment,
  editValues,
  isUpdating,
  handleEditStart,
  handleEditSave,
  handleEditCancel,
  handleInputChange
}) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {enhancedCalibrationData.map((item, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {/* Customer Segment */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{item.segment}</div>
          </td>

          {editingSegment === item.segment ? (
            // Editing mode
            <>
              {/* Transaction Threshold */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <input
                    type="number"
                    value={editValues.baseAmount || ''}
                    onChange={(e) => handleInputChange('baseAmount', e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Amount"
                  />
                  <div className="text-xs text-gray-500">
                    Daily: ${((editValues.baseAmount || 0) * 3).toLocaleString()}
                  </div>
                </div>
              </td>

              {/* Velocity Limit */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  <input
                    type="number"
                    value={editValues.velocityThreshold || ''}
                    onChange={(e) => handleInputChange('velocityThreshold', e.target.value)}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Qty"
                  />
                  <span className="text-xs text-gray-600">txn/day</span>
                </div>
              </td>

              {/* Behaviour Delta */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.1"
                      value={editValues.behaviourDelta || item.behaviourDelta?.multiplier || item.rawValues?.behaviourDelta || ''}
                      onChange={(e) => handleInputChange('behaviourDelta', e.target.value)}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="3.0"
                    />
                    <span className="text-xs text-gray-600">x</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.behaviourDelta?.cadence || 'Monthly'}
                  </div>
                </div>
              </td>

              {/* Comparison to Peers */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.1"
                      value={editValues.comparisonToPeers || item.comparisonToPeers?.multiplier || item.rawValues?.comparisonToPeers || ''}
                      onChange={(e) => handleInputChange('comparisonToPeers', e.target.value)}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="2.0"
                    />
                    <span className="text-xs text-gray-600">x</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.comparisonToPeers?.cadence || 'Monthly'}
                  </div>
                </div>
              </td>

              {/* Monthly Cumulative */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">${((editValues.baseAmount || 0) * 50).toLocaleString()}</div>
                <div className="text-xs text-gray-500">Weekly: ${((editValues.baseAmount || 0) * 15).toLocaleString()}</div>
              </td>

              {/* Last Updated */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="font-medium text-gray-900">
                  {item.lastUpdated.toLocaleDateString()}
                </div>
                <div className="text-xs text-emerald-600">
                  by Risk Operations
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEditSave}
                    disabled={isUpdating}
                    className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                    title="Save changes"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleEditCancel}
                    disabled={isUpdating}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors disabled:opacity-50"
                    title="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </>
          ) : (
            // View mode
            <>
              {/* Transaction Threshold */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.parameters.transactionThreshold}</div>
                <div className="text-xs text-gray-500">Daily: {item.parameters.cumulativeDaily}</div>
              </td>

              {/* Velocity Limit */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.parameters.velocityLimit}
              </td>

              {/* Behaviour Delta */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.behaviourDelta?.multiplier || item.rawValues?.behaviourDelta || 'N/A'}x</div>
                <div className="text-xs text-gray-500">{item.behaviourDelta?.cadence || 'Monthly'}</div>
              </td>

              {/* Comparison to Peers */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.comparisonToPeers?.multiplier || item.rawValues?.comparisonToPeers || 'N/A'}x</div>
                <div className="text-xs text-gray-500">{item.comparisonToPeers?.cadence || 'Monthly'}</div>
              </td>

              {/* Monthly Cumulative */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.parameters.cumulativeMonthly}</div>
                <div className="text-xs text-gray-500">Weekly: {item.parameters.cumulativeWeekly}</div>
              </td>

              {/* Last Updated */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="font-medium text-gray-900">
                  {item.lastUpdated.toLocaleDateString()}
                </div>
                <div className="text-xs text-emerald-600">
                  by Risk Operations
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditStart(item.segment)}
                  disabled={isUpdating || editingSegment}
                  className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors disabled:opacity-50"
                  title="Edit parameters"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}