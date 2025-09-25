// Compliance Analysis Service - Multi-Obligation Detection and Rule Coverage Analysis

export class ComplianceAnalysisService {
  constructor() {
    // Keywords that indicate multiple obligations in requirement text
    this.multiObligationIndicators = [
      'and',
      'including:',
      'must:',
      'requirements include:',
      '(1)',
      '(2)',
      '(3)',
      '(4)',
      '(5)',
      'specific requirements include',
      'systems must:',
      'enhanced monitoring',
      'automated systems that',
      'transaction monitoring systems must'
    ];

    // Patterns that suggest distinct monitoring obligations
    this.obligationPatterns = [
      /\(\d+\)\s+[A-Z]/g,  // Numbered lists like "(1) Cash deposits"
      /:\s*\(\d+\)/g,      // Colon followed by numbered items
      /must\s+(include|implement|establish|monitor|apply|generate|flag|screen|maintain|conduct)/gi,
      /systems?\s+must:/gi,
      /requirements?\s+(include|are):/gi,
      /enhanced\s+(monitoring|scrutiny|due\s+diligence)/gi,
      /automated\s+(monitoring|systems|screening)/gi
    ];

    // Critical thresholds and indicators
    this.thresholdPatterns = [
      /\$[\d,]+/g,                    // Dollar amounts
      /\d+%/g,                        // Percentages
      /\d+\s*(hour|day|week|month)s?/g, // Time periods
      /above|below|exceeding|over|under/gi, // Comparison words
      /real-time|within\s+\d+/gi      // Time requirements
    ];
  }

  /**
   * Analyze a requirement to identify multiple obligations and assess rule coverage
   * @param {Object} clause - The requirement clause to analyze
   * @param {Array} associatedRules - Rules currently mapped to this clause
   * @returns {Object} Analysis results with warnings and recommendations
   */
  analyzeRequirementCoverage(clause, associatedRules = []) {
    const analysis = {
      clauseId: clause.id,
      title: clause.title,
      reference: clause.reference,
      hasMultipleObligations: false,
      identifiedObligations: [],
      ruleCount: associatedRules.length,
      coverageGaps: [],
      warnings: [],
      recommendations: [],
      riskLevel: 'low', // low, medium, high, critical
      confidenceScore: 0
    };

    // Detect multiple obligations in the text
    const obligations = this.extractObligations(clause.text);
    analysis.identifiedObligations = obligations;
    analysis.hasMultipleObligations = obligations.length > 1;

    // Calculate coverage assessment
    const coverage = this.assessCoverage(obligations, associatedRules);
    analysis.coverageGaps = coverage.gaps;
    analysis.confidenceScore = coverage.confidence;

    // Generate warnings based on gaps
    analysis.warnings = this.generateWarnings(obligations, associatedRules, coverage);

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(obligations, associatedRules, coverage);

    // Determine overall risk level
    analysis.riskLevel = this.calculateRiskLevel(obligations, associatedRules, coverage);

    return analysis;
  }

