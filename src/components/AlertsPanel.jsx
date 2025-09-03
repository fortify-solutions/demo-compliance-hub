import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  Brain, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  Bell
} from 'lucide-react';

export function AlertsPanel({ alerts, selectedClause }) {
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'performance-degradation': return <TrendingDown className="w-4 h-4" />;
      case 'coverage-gap': return <AlertTriangle className="w-4 h-4" />;
      case 'ai-insight': return <Brain className="w-4 h-4" />;
      case 'regulatory-update': return <FileText className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Active</span>;
      case 'investigating':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Investigating</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Resolved</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesClause = !selectedClause || alert.relatedClause === selectedClause.id;
    
    return matchesPriority && matchesStatus && matchesClause;
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const relatedAlertsCount = selectedClause ? 
    alerts.filter(a => a.relatedClause === selectedClause.id).length : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>System Alerts</span>
          </h2>
          {activeAlertsCount > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
              {activeAlertsCount} active
            </span>
          )}
        </div>

        {selectedClause && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Filtered for:</span> {selectedClause.reference}
            </p>
            {relatedAlertsCount > 0 && (
              <p className="text-xs text-blue-600 mt-1">
                {relatedAlertsCount} related alert{relatedAlertsCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <p className="text-xs text-gray-600 mt-2">
          {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">No alerts match your filters</p>
            {selectedClause && (
              <p className="text-xs mt-1">No issues found for selected clause</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map(alert => {
              const isRelatedToSelected = selectedClause && alert.relatedClause === selectedClause.id;
              
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                    isRelatedToSelected 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  } ${
                    alert.status === 'active' ? 'border-l-4 border-l-red-500' :
                    alert.status === 'investigating' ? 'border-l-4 border-l-yellow-500' :
                    'border-l-4 border-l-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-2">
                      {getPriorityIcon(alert.priority)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {alert.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTypeIcon(alert.type)}
                          <span className="text-xs text-gray-500 capitalize">
                            {alert.type.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(alert.status)}
                  </div>

                  <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                    {alert.description}
                  </p>

                  {alert.impact && (
                    <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                      <span className="font-medium text-orange-800">Impact:</span>
                      <span className="text-orange-700 ml-1">{alert.impact}</span>
                    </div>
                  )}

                  {alert.recommendation && (
                    <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                      <span className="font-medium text-blue-800">Recommendation:</span>
                      <span className="text-blue-700 ml-1">{alert.recommendation}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                    {alert.relatedClause && (
                      <div className="flex items-center space-x-1 text-purple-600">
                        <span>View clause</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Generate Alert Summary
          </button>
          <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Export Alert Log
          </button>
          {selectedClause && (
            <button className="w-full px-3 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">
              Investigate Clause Issues
            </button>
          )}
        </div>
      </div>
    </div>
  );
}