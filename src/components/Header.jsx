import React, { useMemo } from 'react';
import { Search, Settings, BarChart3, Users, Download, FileText } from 'lucide-react';

export function Header({ filters, onFilterChange, onCapacityClick, documents = [] }) {

  // Extract unique jurisdictions from visible documents
  const availableJurisdictions = useMemo(() => {
    const jurisdictions = new Set();
    documents.forEach(doc => {
      doc.clauses.forEach(clause => {
        clause.metadata.jurisdiction.forEach(j => jurisdictions.add(j));
      });
    });
    return Array.from(jurisdictions).sort();
  }, [documents]);

  // Map jurisdiction codes to display names
  const jurisdictionNames = {
    'US': 'US',
    'UK': 'UK',
    'EU': 'EU',
    'CA': 'Canada',
    'AU': 'Australia',
    'SG': 'Singapore',
    'HK': 'Hong Kong',
    'JP': 'Japan',
    'CH': 'Switzerland',
    'AE': 'UAE',
    'DE': 'Germany',
    'IT': 'Italy',
    'ES': 'Spain',
    'International': 'International'
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-20">
      <div className="px-6 py-3 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={filters.jurisdiction}
              onChange={(e) => onFilterChange({ jurisdiction: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by jurisdiction"
            >
              <option value="">All Jurisdictions</option>
              {availableJurisdictions.map(code => (
                <option key={code} value={code}>
                  {jurisdictionNames[code] || code}
                </option>
              ))}
            </select>

            <select 
              value={filters.productType}
              onChange={(e) => onFilterChange({ productType: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by product type"
            >
              <option value="">All Products</option>
              <option value="retail-banking">Retail</option>
              <option value="commercial-banking">Commercial</option>
              <option value="wealth-management">Wealth</option>
            </select>

            <select 
              value={filters.customerType}
              onChange={(e) => onFilterChange({ customerType: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by customer type"
            >
              <option value="">All Customers</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="corporate">Corporate</option>
            </select>

            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                className="pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                aria-label="Search clauses and documents"
              />
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onCapacityClick}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center space-x-1"
              aria-label="Open capacity planning modal"
            >
              <Users className="w-3 h-3" />
              <span>Capacity</span>
            </button>
            
            <button 
              className="text-xs flex items-center space-x-1 px-2 py-1 rounded hover:opacity-90 transition-opacity" 
              style={{backgroundColor: '#79189C', color: 'white'}}
              aria-label="Export compliance report"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
            
            <button 
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              aria-label="Open settings"
            >
              <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}