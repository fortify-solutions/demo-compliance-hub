// Rule Service - Monitoring Rules Data Management
import { rules as rawRules } from '../mockData';

export class RuleService {
  constructor() {
    this.rules = rawRules;
    this.performanceCache = new Map();
  }

  // Get all rules
  getAllRules() {
    return this.rules;
  }

  // Get rule by ID
  getRuleById(id) {
    return this.rules.find(rule => rule.id === id);
  }

  // Get rules for a specific clause
  getRulesForClause(clauseId) {
    return this.rules.filter(rule =>
      rule.linkedClauses && rule.linkedClauses.includes(clauseId)
    );
  }

  // Alias for getRulesForClause to match component usage
  getRulesByClauseId(clauseId) {
    return this.getRulesForClause(clauseId);
  }

  // Get rules by category
  getRulesByCategory(category) {
    return this.rules.filter(rule => rule.category === category);
  }

  // Get rules by metadata filters
  filterRules(filters = {}) {
    let filteredRules = this.rules;

    // Filter by jurisdiction
    if (filters.jurisdiction) {
      filteredRules = filteredRules.filter(rule =>
        rule.metadata.jurisdiction.includes(filters.jurisdiction)
      );
    }

    // Filter by product type
    if (filters.productType) {
      filteredRules = filteredRules.filter(rule =>
        rule.metadata.productType.includes(filters.productType)
      );
    }

    // Filter by customer type
    if (filters.customerType) {
      filteredRules = filteredRules.filter(rule =>
        rule.metadata.customerType.includes(filters.customerType)
      );
    }

    // Filter by risk level
    if (filters.riskLevel) {
      filteredRules = filteredRules.filter(rule =>
        rule.metadata.riskLevel === filters.riskLevel
      );
    }

    // Filter by performance threshold
    if (filters.minTruePositiveRate) {
      filteredRules = filteredRules.filter(rule =>
        rule.performance.truePositiveRate >= filters.minTruePositiveRate
      );
    }

    return filteredRules;
  }

  // Calculate rule performance metrics
  calculateRuleMetrics(ruleId) {
    const cacheKey = `metrics_${ruleId}`;
    if (this.performanceCache.has(cacheKey)) {
      return this.performanceCache.get(cacheKey);
    }

    const rule = this.getRuleById(ruleId);
    if (!rule) return null;

    const metrics = {
      efficiency: this.calculateEfficiency(rule),
      coverage: this.calculateCoverage(rule),
      riskScore: this.calculateRiskScore(rule),
      trend: this.calculateTrend(rule),
      recommendations: this.generateRecommendations(rule)
    };

    this.performanceCache.set(cacheKey, metrics);
    return metrics;
  }

  // Calculate rule efficiency (true positive rate vs false positive burden)
  calculateEfficiency(rule) {
    const { truePositiveRate, alertsPerMonth, alertsInvestigated } = rule.performance;
    const falsePositiveRate = 1 - truePositiveRate;
    const investigationLoad = alertsInvestigated / alertsPerMonth;

    return {
      score: (truePositiveRate * 100) - (falsePositiveRate * investigationLoad * 50),
      rating: truePositiveRate > 0.8 ? 'excellent' :
              truePositiveRate > 0.6 ? 'good' :
              truePositiveRate > 0.4 ? 'fair' : 'poor'
    };
  }

  // Calculate coverage metrics
  calculateCoverage(rule) {
    const coverage = rule.coverage || {};
    const weights = {
      transaction: 0.3,
      customer: 0.25,
      geographic: 0.2,
      operational: 0.25
    };

    let weightedScore = 0;
    let totalWeight = 0;

    Object.keys(weights).forEach(type => {
      if (coverage[type] !== undefined) {
        weightedScore += coverage[type] * weights[type];
        totalWeight += weights[type];
      }
    });

    const overallCoverage = totalWeight > 0 ? weightedScore / totalWeight : 0;

    return {
      overall: overallCoverage,
      breakdown: coverage,
      gaps: this.identifyCoverageGaps(coverage)
    };
  }

