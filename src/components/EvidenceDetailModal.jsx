import React from 'react';
import { DetailModal } from './DetailModal';
import { FileText, Calendar, Award, CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

export function EvidenceDetailModal({ isOpen, onClose, evidence }) {
  if (!evidence) return null;

  const getQualityIcon = (quality) => {
    switch (quality) {
      case 'excellent': return CheckCircle;
      case 'good': return Award;
      case 'fair': return AlertTriangle;
      default: return Clock;
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'backtest-results':
      case 'performance-data':
        return FileText;
      case 'audit-report':
        return Award;
      default:
        return FileText;
    }
  };

  const QualityIcon = getQualityIcon(evidence.quality);
  const TypeIcon = getTypeIcon(evidence.type);

  // Generate simulated detailed content based on evidence type
  const getDetailedContent = () => {
    switch (evidence.type) {
      case 'backtest-results':
        return {
          summary: 'Comprehensive backtest analysis covering the last 24 months of transaction data.',
          details: [
            { label: 'Test Period', value: '24 months (Jan 2023 - Dec 2024)' },
            { label: 'Total Transactions Analyzed', value: '2,847,329' },
            { label: 'True Positives Identified', value: '1,247' },
            { label: 'False Positives', value: '389' },
            { label: 'Precision Score', value: '76.2%' },
            { label: 'Recall Score', value: '82.1%' },
            { label: 'F1 Score', value: '79.0%' }
          ],
          files: [
            'backtest_results_2024_q4.pdf',
            'performance_metrics_summary.xlsx',
            'validation_methodology.docx'
          ]
        };

      case 'performance-data':
        return {
          summary: 'Real-time performance monitoring data collected from production systems.',
          details: [
            { label: 'Monitoring Period', value: 'Last 90 days' },
            { label: 'Average Daily Alerts', value: '47.3' },
            { label: 'Peak Alert Day', value: '89 alerts (Dec 15, 2024)' },
            { label: 'Investigation Rate', value: '68.4%' },
            { label: 'Average Resolution Time', value: '4.7 hours' },
            { label: 'System Uptime', value: '99.97%' },
            { label: 'Data Quality Score', value: '94.2%' }
          ],
          files: [
            'performance_dashboard_export.csv',
            'alert_volume_trends.png',
            'investigation_metrics.json'
          ]
        };

      case 'audit-report':
        return {
          summary: 'External regulatory audit findings and compliance assessment results.',
          details: [
            { label: 'Audit Date', value: 'November 2024' },
            { label: 'Regulatory Body', value: 'Federal Financial Institutions Examination Council' },
            { label: 'Audit Scope', value: 'Transaction Monitoring Systems' },
            { label: 'Overall Rating', value: 'Satisfactory' },
            { label: 'Findings', value: '3 observations, 0 violations' },
            { label: 'Recommendations', value: '5 process improvements' },
            { label: 'Compliance Score', value: '92%' }
          ],
          files: [
            'ffiec_audit_report_nov2024.pdf',
            'management_response.docx',
            'corrective_action_plan.xlsx'
          ]
        };

      default:
        return {
          summary: 'Documentation supporting compliance with regulatory requirements.',
          details: [
            { label: 'Document Type', value: evidence.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
            { label: 'Last Updated', value: evidence.lastAdded ? new Date(evidence.lastAdded).toLocaleDateString() : 'N/A' },
            { label: 'Quality Rating', value: evidence.quality.charAt(0).toUpperCase() + evidence.quality.slice(1) }
          ],
          files: []
        };
    }
  };

  const detailContent = getDetailedContent();

  return (
    <DetailModal isOpen={isOpen} onClose={onClose} title="Evidence Details">
      <div className="space-y-8">
        {/* Evidence Overview */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TypeIcon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{evidence.description}</h3>
                <p className="text-sm text-gray-600 capitalize mt-1">
                  {evidence.type.replace('-', ' ')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(evidence.quality)}`}>
                <QualityIcon className="w-4 h-4 mr-1" />
                {evidence.quality}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800">{detailContent.summary}</p>
          </div>
        </div>

        {/* Evidence Metrics */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Evidence Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailContent.details.map((detail, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 mb-1">{detail.label}</p>
                <p className="text-gray-900 font-semibold">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Associated Files */}
        {detailContent.files.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Associated Files
            </h3>

            <div className="space-y-2">
              {detailContent.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{file}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Evidence Timeline
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Evidence Added</p>
                <p className="text-xs text-gray-500">
                  {evidence.lastAdded ? new Date(evidence.lastAdded).toLocaleDateString() : 'Date not available'}
                </p>
              </div>
            </div>

            {evidence.type === 'audit-report' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Audit Completed</p>
                  <p className="text-xs text-gray-500">November 15, 2024</p>
                </div>
              </div>
            )}

            {evidence.type === 'backtest-results' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Backtest Analysis Completed</p>
                  <p className="text-xs text-gray-500">December 10, 2024</p>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-4"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Next Review Scheduled</p>
                <p className="text-xs text-gray-500">March 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Download Evidence Package
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Request Update
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </DetailModal>
  );
}