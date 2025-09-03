import React from 'react';
import { Search, Settings, BarChart3, Users, Download, FileText } from 'lucide-react';
import { getScoreStyles } from '../services/mockData';

export function Header({ complianceScore, filters, onFilterChange, onCapacityClick }) {
  const scoreStyles = getScoreStyles(complianceScore);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-20">
      <div className="px-6 py-3 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Title and Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/fortify-logo.svg" 
                alt="Fortify Logo" 
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold font-serif" style={{color: '#79189C'}}>
                  AMLBoost Audit
                </h1>
              </div>
            </div>
            
            {/* Compliance Score Badge */}
            <div className="px-4 py-2 rounded-lg font-semibold" style={scoreStyles}>
              Score: {complianceScore}%
            </div>
          </div>

          {/* Center Section: Filters */}
          <div className="flex items-center space-x-2">
            <select 
              value={filters.jurisdiction}
              onChange={(e) => onFilterChange({ jurisdiction: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Jurisdictions</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
            </select>

            <select 
              value={filters.productType}
              onChange={(e) => onFilterChange({ productType: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              />
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onCapacityClick}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center space-x-1"
            >
              <Users className="w-3 h-3" />
              <span>Capacity</span>
            </button>
            
            <button className="text-xs flex items-center space-x-1 px-2 py-1 rounded hover:opacity-90 transition-opacity" style={{backgroundColor: '#79189C', color: 'white'}}>
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
            
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}