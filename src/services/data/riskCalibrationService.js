// Risk Calibration Service - Shared Data Management for Risk Parameters
export class RiskCalibrationService {
  constructor() {
    // Initialize with default risk calibration parameters
    this.calibrationData = {
      segments: {
        'Low Risk Retail': {
          baseAmount: 10000,
          dailyAggregate: 30000,
          weeklyCumulative: 150000,
          monthlyCumulative: 600000,
          velocityThreshold: 15,
          behaviourDelta: 3.5,
          comparisonToPeers: 1.8
        },
        'Medium Risk Retail': {
          baseAmount: 5000,
          dailyAggregate: 15000,
          weeklyCumulative: 75000,
          monthlyCumulative: 300000,
          velocityThreshold: 10,
          behaviourDelta: 2.8,
          comparisonToPeers: 2.2
        },
        'High Risk Retail': {
          baseAmount: 2500,
          dailyAggregate: 7500,
          weeklyCumulative: 37500,
          monthlyCumulative: 150000,
          velocityThreshold: 5,
          behaviourDelta: 2.0,
          comparisonToPeers: 2.8
        },
        'Corporate Clients': {
          baseAmount: 50000,
          dailyAggregate: 150000,
          weeklyCumulative: 750000,
          monthlyCumulative: 3000000,
          velocityThreshold: 25,
          behaviourDelta: 4.2,
          comparisonToPeers: 1.5
        },
        'High Net Worth': {
          baseAmount: 25000,
          dailyAggregate: 75000,
          weeklyCumulative: 375000,
          monthlyCumulative: 1500000,
          velocityThreshold: 20,
          behaviourDelta: 3.0,
          comparisonToPeers: 2.0
        },
        'International': {
          baseAmount: 7500,
          dailyAggregate: 22500,
          weeklyCumulative: 112500,
          monthlyCumulative: 450000,
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

    // Ensure all cumulative fields exist (migration fallback)
    let { baseAmount, dailyAggregate, weeklyCumulative, monthlyCumulative, velocityThreshold, behaviourDelta, comparisonToPeers } = config;
    if (!dailyAggregate && baseAmount) {
      dailyAggregate = baseAmount * 3; // Default multiplier
    }
    if (!weeklyCumulative && dailyAggregate) {
      weeklyCumulative = dailyAggregate * 5; // Default multiplier (5 business days)
    }
    if (!monthlyCumulative && dailyAggregate) {
      monthlyCumulative = dailyAggregate * 20; // Default multiplier (20 business days)
    }

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
        cumulativeDaily: `$${dailyAggregate.toLocaleString()}`,
        cumulativeWeekly: `$${weeklyCumulative.toLocaleString()}`,
        cumulativeMonthly: `$${monthlyCumulative.toLocaleString()}`
      },
      rawValues: {
        baseAmount,
        dailyAggregate,
        weeklyCumulative,
        monthlyCumulative,
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
      percentiles: this.getPercentilesForSegment(segment, config),
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

    if (updates.dailyAggregate !== undefined && (updates.dailyAggregate < 0 || updates.dailyAggregate > 5000000)) {
      throw new Error('Daily aggregate must be between $0 and $5,000,000');
    }

    if (updates.weeklyCumulative !== undefined && (updates.weeklyCumulative < 0 || updates.weeklyCumulative > 25000000)) {
      throw new Error('Weekly cumulative must be between $0 and $25,000,000');
    }

    if (updates.monthlyCumulative !== undefined && (updates.monthlyCumulative < 0 || updates.monthlyCumulative > 100000000)) {
      throw new Error('Monthly cumulative must be between $0 and $100,000,000');
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

  // Get percentile data for segment - shows what % of customers exceed each threshold
  getPercentilesForSegment(segment, config) {
    // Calculate realistic percentiles based on segment risk profile and threshold values
    // Higher risk segments typically have higher % exceeding thresholds
    // Lower thresholds result in higher % exceeding

    const basePercentiles = {
      'Low Risk Retail': {
        transactionThreshold: 8.3,   // 8.3% of low risk retail exceed $10,000
        dailyAggregate: 5.7,          // 5.7% exceed $30,000 daily
        velocityLimit: 4.2,           // 4.2% exceed 15 transactions/day
        weeklyCumulative: 3.8,        // 3.8% exceed $150,000 weekly
        monthlyCumulative: 2.9,       // 2.9% exceed $600,000 monthly
        behaviourDelta: 6.5,          // 6.5% have 3.5x behavior change
        comparisonToPeers: 9.1        // 9.1% are 1.8x above peer average
      },
      'Medium Risk Retail': {
        transactionThreshold: 12.7,   // 12.7% of medium risk exceed $5,000
        dailyAggregate: 9.2,          // 9.2% exceed $15,000 daily
        velocityLimit: 8.4,           // 8.4% exceed 10 transactions/day
        weeklyCumulative: 7.1,        // 7.1% exceed $75,000 weekly
        monthlyCumulative: 5.3,       // 5.3% exceed $300,000 monthly
        behaviourDelta: 10.2,         // 10.2% have 2.8x behavior change
        comparisonToPeers: 11.5       // 11.5% are 2.2x above peers
      },
      'High Risk Retail': {
        transactionThreshold: 18.9,   // 18.9% of high risk exceed $2,500
        dailyAggregate: 14.6,         // 14.6% exceed $7,500 daily
        velocityLimit: 15.3,          // 15.3% exceed 5 transactions/day
        weeklyCumulative: 11.8,       // 11.8% exceed $37,500 weekly
        monthlyCumulative: 9.4,       // 9.4% exceed $150,000 monthly
        behaviourDelta: 14.7,         // 14.7% have 2.0x behavior change
        comparisonToPeers: 16.8       // 16.8% are 2.8x above peers
      },
      'Corporate Clients': {
        transactionThreshold: 6.2,    // 6.2% exceed $50,000
        dailyAggregate: 4.1,          // 4.1% exceed $150,000 daily
        velocityLimit: 5.8,           // 5.8% exceed 25 transactions/day
        weeklyCumulative: 3.2,        // 3.2% exceed $750,000 weekly
        monthlyCumulative: 2.4,       // 2.4% exceed $3,000,000 monthly
        behaviourDelta: 4.9,          // 4.9% have 4.2x behavior change
        comparisonToPeers: 7.3        // 7.3% are 1.5x above peers
      },
      'High Net Worth': {
        transactionThreshold: 11.4,   // 11.4% exceed $25,000
        dailyAggregate: 8.1,          // 8.1% exceed $75,000 daily
        velocityLimit: 9.6,           // 9.6% exceed 20 transactions/day
        weeklyCumulative: 6.3,        // 6.3% exceed $375,000 weekly
        monthlyCumulative: 4.7,       // 4.7% exceed $1,500,000 monthly
        behaviourDelta: 8.7,          // 8.7% have 3.0x behavior change
        comparisonToPeers: 10.2       // 10.2% are 2.0x above peers
      },
      'International': {
        transactionThreshold: 14.8,   // 14.8% exceed $7,500
        dailyAggregate: 11.3,         // 11.3% exceed $22,500 daily
        velocityLimit: 12.1,          // 12.1% exceed 8 transactions/day
        weeklyCumulative: 8.9,        // 8.9% exceed $112,500 weekly
        monthlyCumulative: 7.2,       // 7.2% exceed $450,000 monthly
        behaviourDelta: 13.5,         // 13.5% have 2.5x behavior change
        comparisonToPeers: 15.9       // 15.9% are 3.2x above peers
      }
    };

    // Get base percentiles or defaults
    const percentiles = basePercentiles[segment] || {
      transactionThreshold: 10.0,
      dailyAggregate: 7.0,
      velocityLimit: 8.0,
      weeklyCumulative: 5.5,
      monthlyCumulative: 4.0,
      behaviourDelta: 9.0,
      comparisonToPeers: 10.0
    };

    // Adjust percentiles based on actual threshold values (if they differ from defaults)
    // Lower thresholds = more people exceed them = higher percentile
    // Higher thresholds = fewer people exceed them = lower percentile
    const defaults = {
      'Low Risk Retail': { baseAmount: 10000, dailyAggregate: 30000, weeklyCumulative: 150000, monthlyCumulative: 600000, velocityThreshold: 15, behaviourDelta: 3.5, comparisonToPeers: 1.8 },
      'Medium Risk Retail': { baseAmount: 5000, dailyAggregate: 15000, weeklyCumulative: 75000, monthlyCumulative: 300000, velocityThreshold: 10, behaviourDelta: 2.8, comparisonToPeers: 2.2 },
      'High Risk Retail': { baseAmount: 2500, dailyAggregate: 7500, weeklyCumulative: 37500, monthlyCumulative: 150000, velocityThreshold: 5, behaviourDelta: 2.0, comparisonToPeers: 2.8 },
      'Corporate Clients': { baseAmount: 50000, dailyAggregate: 150000, weeklyCumulative: 750000, monthlyCumulative: 3000000, velocityThreshold: 25, behaviourDelta: 4.2, comparisonToPeers: 1.5 },
      'High Net Worth': { baseAmount: 25000, dailyAggregate: 75000, weeklyCumulative: 375000, monthlyCumulative: 1500000, velocityThreshold: 20, behaviourDelta: 3.0, comparisonToPeers: 2.0 },
      'International': { baseAmount: 7500, dailyAggregate: 22500, weeklyCumulative: 112500, monthlyCumulative: 450000, velocityThreshold: 8, behaviourDelta: 2.5, comparisonToPeers: 3.2 }
    };

    const defaultConfig = defaults[segment];
    if (defaultConfig) {
      // Adjust transaction threshold percentile
      const amountRatio = defaultConfig.baseAmount / config.baseAmount;
      percentiles.transactionThreshold = Math.min(25, Math.max(1, percentiles.transactionThreshold * amountRatio));

      // Adjust daily aggregate percentile
      const dailyRatio = (defaultConfig.dailyAggregate || defaultConfig.baseAmount * 3) / (config.dailyAggregate || config.baseAmount * 3);
      percentiles.dailyAggregate = Math.min(25, Math.max(1, percentiles.dailyAggregate * dailyRatio));

      // Adjust velocity percentile
      const velocityRatio = defaultConfig.velocityThreshold / config.velocityThreshold;
      percentiles.velocityLimit = Math.min(25, Math.max(1, percentiles.velocityLimit * velocityRatio));

      // Adjust weekly cumulative percentile
      const weeklyRatio = (defaultConfig.weeklyCumulative || defaultConfig.baseAmount * 15) / (config.weeklyCumulative || config.baseAmount * 15);
      percentiles.weeklyCumulative = Math.min(25, Math.max(1, percentiles.weeklyCumulative * weeklyRatio));

      // Adjust monthly cumulative percentile
      const monthlyRatio = (defaultConfig.monthlyCumulative || defaultConfig.baseAmount * 50) / (config.monthlyCumulative || config.baseAmount * 50);
      percentiles.monthlyCumulative = Math.min(25, Math.max(1, percentiles.monthlyCumulative * monthlyRatio));

      // Adjust behavior delta percentile (inverse: higher multiplier = fewer people exceed)
      const behaviorRatio = config.behaviourDelta / defaultConfig.behaviourDelta;
      percentiles.behaviourDelta = Math.min(25, Math.max(1, percentiles.behaviourDelta / behaviorRatio));

      // Adjust comparison percentile (inverse: higher multiplier = fewer people exceed)
      const comparisonRatio = config.comparisonToPeers / defaultConfig.comparisonToPeers;
      percentiles.comparisonToPeers = Math.min(25, Math.max(1, percentiles.comparisonToPeers / comparisonRatio));
    }

    return {
      transactionThreshold: Math.round(percentiles.transactionThreshold * 10) / 10,
      dailyAggregate: Math.round(percentiles.dailyAggregate * 10) / 10,
      velocityLimit: Math.round(percentiles.velocityLimit * 10) / 10,
      weeklyCumulative: Math.round(percentiles.weeklyCumulative * 10) / 10,
      monthlyCumulative: Math.round(percentiles.monthlyCumulative * 10) / 10,
      behaviourDelta: Math.round(percentiles.behaviourDelta * 10) / 10,
      comparisonToPeers: Math.round(percentiles.comparisonToPeers * 10) / 10
    };
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
          // Migrate old data: add dailyAggregate, weeklyCumulative, and monthlyCumulative if missing
          Object.keys(data.segments).forEach(segment => {
            if (data.segments[segment].baseAmount && !data.segments[segment].dailyAggregate) {
              // Calculate dailyAggregate from baseAmount (3x multiplier was the old default)
              data.segments[segment].dailyAggregate = data.segments[segment].baseAmount * 3;
            }
            if (data.segments[segment].dailyAggregate && !data.segments[segment].weeklyCumulative) {
              // Calculate weeklyCumulative from dailyAggregate (5x multiplier was the old default)
              data.segments[segment].weeklyCumulative = data.segments[segment].dailyAggregate * 5;
            }
            if (data.segments[segment].dailyAggregate && !data.segments[segment].monthlyCumulative) {
              // Calculate monthlyCumulative from dailyAggregate (20x multiplier was the old default)
              data.segments[segment].monthlyCumulative = data.segments[segment].dailyAggregate * 20;
            }
          });

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
        dailyAggregate: 30000,
        weeklyCumulative: 150000,
        monthlyCumulative: 600000,
        velocityThreshold: 15,
        behaviourDelta: 3.5,
        comparisonToPeers: 1.8
      },
      'Medium Risk Retail': {
        baseAmount: 5000,
        dailyAggregate: 15000,
        weeklyCumulative: 75000,
        monthlyCumulative: 300000,
        velocityThreshold: 10,
        behaviourDelta: 2.8,
        comparisonToPeers: 2.2
      },
      'High Risk Retail': {
        baseAmount: 2500,
        dailyAggregate: 7500,
        weeklyCumulative: 37500,
        monthlyCumulative: 150000,
        velocityThreshold: 5,
        behaviourDelta: 2.0,
        comparisonToPeers: 2.8
      },
      'Corporate Clients': {
        baseAmount: 50000,
        dailyAggregate: 150000,
        weeklyCumulative: 750000,
        monthlyCumulative: 3000000,
        velocityThreshold: 25,
        behaviourDelta: 4.2,
        comparisonToPeers: 1.5
      },
      'High Net Worth': {
        baseAmount: 25000,
        dailyAggregate: 75000,
        weeklyCumulative: 375000,
        monthlyCumulative: 1500000,
        velocityThreshold: 20,
        behaviourDelta: 3.0,
        comparisonToPeers: 2.0
      },
      'International': {
        baseAmount: 7500,
        dailyAggregate: 22500,
        weeklyCumulative: 112500,
        monthlyCumulative: 450000,
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