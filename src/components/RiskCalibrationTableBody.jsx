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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Single:</span>
                      <input
                        type="number"
                        value={editValues.baseAmount || ''}
                        onChange={(e) => handleInputChange('baseAmount', e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Amount"
                      />
                    </div>
                    {item.percentiles?.transactionThreshold && (
                      <div className="text-xs text-blue-600 font-medium">
                        {item.percentiles.transactionThreshold}% exceed
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Daily:</span>
                      <input
                        type="number"
                        value={editValues.dailyAggregate || ''}
                        onChange={(e) => handleInputChange('dailyAggregate', e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Aggregate"
                      />
                    </div>
                    {item.percentiles?.dailyAggregate && (
                      <div className="text-xs text-blue-600 font-medium">
                        {item.percentiles.dailyAggregate}% exceed
                      </div>
                    )}
                  </div>
                </div>
              </td>

              {/* Velocity Limit */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
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
                  {item.percentiles?.velocityLimit && (
                    <div className="text-xs text-blue-600 font-medium">
                      {item.percentiles.velocityLimit}% exceed
                    </div>
                  )}
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
                  {item.percentiles?.behaviourDelta && (
                    <div className="text-xs text-blue-600 font-medium">
                      {item.percentiles.behaviourDelta}% trigger
                    </div>
                  )}
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
                  {item.percentiles?.comparisonToPeers && (
                    <div className="text-xs text-blue-600 font-medium">
                      {item.percentiles.comparisonToPeers}% exceed
                    </div>
                  )}
                </div>
              </td>

              {/* Monthly Cumulative */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Monthly:</span>
                      <input
                        type="number"
                        value={editValues.monthlyCumulative || ''}
                        onChange={(e) => handleInputChange('monthlyCumulative', e.target.value)}
                        className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Amount"
                      />
                    </div>
                    {item.percentiles?.monthlyCumulative && (
                      <div className="text-xs text-blue-600 font-medium">
                        {item.percentiles.monthlyCumulative}% exceed
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Weekly:</span>
                      <input
                        type="number"
                        value={editValues.weeklyCumulative || ''}
                        onChange={(e) => handleInputChange('weeklyCumulative', e.target.value)}
                        className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Amount"
                      />
                    </div>
                    {item.percentiles?.weeklyCumulative && (
                      <div className="text-xs text-blue-600 font-medium">
                        {item.percentiles.weeklyCumulative}% exceed
                      </div>
                    )}
                  </div>
                </div>
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
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.parameters.transactionThreshold}</div>
                    {item.percentiles?.transactionThreshold && (
                      <div className="text-xs text-blue-600 font-medium ml-2">
                        {item.percentiles.transactionThreshold}% exceed
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Daily: {item.parameters.cumulativeDaily}</div>
                    {item.percentiles?.dailyAggregate && (
                      <div className="text-xs text-blue-600 font-medium ml-2">
                        {item.percentiles.dailyAggregate}% exceed
                      </div>
                    )}
                  </div>
                </div>
              </td>

              {/* Velocity Limit */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.parameters.velocityLimit}</div>
                {item.percentiles?.velocityLimit && (
                  <div className="text-xs text-blue-600 font-medium">
                    {item.percentiles.velocityLimit}% exceed
                  </div>
                )}
              </td>

              {/* Behaviour Delta */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.behaviourDelta?.multiplier || item.rawValues?.behaviourDelta || 'N/A'}x</div>
                <div className="text-xs text-gray-500">{item.behaviourDelta?.cadence || 'Monthly'}</div>
                {item.percentiles?.behaviourDelta && (
                  <div className="text-xs text-blue-600 font-medium">
                    {item.percentiles.behaviourDelta}% trigger
                  </div>
                )}
              </td>

              {/* Comparison to Peers */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{item.comparisonToPeers?.multiplier || item.rawValues?.comparisonToPeers || 'N/A'}x</div>
                <div className="text-xs text-gray-500">{item.comparisonToPeers?.cadence || 'Monthly'}</div>
                {item.percentiles?.comparisonToPeers && (
                  <div className="text-xs text-blue-600 font-medium">
                    {item.percentiles.comparisonToPeers}% exceed
                  </div>
                )}
              </td>

              {/* Monthly Cumulative */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.parameters.cumulativeMonthly}</div>
                    {item.percentiles?.monthlyCumulative && (
                      <div className="text-xs text-blue-600 font-medium ml-2">
                        {item.percentiles.monthlyCumulative}% exceed
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Weekly: {item.parameters.cumulativeWeekly}</div>
                    {item.percentiles?.weeklyCumulative && (
                      <div className="text-xs text-blue-600 font-medium ml-2">
                        {item.percentiles.weeklyCumulative}% exceed
                      </div>
                    )}
                  </div>
                </div>
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