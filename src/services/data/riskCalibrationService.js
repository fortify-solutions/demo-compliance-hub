// Risk Calibration Service - Shared Data Management for Risk Parameters
export class RiskCalibrationService {
  constructor() {
    // Initialize with default risk calibration parameters
    this.calibrationData = {
      segments: {
        'Low Risk Retail': {
          baseAmount: 10000,
          velocityThreshold: 15,
          behaviourDelta: 3.5,
          comparisonToPeers: 1.8
        },
        'Medium Risk Retail': {
          baseAmount: 5000,
          velocityThreshold: 10,
          behaviourDelta: 2.8,
          comparisonToPeers: 2.2
        },
        'High Risk Retail': {
          baseAmount: 2500,
          velocityThreshold: 5,
          behaviourDelta: 2.0,
          comparisonToPeers: 2.8
        },
        'Corporate Clients': {
          baseAmount: 50000,
          velocityThreshold: 25,
          behaviourDelta: 4.2,
          comparisonToPeers: 1.5
        },
        'High Net Worth': {
          baseAmount: 25000,
          velocityThreshold: 20,
          behaviourDelta: 3.0,
          comparisonToPeers: 2.0
        },
        'International': {
          baseAmount: 7500,
          velocityThreshold: 8,
          behaviourDelta: 2.5,
          comparisonToPeers: 3.2
        }
      },
      listeners: new Set()
    };

    // Load from localStorage if available
    this.loadFromStorage();
  }

  // Get all risk calibration data
  getAllCalibrationData() {
    const segments = Object.keys(this.calibrationData.segments);
    return segments.map(segment => this.getCalibrationDataForSegment(segment));
  }

  // Get behaviour delta cadence for segment
  getBehaviourDeltaCadence(segment) {
    const cadences = {
      'Low Risk Retail': 'Monthly',
      'Medium Risk Retail': 'Bi-weekly',
      'High Risk Retail': 'Weekly',
      'Corporate Clients': 'Monthly',
      'High Net Worth': 'Bi-weekly',
      'International': 'Weekly'
    };
    return cadences[segment] || 'Monthly';
  }

  // Get comparison to peers cadence for segment
  getComparisonToPeersCadence(segment) {
    const cadences = {
      'Low Risk Retail': 'Quarterly',
      'Medium Risk Retail': 'Monthly',
      'High Risk Retail': 'Bi-weekly',
      'Corporate Clients': 'Quarterly',
      'High Net Worth': 'Monthly',
      'International': 'Bi-weekly'
    };
    return cadences[segment] || 'Monthly';
  }

  // Get calibration data for a specific segment
  getCalibrationDataForSegment(segment) {
    const config = this.calibrationData.segments[segment];
    if (!config) return null;

    const { baseAmount, velocityThreshold, behaviourDelta, comparisonToPeers } = config;

    // Generate realistic coverage values (not random)
    const getCoverageForSegment = (segment) => {
      const coverages = {
        'Low Risk Retail': 87,
        'Medium Risk Retail': 92,
        'High Risk Retail': 94,
        'Corporate Clients': 89,
        'High Net Worth': 91,
        'International': 85
      };
      return coverages[segment] || 88;
    };

    return {
      segment,
      parameters: {
        transactionThreshold: `$${baseAmount.toLocaleString()}+`,
        velocityLimit: `${velocityThreshold} transactions/day`,
        cumulativeDaily: `$${(baseAmount * 3).toLocaleString()}`,
        cumulativeWeekly: `$${(baseAmount * 15).toLocaleString()}`,
        cumulativeMonthly: `$${(baseAmount * 50).toLocaleString()}`
      },
      rawValues: {
        baseAmount,
        velocityThreshold,
        behaviourDelta,
        comparisonToPeers
      },
      behaviourDelta: {
        multiplier: behaviourDelta,
        cadence: this.getBehaviourDeltaCadence(segment)
      },
      comparisonToPeers: {
        multiplier: comparisonToPeers,
        cadence: this.getComparisonToPeersCadence(segment)
      },
      riskLevel: this.getRiskLevel(segment),
      lastUpdated: this.getLastUpdatedForSegment(segment),
      coverage: getCoverageForSegment(segment)
    };
  }

  // Update calibration data for a segment
  updateSegmentCalibration(segment, updates) {
    if (!this.calibrationData.segments[segment]) {
      throw new Error(`Unknown segment: ${segment}`);
    }

    // Validate updates
    if (updates.baseAmount !== undefined && (updates.baseAmount < 0 || updates.baseAmount > 1000000)) {
      throw new Error('Base amount must be between $0 and $1,000,000');
    }

    if (updates.velocityThreshold !== undefined && (updates.velocityThreshold < 1 || updates.velocityThreshold > 100)) {
      throw new Error('Velocity threshold must be between 1 and 100 transactions/day');
    }

    if (updates.behaviourDelta !== undefined && (updates.behaviourDelta < 1.0 || updates.behaviourDelta > 10.0)) {
      throw new Error('Behaviour delta must be between 1.0x and 10.0x');
    }

    if (updates.comparisonToPeers !== undefined && (updates.comparisonToPeers < 1.0 || updates.comparisonToPeers > 10.0)) {
      throw new Error('Comparison to peers must be between 1.0x and 10.0x');
    }

    // Apply updates
    Object.assign(this.calibrationData.segments[segment], updates);

    // Save to storage and notify listeners
    this.saveToStorage();
    this.notifyListeners(segment, updates);
  }