  /**
   * Extract distinct obligations from requirement text
   * @param {string} text - The requirement text to analyze
   * @returns {Array} List of identified obligations
   */
  extractObligations(text) {
    const obligations = [];
    let obligationCounter = 0;

    // Look for numbered lists with improved pattern that handles consecutive numbering
    const numberedPattern = /\(\d+\)\s+([^(]+?)(?=\s*\(\d+\)|$)/g;
    let match;
    while ((match = numberedPattern.exec(text)) !== null) {
      const obligationText = match[1].trim().replace(/[,.]?\s*(and\s*)?$/, '');
      if (obligationText.length > 10) { // Filter out very short matches
        obligations.push({
          id: `obligation-${++obligationCounter}`,
          type: 'numbered',
          text: obligationText,
          number: match[0].match(/\(\d+\)/)[0],
          indicators: ['numbered_list'],
          priority: 'high'
        });
      }
    }

    // Only look for "must" clauses if we don't have numbered obligations (to avoid duplication)
    if (obligations.length === 0) {
      const mustMatches = text.match(/must\s+[^.]+[.]/gi) || [];
      mustMatches.forEach(match => {
        obligations.push({
          id: `obligation-${++obligationCounter}`,
          type: 'must_clause',
          text: match.trim(),
          indicators: ['must_requirement'],
          priority: 'medium'
        });
      });
    }

    // Only look for threshold requirements if we don't have numbered obligations (to avoid duplication)
    if (obligations.length === 0) {
      const thresholdMatches = text.match(/\$[\d,]+[^.]*[.]/g) || [];
      thresholdMatches.forEach(match => {
        obligations.push({
          id: `obligation-${++obligationCounter}`,
          type: 'threshold',
          text: match.trim(),
          indicators: ['threshold_requirement'],
          priority: 'high'
        });
      });
    }

    // If no specific obligations found but text is long, create general obligations
    if (obligations.length === 0 && text.length > 200) {
      // Split by sentences and group related concepts
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
      if (sentences.length > 2) {
        obligations.push({
          id: `obligation-${++obligationCounter}`,
          type: 'general',
          text: 'Multiple monitoring requirements identified in clause text',
          indicators: ['complex_text'],
          priority: 'medium'
        });
      }
    }

    return obligations.slice(0, 8); // Limit to prevent overwhelming UI
  }

  /**
   * Check if a rule semantically covers a specific obligation
   * @param {Object} rule - The monitoring rule
   * @param {Object} obligation - The obligation to check
   * @returns {Object} Coverage assessment with confidence score
   */
  checkRuleObligationMatch(rule, obligation) {
    const ruleText = `${rule.name} ${rule.description} ${rule.category || ''}`.toLowerCase();
    const obligationText = obligation.text.toLowerCase();
    const obligationNumber = obligation.number || '';

    // Define semantic keywords for different obligation types
    const keywords = {
      cash: ['cash', 'deposit', 'withdrawal', 'currency', 'structuring', '$8,000', '$10,000', 'ctr'],
      wire: ['wire', 'transfer', 'swift', 'beneficiary', 'cross-border', 'remittance'],
      velocity: ['velocity', 'frequency', 'volume', 'pattern', 'unusual', 'anomal', 'deviation', 'baseline'],
      business: ['business', 'commercial', 'corporate', 'company', 'ratio', 'cash-to-deposit'],
      crossBorder: ['cross-border', 'international', 'foreign', 'jurisdiction', 'country', 'fatf', 'high-risk'],
      threshold: ['threshold', 'limit', 'exceed', 'above', 'below', '$'],
      realTime: ['real-time', 'immediate', 'instant', 'alert', 'notification']
    };

    let matchScore = 0;
    let matchedKeywords = [];
    let coverage = 'none';

    // Extract key concepts from obligation text
    const obligationKeywords = {
      hasCash: /cash|deposit|structuring|\$8,?000|\$10,?000/.test(obligationText),
      hasWire: /wire|transfer|beneficiar|cross-border/.test(obligationText),
      hasVelocity: /velocity|frequenc|pattern|200%|baseline/.test(obligationText),
      hasBusiness: /business|commercial|ratio|40%/.test(obligationText),
      hasCrossBorder: /cross-border|jurisdiction|fatf|\$5,?000/.test(obligationText),
      hasThreshold: /\$\d+|exceed|above|below/.test(obligationText),
      hasRealTime: /real-time|alert|immediate/.test(obligationText)
    };

    // Check rule coverage for each obligation type
    if (obligationKeywords.hasCash && keywords.cash.some(kw => ruleText.includes(kw))) {
      matchScore += 0.8;
      matchedKeywords.push('cash monitoring');
      coverage = 'high';
    }

    if (obligationKeywords.hasWire && keywords.wire.some(kw => ruleText.includes(kw))) {
      matchScore += 0.7;
      matchedKeywords.push('wire transfer');
      coverage = coverage === 'high' ? 'high' : 'medium';
    }

    if (obligationKeywords.hasVelocity && keywords.velocity.some(kw => ruleText.includes(kw))) {
      matchScore += 0.6;
      matchedKeywords.push('velocity tracking');
      coverage = coverage === 'none' ? 'medium' : coverage;
    }

    if (obligationKeywords.hasBusiness && keywords.business.some(kw => ruleText.includes(kw))) {
      matchScore += 0.5;
      matchedKeywords.push('business monitoring');
      coverage = coverage === 'none' ? 'low' : coverage;
    }

    if (obligationKeywords.hasCrossBorder && keywords.crossBorder.some(kw => ruleText.includes(kw))) {
      matchScore += 0.7;
      matchedKeywords.push('cross-border');
      coverage = coverage === 'none' ? 'medium' : coverage;
    }

    // Adjust coverage based on match score
    if (matchScore >= 0.7) coverage = 'high';
    else if (matchScore >= 0.4) coverage = 'medium';
    else if (matchScore >= 0.2) coverage = 'low';
    else coverage = 'none';

    return {
      rule,
      obligation,
      coverage,
      confidence: Math.min(0.95, matchScore),
      matchedKeywords,
      reasoning: matchedKeywords.length > 0
        ? `Rule covers: ${matchedKeywords.join(', ')}`
        : 'No semantic match found between rule and obligation'
    };
  }

  /**
   * Assess how well current rules cover identified obligations
   * @param {Array} obligations - Identified obligations
   * @param {Array} rules - Associated rules
   * @returns {Object} Coverage assessment
   */
  assessCoverage(obligations, rules) {
    const coverage = {
      totalObligations: obligations.length,
      rulesProvided: rules.length,
      estimatedRulesNeeded: obligations.length, // For numbered obligations, expect 1 rule per obligation
      gaps: [],
      confidence: 0,
      ruleObligationMapping: []
    };

    // Basic coverage assessment
    if (obligations.length === 0) {
      coverage.confidence = rules.length > 0 ? 0.8 : 0.9;
      return coverage;
    }

    if (rules.length === 0) {
      coverage.gaps = obligations.map((o, index) => ({
        type: 'no_rules',
        obligation: o,
        severity: 'critical',
        description: `No monitoring rule covers obligation ${o.number || (index + 1)}: ${o.text.substring(0, 80)}...`
      }));
      coverage.confidence = 0.95;
      return coverage;
    }

    // For numbered obligations, analyze specific semantic mapping
    const hasNumberedObligations = obligations.some(o => o.type === 'numbered');

    if (hasNumberedObligations) {
      const numberedObligations = obligations.filter(o => o.type === 'numbered');

      // Perform semantic matching for each obligation against each rule
      const semanticMappings = [];
      numberedObligations.forEach(obligation => {
        const ruleMatches = rules.map(rule => this.checkRuleObligationMatch(rule, obligation));
        const bestMatch = ruleMatches.reduce((best, current) =>
          current.confidence > best.confidence ? current : best,
          { coverage: 'none', confidence: 0 }
        );

        semanticMappings.push({
          obligation: obligation,
          bestMatch: bestMatch,
          allMatches: ruleMatches,
          coverageStatus: bestMatch.coverage !== 'none' ? 'covered' : 'uncovered',
          coverageLevel: bestMatch.coverage
        });

        coverage.ruleObligationMapping.push({
          obligation: obligation,
          rulesCovering: bestMatch.coverage !== 'none' ? [bestMatch.rule] : [],
          coverageStatus: bestMatch.coverage !== 'none' ? 'covered' : 'uncovered',
          coverageLevel: bestMatch.coverage,
          reasoning: bestMatch.reasoning
        });
      });

      // Calculate coverage gaps based on semantic analysis
      const uncoveredObligations = semanticMappings
        .filter(mapping => mapping.coverageStatus === 'uncovered')
        .map(mapping => mapping.obligation);

      const partiallyCoveredObligations = semanticMappings
        .filter(mapping => mapping.coverageLevel === 'low' || mapping.coverageLevel === 'medium')
        .map(mapping => mapping.obligation);

      // Update estimated rules needed based on coverage gaps
      const fullyCovered = semanticMappings.filter(m => m.coverageLevel === 'high').length;
      const partiallyCovered = partiallyCoveredObligations.length;
      const uncovered = uncoveredObligations.length;

      coverage.estimatedRulesNeeded = uncovered + Math.ceil(partiallyCovered * 0.5);

      if (uncoveredObligations.length > 0) {
        coverage.gaps.push({
          type: 'uncovered_obligations',
          severity: uncoveredObligations.length > 2 ? 'critical' : 'high',
          description: `${uncoveredObligations.length} obligation${uncoveredObligations.length > 1 ? 's' : ''} have no rule coverage`,
          obligationsNotCovered: uncoveredObligations,
          recommendedRuleCount: uncoveredObligations.length,
          specificGaps: uncoveredObligations.map(o => `${o.number} ${o.text.substring(0, 60)}...`)
        });
      }

      if (partiallyCoveredObligations.length > 0) {
        coverage.gaps.push({
          type: 'partial_coverage',
          severity: 'medium',
          description: `${partiallyCoveredObligations.length} obligation${partiallyCoveredObligations.length > 1 ? 's' : ''} have only partial rule coverage`,
          obligationsNotCovered: partiallyCoveredObligations,
          specificGaps: partiallyCoveredObligations.map(o => `${o.number} ${o.text.substring(0, 60)}... (${semanticMappings.find(m => m.obligation === o)?.coverageLevel} coverage)`)
        });
      }

      // Check for single rule trying to cover multiple distinct obligations
      if (rules.length === 1 && numberedObligations.length > 1) {
        const singleRuleCoverage = semanticMappings.filter(m => m.coverageStatus === 'covered').length;
        if (singleRuleCoverage > 1) {
          coverage.gaps.push({
            type: 'single_rule_multiple_obligations',
            severity: 'medium',
            description: `One rule provides coverage for ${singleRuleCoverage} distinct obligations`,
            specificObligations: semanticMappings.filter(m => m.coverageStatus === 'covered').map(m => m.obligation),
            recommendation: `Consider dedicated rules for better coverage granularity`
          });
        }
      }
    } else {
      // For non-numbered obligations, use original logic
      const highPriorityObligations = obligations.filter(o => o.priority === 'high').length;
      const mediumPriorityObligations = obligations.filter(o => o.priority === 'medium').length;

      coverage.estimatedRulesNeeded = Math.ceil(
        highPriorityObligations * 1 + mediumPriorityObligations * 0.7
      );

      if (rules.length < coverage.estimatedRulesNeeded) {
        const shortfall = coverage.estimatedRulesNeeded - rules.length;
        coverage.gaps.push({
          type: 'insufficient_rules',
          severity: shortfall > 1 ? 'high' : 'medium',
          description: `${shortfall} additional monitoring rule${shortfall > 1 ? 's' : ''} recommended`,
          obligationsNotCovered: obligations.slice(rules.length),
          recommendedRuleCount: coverage.estimatedRulesNeeded
        });
      }
    }

    // Calculate confidence score
    coverage.confidence = Math.min(0.95, 0.7 + (0.05 * Math.min(rules.length, obligations.length)));

    return coverage;
  }

  /**
   * Generate warnings based on coverage analysis
   * @param {Array} obligations - Identified obligations
   * @param {Array} rules - Associated rules
   * @param {Object} coverage - Coverage assessment
   * @returns {Array} List of warnings
   */
  generateWarnings(obligations, rules, coverage) {
    const warnings = [];

    // No rules warning
    if (rules.length === 0) {
      warnings.push({
        type: 'no_coverage',
        severity: 'critical',
        title: 'No Monitoring Rules',
        message: 'This requirement has no associated monitoring rules',
        icon: 'alert-triangle',
        color: 'red'
      });
    }

    // Enhanced warnings based on semantic coverage analysis
    coverage.gaps.forEach(gap => {
      if (gap.type === 'uncovered_obligations') {
        warnings.push({
          type: 'uncovered_obligations',
          severity: gap.severity,
          title: 'Uncovered Obligations',
          message: gap.description,
          details: `${gap.obligationsNotCovered.length} obligation${gap.obligationsNotCovered.length > 1 ? 's' : ''} have no semantic match with existing monitoring rules.`,
          specificGaps: gap.specificGaps,
          icon: 'alert-triangle',
          color: gap.severity === 'critical' ? 'red' : 'orange'
        });
      }

      if (gap.type === 'partial_coverage') {
        warnings.push({
          type: 'partial_coverage',
          severity: gap.severity,
          title: 'Partial Rule Coverage',
          message: gap.description,
          details: `These obligations have some rule coverage but may need additional specialized monitoring.`,
          specificGaps: gap.specificGaps,
          icon: 'alert-circle',
          color: 'yellow'
        });
      }

      if (gap.type === 'single_rule_multiple_obligations') {
        warnings.push({
          type: 'single_rule_coverage',
          severity: gap.severity,
          title: 'Single Rule Covers Multiple Obligations',
          message: gap.description,
          details: gap.recommendation,
          specificObligations: gap.specificObligations,
          icon: 'layers',
          color: 'yellow'
        });
      }

      // Legacy support for old gap types
      if (gap.type === 'insufficient_rules') {
        const hasNumbered = obligations.some(o => o.type === 'numbered');
        warnings.push({
          type: 'insufficient_coverage',
          severity: gap.severity,
          title: hasNumbered ? 'Missing Rules for Numbered Obligations' : 'Insufficient Rule Coverage',
          message: gap.description,
          details: hasNumbered
            ? `Found ${obligations.length} numbered obligations but only ${rules.length} monitoring rule${rules.length !== 1 ? 's' : ''}. Each numbered obligation typically requires its own dedicated rule.`
            : `Found ${obligations.length} distinct obligations but only ${rules.length} monitoring rule${rules.length !== 1 ? 's' : ''}`,
          specificGaps: gap.specificGaps,
          icon: 'alert-circle',
          color: gap.severity === 'critical' ? 'red' : gap.severity === 'high' ? 'orange' : 'yellow'
        });
      }
    });

    // Numbered obligations warning
    const numberedGap = coverage.gaps.find(g => g.type === 'numbered_obligations');
    if (numberedGap) {
      warnings.push({
        type: 'numbered_obligations',
        severity: 'high',
        title: 'Multiple Numbered Requirements',
        message: `Found ${numberedGap.specificObligations.length} numbered obligations with only ${rules.length} rule${rules.length !== 1 ? 's' : ''}`,
        details: 'Each numbered requirement typically needs its own monitoring rule',
        icon: 'list',
        color: 'orange'
      });
    }

    // Complex requirement warning
    if (obligations.length >= 4 && rules.length <= 2) {
      warnings.push({
        type: 'complex_requirement',
        severity: 'medium',
        title: 'Complex Requirement Detection',
        message: `Complex requirement with ${obligations.length} obligations may need additional rules`,
        details: 'Consider whether each obligation is adequately monitored',
        icon: 'layers',
        color: 'yellow'
      });
    }

    return warnings;
  }

  /**
   * Generate recommendations for improving coverage
   * @param {Array} obligations - Identified obligations
   * @param {Array} rules - Associated rules
   * @param {Object} coverage - Coverage assessment
   * @returns {Array} List of recommendations
   */
  generateRecommendations(obligations, rules, coverage) {
    const recommendations = [];

    if (rules.length === 0) {
      recommendations.push({
        type: 'create_rules',
        priority: 'critical',
        title: 'Create Monitoring Rules',
        description: `Create ${coverage.estimatedRulesNeeded} monitoring rule${coverage.estimatedRulesNeeded !== 1 ? 's' : ''} to cover identified obligations`,
        action: 'Create Rules'
      });
    }

    const shortfall = coverage.estimatedRulesNeeded - rules.length;
    if (shortfall > 0) {
      recommendations.push({
        type: 'add_rules',
        priority: shortfall > 2 ? 'high' : 'medium',
        title: 'Add Additional Rules',
        description: `Consider adding ${shortfall} more rule${shortfall !== 1 ? 's' : ''} to fully cover all obligations`,
        action: 'Review Coverage'
      });
    }

    // Specific recommendations for numbered obligations
    const numberedObs = obligations.filter(o => o.type === 'numbered');
    if (numberedObs.length > 1 && rules.length === 1) {
      recommendations.push({
        type: 'split_rules',
        priority: 'high',
        title: 'Split Monitoring Rules',
        description: `Consider separate rules for each of the ${numberedObs.length} numbered obligations`,
        action: 'Analyze Obligations'
      });
    }

    // Threshold-specific recommendations
    const thresholdObs = obligations.filter(o => o.type === 'threshold');
    if (thresholdObs.length > 0 && rules.length === 1) {
      recommendations.push({
        type: 'threshold_rules',
        priority: 'medium',
        title: 'Threshold Monitoring',
        description: 'Multiple thresholds may require separate monitoring approaches',
        action: 'Review Thresholds'
      });
    }

    return recommendations;
  }

  /**
   * Calculate overall risk level for the coverage gap
   * @param {Array} obligations - Identified obligations
   * @param {Array} rules - Associated rules
   * @param {Object} coverage - Coverage assessment
   * @returns {string} Risk level: low, medium, high, critical
   */
  calculateRiskLevel(obligations, rules, coverage) {
    if (rules.length === 0) return 'critical';

    const shortfall = coverage.estimatedRulesNeeded - rules.length;
    const hasHighPriority = obligations.some(o => o.priority === 'high');
    const hasNumbered = obligations.some(o => o.type === 'numbered');

    if (shortfall > 2 && hasHighPriority) return 'critical';
    if (shortfall > 1 && (hasHighPriority || hasNumbered)) return 'high';
    if (shortfall > 0 || obligations.length > 3) return 'medium';

    return 'low';
  }

  /**
   * Get coverage analysis for multiple clauses
   * @param {Array} clauses - Array of clauses to analyze
   * @param {Function} getRulesFn - Function to get rules for a clause ID
   * @returns {Array} Array of analysis results
   */
  analyzeBulkCoverage(clauses, getRulesFn) {
    return clauses.map(clause => {
      const rules = getRulesFn(clause.id);
      return this.analyzeRequirementCoverage(clause, rules);
    }).filter(analysis => analysis.warnings.length > 0); // Only return items with warnings
  }

  /**
   * Get summary statistics for coverage across all requirements
   * @param {Array} analyses - Array of analysis results
   * @returns {Object} Summary statistics
   */
  getCoverageSummary(analyses) {
    return {
      totalRequirements: analyses.length,
      requirementsWithWarnings: analyses.filter(a => a.warnings.length > 0).length,
      criticalGaps: analyses.filter(a => a.riskLevel === 'critical').length,
      highRiskGaps: analyses.filter(a => a.riskLevel === 'high').length,
      averageObligationsPerRequirement: analyses.reduce((sum, a) => sum + a.identifiedObligations.length, 0) / analyses.length || 0,
      averageRulesPerRequirement: analyses.reduce((sum, a) => sum + a.ruleCount, 0) / analyses.length || 0
    };
  }
}

// Export singleton instance
export const complianceAnalysisService = new ComplianceAnalysisService();