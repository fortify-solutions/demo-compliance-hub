import React, { useState } from 'react';
import { X, Upload, FileText, Download, CheckCircle2 } from 'lucide-react';

export function ExportConfigModal({ isOpen, onClose, documents = [], filters = {} }) {
  const [exportType, setExportType] = useState('internal'); // 'internal' or 'external'
  const [exportScope, setExportScope] = useState('filters'); // 'filters' or 'regulation'

  // Filter-based selections
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // Regulation-based selections
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  // Content inclusion
  const [includeRequirementText, setIncludeRequirementText] = useState(true);
  const [includeRules, setIncludeRules] = useState(true);
  const [includeEvidence, setIncludeEvidence] = useState(true);
  const [includeRiskCalibration, setIncludeRiskCalibration] = useState(false);

  // Uploaded documents
  const [uploadedFiles, setUploadedFiles] = useState([]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: f.size }))]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentToggle = (docId) => {
    setSelectedDocuments(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleGenerate = () => {
    // Mock generation - in real app would generate PDF
    console.log('Generating export with config:', {
      exportType,
      exportScope,
      filters: exportScope === 'filters' ? { selectedJurisdiction, selectedProduct, selectedCustomer } : null,
      selections: exportScope === 'regulation' ? { selectedDocuments, selectedRequirements } : null,
      content: { includeRequirementText, includeRules, includeEvidence, includeRiskCalibration },
      attachments: uploadedFiles
    });
    alert('Export package generated! (Mock functionality)');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Export Compliance Package</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

          {/* Export Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportType('internal')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  exportType === 'internal'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Internal Report</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Operational analysis for internal stakeholders
                    </div>
                  </div>
                  {exportType === 'internal' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setExportType('external')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  exportType === 'external'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">External Audit Package</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Formal documentation for regulatory audits
                    </div>
                  </div>
                  {exportType === 'external' && (
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Export Scope Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Scope
            </label>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setExportScope('filters')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  exportScope === 'filters'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By Filters
              </button>
              <button
                onClick={() => setExportScope('regulation')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  exportScope === 'regulation'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By Specific Regulation
              </button>
            </div>
          </div>

          {/* Filter-Based Selection */}
          {exportScope === 'filters' && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Filter Selection</h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Jurisdiction</label>
                  <select
                    value={selectedJurisdiction}
                    onChange={(e) => setSelectedJurisdiction(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Jurisdictions</option>
                    <option value="EU">EU</option>
                    <option value="DE">Germany</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Product Type</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Products</option>
                    <option value="retail-banking">Retail Banking</option>
                    <option value="commercial-banking">Commercial Banking</option>
                    <option value="wealth-management">Wealth Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Customer Type</label>
                  <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Customers</option>
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
                Export will include all requirements matching the selected filters
              </div>
            </div>
          )}

          {/* Regulation-Based Selection */}
          {exportScope === 'regulation' && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Select Regulations</h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {documents.filter(doc => doc.visible !== false).map(doc => (
                  <label key={doc.id} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => handleDocumentToggle(doc.id)}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.clauses.length} requirements</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
                {selectedDocuments.length === 0
                  ? 'Select one or more regulations to export'
                  : `${selectedDocuments.length} regulation(s) selected - all requirements will be included`
                }
              </div>
            </div>
          )}

          {/* Content Inclusion */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Include in Export</h3>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRequirementText}
                  onChange={(e) => setIncludeRequirementText(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Requirement Text</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRules}
                  onChange={(e) => setIncludeRules(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Monitoring Rules & Performance</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEvidence}
                  onChange={(e) => setIncludeEvidence(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Evidence & Artifacts</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRiskCalibration}
                  onChange={(e) => setIncludeRiskCalibration(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Risk Calibration Parameters</span>
              </label>
            </div>
          </div>

          {/* Document Upload */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Attach Additional Documents</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload files</span>
                <span className="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX supported</span>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-xs text-gray-500">
            {exportType === 'internal' ? 'Internal' : 'External Audit'} Package •
            {exportScope === 'filters' ? ' Filter-based' : ` ${selectedDocuments.length} regulation(s)`}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate Package</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