  // Get base amount for a segment (legacy method for backward compatibility)
  getBaseAmountForSegment(segment) {
    const config = this.calibrationData.segments[segment];
    return config ? config.baseAmount : 10000;
  }

  // Get multiplier for a rule category
  getMultiplierForRule(category) {
    const multipliers = {
      'Cash Monitoring': 1.0,
      'Behavioral Analytics': 0.5,
      'Velocity Tracking': 0.8,
      'Geographic Risk': 1.2,
      'Account Activity': 0.6
    };
    return multipliers[category] || 1.0;
  }

  // Get frequency for segment and rule category
  getFrequencyForSegment(segment, ruleCategory) {
    if (segment.includes('High Risk')) return 'Daily';
    if (segment.includes('Corporate') || segment.includes('High Net Worth')) return 'Real-time';
    return 'Weekly';
  }

  // Get lookback period for segment
  getLookbackForSegment(segment) {
    if (segment.includes('High Risk')) return 7;
    if (segment.includes('Corporate') || segment.includes('High Net Worth')) return 30;
    return 14;
  }

  // Get risk level for segment
  getRiskLevel(segment) {
    if (segment.includes('High') || segment.includes('International')) return 'high';
    if (segment.includes('Medium')) return 'medium';
    return 'low';
  }

  // Get realistic last updated dates (not all current date)
  getLastUpdatedForSegment(segment) {
    const dates = {
      'Low Risk Retail': new Date('2025-01-15'),
      'Medium Risk Retail': new Date('2025-01-12'),
      'High Risk Retail': new Date('2025-01-16'),
      'Corporate Clients': new Date('2025-01-05'),
      'High Net Worth': new Date('2025-01-09'),
      'International': new Date('2025-01-14')
    };
    return dates[segment] || new Date('2025-01-10');
  }

  // Generate risk calibration data for ComplianceInsights compatibility
  getRiskCalibrationData(rules) {
    const segments = ['Low Risk Retail', 'Medium Risk Retail', 'High Risk Retail', 'Corporate', 'Private Banking'];

    return segments.map(segment => {
      const baseAmount = this.getBaseAmountForSegment(segment);
      const parameters = rules.map(rule => ({
        ruleName: rule.name,
        threshold: this.formatCurrency(baseAmount * this.getMultiplierForRule(rule.category)),
        frequency: this.getFrequencyForSegment(segment, rule.category),
        lookbackDays: this.getLookbackForSegment(segment)
      }));

      return {
        segment,
        parameters
      };
    });
  }

  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Add change listener
  addListener(listener) {
    this.calibrationData.listeners.add(listener);
    return () => this.calibrationData.listeners.delete(listener);
  }

  // Notify all listeners of changes
  notifyListeners(segment, changes) {
    this.calibrationData.listeners.forEach(listener => {
      try {
        listener({ segment, changes });
      } catch (error) {
        console.error('Error in risk calibration listener:', error);
      }
    });
  }

  // Save to localStorage
  saveToStorage() {
    try {
      const dataToSave = {
        segments: this.calibrationData.segments,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('riskCalibrationData', JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Failed to save risk calibration data to localStorage:', error);
    }
  }

  // Load from localStorage
  loadFromStorage() {
    try {
      const saved = localStorage.getItem('riskCalibrationData');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.segments) {
          // Merge with defaults to ensure all segments exist
          Object.assign(this.calibrationData.segments, data.segments);
        }
      }
    } catch (error) {
      console.warn('Failed to load risk calibration data from localStorage:', error);
    }
  }

  // Reset to defaults
  resetToDefaults() {
    this.calibrationData.segments = {
      'Low Risk Retail': {
        baseAmount: 10000,
        velocityThreshold: 15,
        behaviourDelta: 3.5,
        comparisonToPeers: 1.8
      },
      'Medium Risk Retail': {
        baseAmount: 5000,
        velocityThreshold: 10,
        behaviourDelta: 2.8,
        comparisonToPeers: 2.2
      },
      'High Risk Retail': {
        baseAmount: 2500,
        velocityThreshold: 5,
        behaviourDelta: 2.0,
        comparisonToPeers: 2.8
      },
      'Corporate Clients': {
        baseAmount: 50000,
        velocityThreshold: 25,
        behaviourDelta: 4.2,
        comparisonToPeers: 1.5
      },
      'High Net Worth': {
        baseAmount: 25000,
        velocityThreshold: 20,
        behaviourDelta: 3.0,
        comparisonToPeers: 2.0
      },
      'International': {
        baseAmount: 7500,
        velocityThreshold: 8,
        behaviourDelta: 2.5,
        comparisonToPeers: 3.2
      }
    };

    this.saveToStorage();
    this.notifyListeners('all', { type: 'reset' });
  }

  // Get summary statistics
  getSummaryStats() {
    const allData = this.getAllCalibrationData();
    const totalSegments = allData.length;
    const averageBaseAmount = Math.round(
      allData.reduce((sum, item) => sum + item.rawValues.baseAmount, 0) / totalSegments
    );
    const highRiskSegments = allData.filter(item => item.riskLevel === 'high').length;

    return {
      totalSegments,
      averageBaseAmount,
      highRiskSegments
    };
  }
}

// Export singleton instance
export const riskCalibrationService = new RiskCalibrationService();