  // Calculate risk score based on rule effectiveness
  calculateRiskScore(rule) {
    const { truePositiveRate, backtestScore } = rule.performance;
    const riskLevel = rule.metadata.riskLevel;

    const riskMultipliers = {
      critical: 1.0,
      high: 0.8,
      medium: 0.6,
      low: 0.4
    };

    const baseScore = (truePositiveRate + backtestScore / 100) / 2;
    const adjustedScore = baseScore * (riskMultipliers[riskLevel] || 0.5);

    return {
      score: Math.round(adjustedScore * 100),
      level: adjustedScore > 0.8 ? 'low-risk' :
             adjustedScore > 0.6 ? 'medium-risk' :
             adjustedScore > 0.4 ? 'high-risk' : 'critical-risk'
    };
  }

  // Calculate performance trend (simulated for demo)
  calculateTrend(rule) {
    // In a real system, this would analyze historical performance data
    const currentTpr = rule.performance.truePositiveRate;
    const trendDirection = Math.random() > 0.5 ? 'improving' : 'declining';
    const changePercent = (Math.random() * 10 - 5).toFixed(1);

    return {
      direction: trendDirection,
      change: changePercent,
      confidence: Math.random() > 0.3 ? 'high' : 'medium'
    };
  }

  // Generate recommendations for rule optimization
  generateRecommendations(rule) {
    const recommendations = [];
    const { truePositiveRate, alertsPerMonth, alertsInvestigated } = rule.performance;

    // Performance recommendations
    if (truePositiveRate < 0.5) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message: 'Consider tuning thresholds to reduce false positives',
        action: 'tune_thresholds'
      });
    }

    // Volume recommendations
    if (alertsPerMonth > alertsInvestigated * 2) {
      recommendations.push({
        type: 'volume',
        priority: 'medium',
        message: 'High alert volume may be overwhelming investigation capacity',
        action: 'review_volume'
      });
    }

    // Coverage recommendations
    const coverage = rule.coverage || {};
    Object.keys(coverage).forEach(type => {
      if (coverage[type] < 70) {
        recommendations.push({
          type: 'coverage',
          priority: 'medium',
          message: `Low ${type} coverage (${coverage[type]}%) may create blind spots`,
          action: `improve_${type}_coverage`
        });
      }
    });

    return recommendations;
  }

  // Identify coverage gaps
  identifyCoverageGaps(coverage) {
    const gaps = [];
    const threshold = 80;

    Object.entries(coverage).forEach(([type, percentage]) => {
      if (percentage < threshold) {
        gaps.push({
          type,
          percentage,
          severity: percentage < 50 ? 'high' :
                   percentage < 70 ? 'medium' : 'low'
        });
      }
    });

    return gaps;
  }

  // Get rule performance summary
  getRulePerformanceSummary() {
    const summary = {
      totalRules: this.rules.length,
      averageTruePositiveRate: 0,
      totalAlertsPerMonth: 0,
      rulesByCategory: {},
      performanceDistribution: {
        excellent: 0,
        good: 0,
        fair: 0,
        poor: 0
      }
    };

    let totalTpr = 0;

    this.rules.forEach(rule => {
      // Calculate averages
      totalTpr += rule.performance.truePositiveRate;
      summary.totalAlertsPerMonth += rule.performance.alertsPerMonth;

      // Category breakdown
      summary.rulesByCategory[rule.category] =
        (summary.rulesByCategory[rule.category] || 0) + 1;

      // Performance distribution
      const tpr = rule.performance.truePositiveRate;
      if (tpr >= 0.8) summary.performanceDistribution.excellent++;
      else if (tpr >= 0.6) summary.performanceDistribution.good++;
      else if (tpr >= 0.4) summary.performanceDistribution.fair++;
      else summary.performanceDistribution.poor++;
    });

    summary.averageTruePositiveRate =
      this.rules.length > 0 ? totalTpr / this.rules.length : 0;

    return summary;
  }

  // Search rules by name or description
  searchRules(query, options = {}) {
    const { limit = 20 } = options;
    const searchTerm = query.toLowerCase();

    const results = this.rules
      .map(rule => {
        let score = 0;

        if (rule.name.toLowerCase().includes(searchTerm)) score += 100;
        if (rule.description.toLowerCase().includes(searchTerm)) score += 50;
        if (rule.category.toLowerCase().includes(searchTerm)) score += 30;

        return { rule, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.rule);

    return results;
  }

  // Clear performance cache
  clearCache() {
    this.performanceCache.clear();
  }
}

// Export singleton instance
export const ruleService = new RuleService();