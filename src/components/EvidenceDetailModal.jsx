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
      case 'rule-backtest':
      case 'parallel-run':
      case 'threshold-sensitivity':
      case 'performance-monitoring':
        return FileText;
      case 'scenario-testing':
      case 'model-validation':
      case 'coverage-analysis':
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
      case 'rule-backtest':
        return {
          summary: 'Comprehensive backtest analysis covering the last 24 months of transaction monitoring rule performance.',
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
            'rule_backtest_results_2024_q4.pdf',
            'performance_metrics_summary.xlsx',
            'validation_methodology.docx'
          ]
        };

      case 'parallel-run':
        return {
          summary: 'Parallel validation testing comparing new transaction monitoring rules against legacy system performance.',
          details: [
            { label: 'Test Duration', value: '90 days parallel processing' },
            { label: 'Transaction Volume', value: '1,245,678 transactions' },
            { label: 'Alert Concordance Rate', value: '94.7%' },
            { label: 'New System Alerts', value: '1,847 alerts' },
            { label: 'Legacy System Alerts', value: '1,923 alerts' },
            { label: 'False Positive Reduction', value: '12.3%' },
            { label: 'Processing Speed Improvement', value: '34%' }
          ],
          files: [
            'parallel_run_comparison.xlsx',
            'alert_analysis_report.pdf',
            'performance_metrics.json'
          ]
        };

      case 'threshold-sensitivity':
        return {
          summary: 'Sensitivity analysis testing for transaction monitoring rule thresholds and parameters.',
          details: [
            { label: 'Threshold Range Tested', value: '$5K - $100K' },
            { label: 'Sensitivity Points', value: '15 threshold levels' },
            { label: 'Optimal Threshold', value: '$25,000' },
            { label: 'Alert Volume at Optimal', value: '47 daily avg' },
            { label: 'True Positive Rate', value: '78.9%' },
            { label: 'Coverage Impact', value: '92.4% transaction coverage' },
            { label: 'Investigation Capacity', value: '85% analyst utilization' }
          ],
          files: [
            'threshold_sensitivity_analysis.pdf',
            'optimization_curves.png',
            'threshold_recommendations.docx'
          ]
        };

      case 'scenario-testing':
        return {
          summary: 'Comprehensive scenario testing using known money laundering typologies and attack patterns.',
          details: [
            { label: 'Test Scenarios', value: '27 ML typologies tested' },
            { label: 'Detection Rate', value: '89.3% scenarios detected' },
            { label: 'Average Detection Time', value: '2.4 days' },
            { label: 'Structuring Detection', value: '95.7% success rate' },
            { label: 'Layering Detection', value: '84.2% success rate' },
            { label: 'Trade-Based ML Detection', value: '76.8% success rate' },
            { label: 'False Negatives', value: '3 scenarios missed' }
          ],
          files: [
            'scenario_test_results.pdf',
            'typology_detection_matrix.xlsx',
            'missed_scenarios_analysis.docx'
          ]
        };

      case 'model-validation':
        return {
          summary: 'Independent validation of machine learning models and algorithms used in transaction monitoring.',
          details: [
            { label: 'Validation Date', value: 'November 2024' },
            { label: 'Models Tested', value: '5 ML algorithms validated' },
            { label: 'Validation Scope', value: 'Transaction Pattern Recognition' },
            { label: 'Overall Model Performance', value: 'Satisfactory' },
            { label: 'Bias Testing Results', value: 'No significant bias detected' },
            { label: 'Drift Detection', value: '2% model drift identified' },
            { label: 'Retraining Recommendation', value: 'Quarterly updates needed' }
          ],
          files: [
            'model_validation_report_nov2024.pdf',
            'bias_testing_results.xlsx',
            'drift_analysis.json'
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

            {evidence.type === 'model-validation' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Model Validation Completed</p>
                  <p className="text-xs text-gray-500">November 15, 2024</p>
                </div>
              </div>
            )}

            {evidence.type === 'rule-backtest' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Rule Backtest Completed</p>
                  <p className="text-xs text-gray-500">December 10, 2024</p>
                </div>
              </div>
            )}

            {evidence.type === 'parallel-run' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Parallel Run Testing Completed</p>
                  <p className="text-xs text-gray-500">December 5, 2024</p>
                </div>
              </div>
            )}

            {evidence.type === 'scenario-testing' && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Scenario Testing Completed</p>
                  <p className="text-xs text-gray-500">November 28, 2024</p>
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