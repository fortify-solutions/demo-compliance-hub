// Mock data for AML Audit Flow System

// Score conversion utility: Convert percentage (0-100) to 1-5 scale
const convertPercentageToFiveScale = (percentage) => {
  if (percentage >= 90) return 5;
  if (percentage >= 80) return 4;
  if (percentage >= 70) return 3;
  if (percentage >= 60) return 2;
  return 1;
};

// Data validation utilities
export const validateDocumentData = (documents) => {
  if (!Array.isArray(documents)) {
    throw new Error('Documents must be an array');
  }
  
  documents.forEach(doc => {
    if (!doc.id || !doc.title || !doc.clauses) {
      throw new Error(`Invalid document structure: ${doc.id || 'unknown'}`);
    }
    
    if (!Array.isArray(doc.clauses)) {
      throw new Error(`Document clauses must be an array: ${doc.id}`);
    }
    
    doc.clauses.forEach(clause => {
      if (!clause.id || !clause.title || !clause.metadata) {
        throw new Error(`Invalid clause structure: ${clause.id || 'unknown'}`);
      }
    });
  });
  
  return documents;
};

export const validateAlerts = (alerts) => {
  if (!Array.isArray(alerts)) {
    throw new Error('Alerts must be an array');
  }
  
  alerts.forEach(alert => {
    if (!alert.id || !alert.type || !alert.priority) {
      throw new Error(`Invalid alert structure: ${alert.id || 'unknown'}`);
    }
  });
  
  return alerts;
};

// Regulatory Documents with hierarchical structure
export const regulatoryDocuments = [
  {
    id: 'bsa',
    title: 'Bank Secrecy Act',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2023-12-15',
    visible: false,
    clauses: [
      {
        id: 'bsa-1020-210',
        title: 'Anti-Money Laundering Program Requirements',
        reference: '31 CFR § 1020.210',
        text: 'Each bank shall develop and implement a written anti-money laundering program that includes four pillars: internal controls, independent testing, training, and designation of a compliance officer. Internal controls must include automated transaction monitoring systems capable of detecting cash transactions above $10,000, structuring patterns across multiple accounts within 24-hour periods, and unusual transaction velocity patterns exceeding normal customer behavior by 300% or more.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-15'
        },
        evidence: [
          { id: 'ev1', type: 'rule-backtest', description: 'Cash Structuring Rule 24-Month Backtest Analysis', quality: 'excellent' },
          { id: 'ev2', type: 'parallel-run', description: 'Parallel Run Validation - New vs Legacy TM Rules', quality: 'good' },
          { id: 'ev3', type: 'threshold-sensitivity', description: 'Threshold Sensitivity Analysis - $10K CTR Rules', quality: 'excellent' }
        ],
        linkedRules: ['rule-1']
      },
      {
        id: 'bsa-complex-monitoring',
        title: 'Comprehensive Transaction Monitoring Requirements',
        reference: '31 CFR § 1020.315',
        text: 'Financial institutions must implement comprehensive transaction monitoring systems that: (1) Monitor all cash deposits exceeding $8,000 for potential structuring patterns across all customer accounts within 24-hour periods, (2) Detect unusual wire transfer patterns including round-dollar amounts above $15,000, beneficiaries in high-risk jurisdictions, and incomplete beneficiary information, (3) Flag velocity anomalies when transaction frequency increases by more than 200% compared to customer historical patterns, (4) Apply enhanced scrutiny to business accounts with cash-to-deposit ratios exceeding 40%, and (5) Generate real-time alerts for cross-border transactions above $5,000 to non-cooperative FATF jurisdictions.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev-comp-1', type: 'rule-backtest', description: 'Partial Coverage Analysis - Cash Monitoring Only', quality: 'fair' }
        ],
        linkedRules: ['rule-1']  // Only 1 rule for 5 distinct obligations
      },
      {
        id: 'bsa-1020-220',
        title: 'Customer Identification Program',
        reference: '31 CFR § 1020.220',
        text: 'Banks must establish a Customer Identification Program that includes procedures for verifying customer identity, maintaining records, and determining if customer appears on government lists.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-12'
        },
        evidence: [
          { id: 'ev4', type: 'scenario-testing', description: 'CIP Bypass Scenario Testing - Known Typologies', quality: 'excellent' },
          { id: 'ev5', type: 'model-validation', description: 'Identity Verification Algorithm Model Validation', quality: 'good' },
          { id: 'ev6', type: 'coverage-analysis', description: 'Customer Risk Tier Coverage Gap Analysis', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'bsa-1020-320-a',
        title: 'Suspicious Activity Reporting',
        reference: '31 CFR § 1020.320(a)',
        text: 'Banks must report suspicious transactions involving $5,000 or more where the bank knows, suspects, or has reason to suspect the transaction involves funds from illegal activity. This requires automated monitoring systems that can identify: (1) Cash deposits followed by immediate wire transfers within 48 hours, (2) Multiple transactions just below $10,000 reporting thresholds, (3) Transactions inconsistent with customer business purpose exceeding 200% of established transaction patterns, and (4) Cross-border wire transfers to high-risk jurisdictions above $3,000.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-18'
        },
        evidence: [
          { id: 'ev7', type: 'alert-tuning', description: 'Suspicious Transaction Alert Tuning Performance', quality: 'good' },
          { id: 'ev8', type: 'false-positive-analysis', description: 'Investigation False Positive Rate Analysis', quality: 'excellent' },
          { id: 'ev9', type: 'regulatory-lookback', description: 'FinCEN Pattern Recognition Lookback Testing', quality: 'good' }
        ],
        linkedRules: ['rule-2']
      },
      {
        id: 'bsa-1020-320-b',
        title: 'SAR Filing Timeline and Documentation',
        reference: '31 CFR § 1020.320(b)',
        text: 'Suspicious Activity Reports must be filed within 30 days of initial detection, with supporting documentation maintained for five years and made available to regulators upon request.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-22'
        },
        evidence: [
          { id: 'ev10', type: 'time-series-testing', description: 'Filing Timeline Impact on Alert Processing', quality: 'excellent' },
          { id: 'ev11', type: 'data-lineage-audit', description: 'Transaction Data Lineage and Quality Audit', quality: 'good' },
          { id: 'ev12', type: 'stress-testing', description: 'Peak Volume Transaction Processing Stress Test', quality: 'excellent' }
        ],
        linkedRules: ["rule-1"]
      },
      {
        id: 'bsa-1020-320-c',
        title: 'SAR Confidentiality Requirements',
        reference: '31 CFR § 1020.320(c)',
        text: 'Banks and their employees are prohibited from disclosing the existence of SAR filings except as specifically authorized by regulation or law enforcement request.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-01-08'
        },
        evidence: [
          { id: 'ev13', type: 'benchmark-testing', description: 'Transaction Confidentiality Rule Benchmark Testing', quality: 'good' },
          { id: 'ev14', type: 'system-integration-test', description: 'TM System Integration Testing - Core Banking', quality: 'excellent' },
          { id: 'ev15', type: 'data-quality-validation', description: 'Transaction Data Quality Validation Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'bsa-1010-313',
        title: 'Currency Transaction Reports',
        reference: '31 CFR § 1010.313',
        text: 'Banks must file Currency Transaction Reports for each transaction in currency of more than $10,000, including multiple transactions that aggregate to over $10,000 in a single day. This requires automated systems that: (1) Monitor all cash deposits and withdrawals in real-time, (2) Aggregate transactions across all customer accounts within rolling 24-hour periods, (3) Include cashier\'s checks, money orders, and traveler\'s checks as cash equivalents, (4) Apply know-your-customer exemptions only after proper due diligence, and (5) Generate alerts for transactions between $9,000-$10,000 that may indicate structuring attempts.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'high',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev16', type: 'rule-performance-testing', description: 'CTR Auto-Generation Rule Performance Testing', quality: 'excellent' },
          { id: 'ev17', type: 'aggregation-algorithm-test', description: 'Multi-Transaction Aggregation Algorithm Testing', quality: 'good' },
          { id: 'ev18', type: 'exception-handling-test', description: 'CTR Exception Processing Logic Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-1']
      },
      {
        id: 'bsa-1020-240',
        title: 'Due Diligence for Correspondent Accounts',
        reference: '31 CFR § 1020.240',
        text: 'Banks must establish due diligence procedures for correspondent accounts with foreign financial institutions, including enhanced procedures for accounts with institutions in high-risk jurisdictions. Transaction monitoring systems must: (1) Screen all correspondent banking transactions against OFAC and other sanctions lists in real-time, (2) Monitor transaction patterns for unusual volumes exceeding 150% of established baselines, (3) Flag transactions to/from countries designated as non-cooperative by FATF, (4) Review wire transfer messages for incomplete beneficiary information, and (5) Apply enhanced scrutiny to transactions above $50,000 involving shell banks or institutions in jurisdictions with weak AML controls.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev19', type: 'geographic-risk-testing', description: 'Correspondent Account Geographic Risk Rule Testing', quality: 'excellent' },
          { id: 'ev20', type: 'risk-scoring-validation', description: 'Foreign Institution Risk Scoring Model Validation', quality: 'good' },
          { id: 'ev21', type: 'jurisdiction-rule-tuning', description: 'High-Risk Jurisdiction Rule Threshold Tuning', quality: 'good' }
        ],
        linkedRules: ['rule-3']
      },
      {
        id: 'bsa-1020-250',
        title: 'Private Banking Due Diligence',
        reference: '31 CFR § 1020.250',
        text: 'Banks must establish enhanced due diligence procedures for private banking accounts, including procedures for identifying beneficial owners and source of funds verification.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['wealth-management'],
          customerType: ['individual', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-28'
        },
        evidence: [
          { id: 'ev22', type: 'transaction-pattern-analysis', description: 'Private Banking Transaction Pattern Analysis', quality: 'excellent' },
          { id: 'ev23', type: 'entity-resolution-testing', description: 'Beneficial Owner Entity Resolution Algorithm Testing', quality: 'good' },
          { id: 'ev24', type: 'velocity-threshold-testing', description: 'Source of Wealth Velocity Threshold Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-9', 'rule-10']
      },
      {
        id: 'bsa-1020-315',
        title: 'Funds Transfer Recordkeeping',
        reference: '31 CFR § 1020.315',
        text: 'Banks must maintain records for funds transfers of $3,000 or more, including originator and beneficiary information, and conduct enhanced scrutiny of incomplete wire transfers. Automated monitoring systems must: (1) Capture and validate complete SWIFT message information including ordering customer data, (2) Flag wire transfers with missing or incomplete beneficiary information for manual review, (3) Monitor for repetitive transfers just under $3,000 that may indicate structuring, (4) Cross-reference beneficiaries against sanctions and PEP lists, (5) Generate alerts for geographic patterns involving high-risk countries, and (6) Track correspondent banking relationships for concentration risk analysis.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-01'
        },
        evidence: [
          { id: 'ev25', type: 'wire-monitoring-backtest', description: 'Wire Transfer Monitoring Rule 12-Month Backtest', quality: 'excellent' },
          { id: 'ev26', type: 'incomplete-wire-testing', description: 'Incomplete Wire Data Pattern Recognition Testing', quality: 'good' },
          { id: 'ev27', type: 'beneficiary-fuzzy-matching', description: 'Wire Beneficiary Fuzzy Matching Algorithm Testing', quality: 'good' }
        ],
        linkedRules: ['rule-3']
      },
      {
        id: 'bsa-1020-400',
        title: 'Customer Due Diligence Requirements',
        reference: '31 CFR § 1020.410',
        text: 'Banks must establish and maintain written procedures for ongoing customer due diligence, including understanding customer relationships and conducting ongoing monitoring commensurate with risk.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-05'
        },
        evidence: [
          { id: 'ev28', type: 'cdd-rule-optimization', description: 'Customer Due Diligence Rule Optimization Testing', quality: 'excellent' },
          { id: 'ev29', type: 'behavior-baseline-testing', description: 'Customer Behavior Baseline Model Performance Testing', quality: 'good' },
          { id: 'ev30', type: 'risk-tier-calibration', description: 'Risk-Based Monitoring Tier Calibration Analysis', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'bsa-1020-410',
        title: 'Beneficial Ownership Requirements',
        reference: '31 CFR § 1020.410',
        text: 'Banks must establish procedures to identify and verify beneficial owners of legal entity customers, including individuals with 25% or more ownership and one individual with significant control.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-08'
        },
        evidence: [
          { id: 'ev31', type: 'network-analysis-testing', description: 'Beneficial Owner Network Analysis Algorithm Testing', quality: 'excellent' },
          { id: 'ev32', type: 'ownership-change-detection', description: 'Ownership Structure Change Detection Testing', quality: 'good' },
          { id: 'ev33', type: 'control-relationship-mapping', description: 'Control Person Relationship Mapping Validation', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'bsa-1020-500',
        title: 'Special Measures - Section 311',
        reference: '31 USC § 5318A',
        text: 'Banks must comply with special measures imposed under Section 311 against jurisdictions, institutions, or transaction types of primary money laundering concern.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-10'
        },
        evidence: [
          { id: 'ev34', type: 'special-measures-testing', description: 'Section 311 Transaction Blocking Rule Testing', quality: 'excellent' },
          { id: 'ev35', type: 'real-time-blocking-test', description: 'Real-Time Prohibited Transaction Blocking Testing', quality: 'good' },
          { id: 'ev36', type: 'regulatory-rule-deployment', description: 'Emergency Regulatory Rule Deployment Testing', quality: 'excellent' }
        ],
        linkedRules: []
      },
      {
        id: 'bsa-1020-600',
        title: 'Geographic Targeting Orders Compliance',
        reference: '31 CFR § 1020.321',
        text: 'Banks must comply with Geographic Targeting Orders requiring additional reporting for certain transactions in specified geographic areas or involving particular transaction types.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-12'
        },
        evidence: [
          { id: 'ev37', type: 'gto-rule-testing', description: 'Geographic Targeting Order Rule Implementation Testing', quality: 'good' },
          { id: 'ev38', type: 'location-based-monitoring', description: 'Location-Based Transaction Monitoring Algorithm Testing', quality: 'excellent' },
          { id: 'ev39', type: 'reporting-automation-test', description: 'GTO Automated Reporting System Testing', quality: 'good' }
        ],
        linkedRules: ["rule-8"]
      },
      {
        id: 'bsa-1020-700',
        title: 'Training and Awareness Programs',
        reference: '31 CFR § 1020.210(b)(2)',
        text: 'Banks must provide ongoing training for employees on AML requirements, red flag indicators, and reporting procedures appropriate to their functions and responsibilities.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-15'
        },
        evidence: [
          { id: 'ev40', type: 'user-acceptance-testing', description: 'TM System User Acceptance Testing Results', quality: 'excellent' },
          { id: 'ev41', type: 'workflow-testing', description: 'Alert Investigation Workflow Testing', quality: 'good' },
          { id: 'ev42', type: 'training-data-validation', description: 'ML Model Training Data Validation Testing', quality: 'good' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'bsa-1020-800',
        title: 'Independent Testing Requirements',
        reference: '31 CFR § 1020.210(b)(3)',
        text: 'Banks must conduct independent testing of their AML program on a periodic basis, with testing scope, frequency, and procedures commensurate with the institution\'s risk profile.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-18'
        },
        evidence: [
          { id: 'ev43', type: 'penetration-testing', description: 'AML System Security Penetration Testing Results', quality: 'excellent' },
          { id: 'ev44', type: 'load-testing', description: 'Transaction Volume Load Testing Results', quality: 'good' },
          { id: 'ev45', type: 'disaster-recovery-testing', description: 'TM System Disaster Recovery Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2', 'rule-3']
      },
      {
        id: 'bsa-1020-900',
        title: 'AML Compliance Officer Requirements',
        reference: '31 CFR § 1020.210(b)(4)',
        text: 'Banks must designate an individual or individuals responsible for AML compliance, with sufficient authority, independence, and resources to effectively implement the AML program.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-20'
        },
        evidence: [
          { id: 'ev46', type: 'governance-testing', description: 'AML Governance Framework Model Testing', quality: 'excellent' },
          { id: 'ev47', type: 'escalation-testing', description: 'Alert Escalation Workflow Testing', quality: 'good' },
          { id: 'ev48', type: 'capacity-testing', description: 'System Capacity and Resource Testing', quality: 'good' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'bsa-1020-1000',
        title: 'BSA Recordkeeping Requirements',
        reference: '31 CFR § 1020.315',
        text: 'Banks must maintain BSA-related records for specified time periods, ensure records are readily accessible to regulators, and establish procedures for record retention and destruction.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-22'
        },
        evidence: [
          { id: 'ev49', type: 'data-retention-testing', description: 'Transaction Data Retention Rule Testing', quality: 'excellent' },
          { id: 'ev50', type: 'api-testing', description: 'Regulatory Data Access API Testing', quality: 'good' },
          { id: 'ev51', type: 'archival-testing', description: 'Historical Transaction Data Archival Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'bsa-1020-1100',
        title: 'Internal Controls and Audit Function',
        reference: '31 CFR § 1020.210(b)(1)',
        text: 'Banks must establish internal controls to ensure ongoing compliance with BSA requirements, including segregation of duties, dual controls, and management oversight of AML functions.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-25'
        },
        evidence: [
          { id: 'ev52', type: 'control-framework-testing', description: 'Internal Control Framework Validation Testing', quality: 'excellent' },
          { id: 'ev53', type: 'access-control-testing', description: 'Role-Based Access Control Testing', quality: 'good' },
          { id: 'ev54', type: 'reporting-automation-testing', description: 'Automated Management Reporting Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2', 'rule-3']
      }
    ]
  },
  {
    id: 'patriot',
    title: 'USA PATRIOT Act',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2023-11-30',
    visible: false,
    clauses: [
      {
        id: 'patriot-326-a',
        title: 'Enhanced Transaction Monitoring',
        reference: 'Section 326(a)',
        text: 'Financial institutions shall implement enhanced transaction monitoring procedures for higher-risk customers and transactions, with appropriate documentation and escalation procedures. Enhanced monitoring must include: (1) Real-time transaction screening against customer risk profiles with thresholds 50% lower than standard customers, (2) Velocity monitoring that triggers alerts when transaction frequency exceeds customer\'s historical patterns by 200%, (3) Cross-border transaction monitoring with enhanced scrutiny for amounts above $10,000 to countries with weak AML controls, (4) Cash-intensive business monitoring with daily cash deposit limits based on business type, and (5) Automated escalation to compliance officers within 2 hours for transactions exceeding $50,000 from high-risk customers.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'high',
          lastReviewed: '2023-12-01'
        },
        evidence: [
          { id: 'ev8', type: 'policy-documentation', description: 'Enhanced Monitoring Policy and Procedures', quality: 'excellent' },
          { id: 'ev9', type: 'training-records', description: 'Staff Transaction Monitoring Training', quality: 'good' }
        ],
        linkedRules: ['rule-8', 'rule-9']
      },
      {
        id: 'patriot-326-b',
        title: 'Risk-Based Transaction Parameters',
        reference: 'Section 326(b)',
        text: 'Transaction monitoring systems must include risk-based parameters that account for customer profiles, geographic factors, and transaction patterns. Specific requirements include: (1) Customer risk scoring algorithms that adjust transaction thresholds based on account age, transaction history, and business type, (2) Geographic risk matrices that apply enhanced monitoring to transactions involving countries with FATF deficiencies, (3) Pattern recognition systems capable of detecting structuring across multiple accounts within 7-day periods, (4) Behavioral analytics that establish baselines for individual customers and trigger alerts for deviations exceeding 250% of normal patterns, and (5) Cross-product monitoring that correlates activities across deposits, loans, and investment accounts.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking'],
          customerType: ['individual'],
          riskLevel: 'medium',
          lastReviewed: '2023-11-15'
        },
        evidence: [
          { id: 'ev10', type: 'system-validation', description: 'Identity Verification System Audit', quality: 'fair' },
          { id: 'ev11', type: 'sample-testing', description: 'Customer Onboarding Sample Review', quality: 'good' }
        ],
        linkedRules: ['rule-9', 'rule-10']
      }
    ]
  },
  {
    id: 'finra',
    title: 'FinCEN Transaction Monitoring',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2024-01-31',
    visible: false,
    clauses: [
      {
        id: 'finra-tm-001',
        title: 'Automated Transaction Monitoring',
        reference: 'FinCEN Guidance 2019-001',
        text: 'Financial institutions must implement automated transaction monitoring systems capable of identifying potentially suspicious patterns across multiple accounts and time periods. Systems must: (1) Process all transactions in real-time with no more than 30-second delays, (2) Cross-reference transactions across all customer accounts and related entities, (3) Maintain 5-year transaction history for pattern analysis and trend identification, (4) Apply machine learning algorithms to detect emerging money laundering typologies, (5) Generate daily reports on transaction volumes exceeding $25,000 per customer, (6) Flag round-number transactions above $10,000 that may indicate layering activities, and (7) Monitor for transactions that reverse or offset within 72-hour periods indicating potential trade-based money laundering.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-01'
        },
        evidence: [
          { id: 'ev12', type: 'performance-monitoring', description: 'Real-Time TM System Performance Monitoring', quality: 'good' },
          { id: 'ev13', type: 'alert-quality-testing', description: 'Alert Generation Quality Assessment Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-12']
      }
    ]
  },
  {
    id: 'internal-tmp',
    title: 'US Business Operations Policy',
    type: 'internal',
    jurisdiction: 'US',
    lastUpdated: '2024-02-15',
    visible: false,
    clauses: [
      {
        id: 'tmp-001',
        title: 'Cryptocurrency Exchange Prohibition',
        reference: 'TMP-001',
        text: 'The Bank prohibits all business relationships and transactions with cryptocurrency exchanges, digital asset platforms, and virtual currency service providers. Transaction monitoring systems must: (1) Maintain real-time blocklist of cryptocurrency exchange wallet addresses and IP addresses, (2) Screen all wire transfer messages for cryptocurrency-related keywords including "Bitcoin," "Ethereum," "crypto," "digital asset," and "virtual currency," (3) Block transactions to/from businesses with cryptocurrency-related NAICS codes (518210, 522320), (4) Generate immediate alerts for transactions to financial institutions known to service cryptocurrency exchanges, and (5) Apply automated holds on accounts receiving frequent small-dollar transfers that may indicate cryptocurrency conversion activities.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-01'
        },
        evidence: [
          { id: 'ev14', type: 'blocking-rule-testing', description: 'Crypto Exchange Blocking Rule Performance Testing', quality: 'excellent' },
          { id: 'ev15', type: 'transaction-review-testing', description: 'Crypto Transaction Pattern Recognition Testing', quality: 'good' }
        ],
        linkedRules: ['rule-13']
      },
      {
        id: 'tmp-002',
        title: 'High-Risk Industry Business Restrictions',
        reference: 'TMP-002',
        text: 'The Bank does not provide services to cash-intensive businesses including money service businesses, check cashers, payday lenders, precious metals dealers, or cannabis-related businesses. Enhanced monitoring for grandfathered accounts requires: (1) Daily cash transaction monitoring with alerts triggered for deposits exceeding $5,000, (2) Weekly analysis of cash-to-deposit ratios with alerts for ratios exceeding 40%, (3) Monthly review of transaction patterns for unusual timing such as after-hours or weekend deposits, (4) Automated screening against state cannabis licensing databases, and (5) Enhanced due diligence renewal every 6 months with documented business purpose verification.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-30'
        },
        evidence: [
          { id: 'ev16', type: 'closure-workflow-testing', description: 'Cash Business Account Closure Workflow Testing', quality: 'excellent' },
          { id: 'ev17', type: 'edd-process-testing', description: 'Enhanced Due Diligence Process Testing', quality: 'good' }
        ],
        linkedRules: ['rule-14']
      },
      {
        id: 'tmp-003',
        title: 'International Business Transaction Controls',
        reference: 'TMP-003',
        text: 'Transactions to/from high-risk jurisdictions (Iran, North Korea, Syria, Crimea region) are prohibited. Transaction monitoring systems must: (1) Automatically block transactions to/from sanctioned countries with immediate compliance notification, (2) Flag transactions above $5,000 to medium-risk countries (Pakistan, Myanmar, Cambodia, Panama) for manual review, (3) Apply enhanced screening for transactions to countries with FATF deficiencies using real-time country risk matrices, (4) Monitor for indirect routing through correspondent banks in prohibited jurisdictions, (5) Generate alerts for wire transfers with beneficiary addresses in high-risk border regions, and (6) Require compliance officer approval within 4 hours for transactions above $25,000 to any non-US jurisdiction.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev18', type: 'geographic-filter-testing', description: 'Geographic Risk Filter Algorithm Testing', quality: 'excellent' },
          { id: 'ev19', type: 'sanctions-screening-testing', description: 'OFAC Sanctions Screening Performance Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-15']
      },
      {
        id: 'tmp-005',
        title: 'Third-Party Payment Processor Monitoring',
        reference: 'TMP-005',
        text: 'All merchant accounts processing third-party payments must maintain transaction-to-deposit ratios within normal business parameters. Automated monitoring systems must: (1) Calculate daily transaction-to-deposit ratios with alerts for variations exceeding 25% of 30-day averages, (2) Monitor for unusual clearing patterns including same-day reversals above $10,000, (3) Flag off-cycle settlements occurring outside standard 2-day processing windows, (4) Generate alerts for dormant accounts (no activity >90 days) that suddenly receive transactions above $5,000, (5) Cross-reference merchant category codes against actual business types for consistency, (6) Monitor for circular transactions between related merchant accounts, and (7) Apply enhanced scrutiny to settlement patterns that suggest possible merchant cash advance or factoring arrangements.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev22', type: 'pattern-analysis-testing', description: 'Merchant Settlement Pattern Analysis Algorithm Testing', quality: 'good' },
          { id: 'ev23', type: 'ratio-monitoring-testing', description: 'Real-Time Transaction Ratio Monitoring Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-16']
      },
      {
        id: 'tmp-006',
        title: 'US Corporate Account Approval Process',
        reference: 'TMP-006',
        text: 'Corporate accounts with complex ownership structures require enhanced approval processes. Business development teams must: (1) Obtain beneficial ownership disclosure for all entities with 25% or greater ownership, (2) Verify business purpose and expected transaction patterns during onboarding, (3) Document source of initial funding with supporting bank statements or financial records, (4) Conduct enhanced due diligence for shell companies or entities with nominee directors, and (5) Obtain senior management approval for any account with cross-border ownership exceeding $1 million in expected annual volume.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-10'
        },
        evidence: [
          { id: 'ev140', type: 'approval-workflow-testing', description: 'Corporate Account Approval Workflow Testing', quality: 'excellent' },
          { id: 'ev141', type: 'ownership-verification-testing', description: 'Beneficial Ownership Verification Algorithm Testing', quality: 'good' },
          { id: 'ev142', type: 'business-purpose-validation', description: 'Corporate Business Purpose Validation Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-3']
      }
    ]
  },
  {
    id: 'uk-internal-tmp',
    title: 'UK Business Operations Policy',
    type: 'internal',
    jurisdiction: 'UK',
    lastUpdated: '2024-01-30',
    visible: false,
    clauses: [
      {
        id: 'uktmp-001',
        title: 'FCA Senior Managers Regime Compliance',
        reference: 'UKTMP-001',
        text: 'Senior Manager Function 17 (Money Laundering Reporting Officer) must maintain independent oversight of transaction monitoring effectiveness. Systems must: (1) Generate automated reports for MLRO review of alert disposition decisions within 48 hours, (2) Flag transactions above £50,000 requiring senior manager pre-approval, (3) Maintain audit trails demonstrating MLRO oversight of monitoring rule calibration, (4) Alert MLRO to system performance degradation exceeding 15% deviation from baseline, and (5) Provide MLRO dashboard access to real-time monitoring system status and performance metrics.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-30'
        },
        evidence: [
          { id: 'ev120', type: 'governance-testing', description: 'SMR17 MLRO Oversight Framework Testing', quality: 'excellent' },
          { id: 'ev121', type: 'compliance-testing', description: 'Transaction Monitoring SMR Compliance Testing', quality: 'good' },
          { id: 'ev122', type: 'dashboard-testing', description: 'MLRO Performance Dashboard Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-8', 'rule-9']
      },
      {
        id: 'uktmp-002',
        title: 'Enhanced Due Diligence for EU/EEA Transactions Post-Brexit',
        reference: 'UKTMP-002',
        text: 'Post-Brexit enhanced monitoring for EU/EEA cross-border transactions requires additional scrutiny equivalent to third-country standards. Systems must: (1) Apply enhanced transaction monitoring to all EU/EEA wire transfers above £10,000, (2) Screen against UK-specific sanctions lists including Magnitsky sanctions, (3) Monitor for unusual patterns in EUR-denominated transactions exceeding historical baselines by 200%, (4) Flag correspondent banking relationships with EU institutions not subject to equivalent regulatory standards, and (5) Generate alerts for transactions to EU jurisdictions with enhanced CDD requirements under UK MLRs.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev123', type: 'policy-documentation', description: 'Post-Brexit EU/EEA Transaction Monitoring Procedures', quality: 'excellent' },
          { id: 'ev124', type: 'system-configuration', description: 'Enhanced Monitoring Rules for EU/EEA Transactions', quality: 'good' },
          { id: 'ev125', type: 'compliance-testing', description: 'EU/EEA Enhanced Monitoring Effectiveness Testing', quality: 'excellent' }
        ],
        linkedRules: ['rule-8', 'rule-10']
      },
      {
        id: 'uktmp-003',
        title: 'UK Sanctions List Real-time Screening',
        reference: 'UKTMP-003',
        text: 'Real-time screening against UK sanctions lists including HM Treasury financial sanctions and NCA asset freezing orders. Systems must: (1) Screen all transactions against UK Sanctions List within 30 seconds of initiation, (2) Automatically block transactions to/from sanctioned entities with immediate MLRO notification, (3) Apply fuzzy name matching with 85% confidence threshold for sanctions screening, (4) Monitor for sanctions evasion techniques including name variations and shell company structures, and (5) Generate daily reports of sanctions screening activity for regulatory reporting.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-01'
        },
        evidence: [
          { id: 'ev126', type: 'sanctions-screening', description: 'UK Sanctions List Screening System Documentation', quality: 'excellent' },
          { id: 'ev127', type: 'blocking-procedures', description: 'Sanctioned Entity Transaction Blocking Procedures', quality: 'excellent' },
          { id: 'ev128', type: 'reporting-metrics', description: 'UK Sanctions Screening Performance Metrics', quality: 'good' }
        ],
        linkedRules: ['rule-8', 'rule-9', 'rule-12']
      },
      {
        id: 'uktmp-004',
        title: 'GDPR-Compliant Transaction Data Retention',
        reference: 'UKTMP-004',
        text: 'Transaction monitoring data retention balancing AML requirements with GDPR data minimization principles. Systems must: (1) Retain transaction monitoring alerts and investigations for 5 years as required by UK MLRs, (2) Implement data anonymization for non-suspicious transactions after 7 years retention, (3) Maintain detailed audit logs of data access and processing for regulatory examination, (4) Enable data subject access requests for transaction monitoring data within 30 days, and (5) Ensure secure deletion of personal data beyond regulatory retention requirements.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev129', type: 'data-governance', description: 'GDPR-Compliant AML Data Retention Policy', quality: 'excellent' },
          { id: 'ev130', type: 'technical-controls', description: 'Automated Data Retention and Deletion Controls', quality: 'good' },
          { id: 'ev131', type: 'privacy-assessment', description: 'Transaction Monitoring GDPR Impact Assessment', quality: 'excellent' }
        ],
        linkedRules: ['rule-8', 'rule-10']
      },
      {
        id: 'uktmp-005',
        title: 'PEP Monitoring for UK Politically Exposed Persons',
        reference: 'UKTMP-005',
        text: 'Enhanced monitoring for UK domestic and EU PEPs including MPs, senior civil servants, and judicial officials. Systems must: (1) Maintain real-time UK PEP database including family members and known close associates, (2) Apply enhanced transaction monitoring with 50% lower thresholds for UK PEPs, (3) Generate alerts for PEP transactions inconsistent with known source of wealth, (4) Require senior management approval for establishing UK PEP business relationships, and (5) Conduct enhanced periodic reviews of UK PEP accounts every 6 months.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual'],
          riskLevel: 'high',
          lastReviewed: '2024-01-28'
        },
        evidence: [
          { id: 'ev132', type: 'pep-database', description: 'UK PEP Database and Screening System', quality: 'excellent' },
          { id: 'ev133', type: 'enhanced-monitoring', description: 'UK PEP Enhanced Transaction Monitoring Rules', quality: 'good' },
          { id: 'ev134', type: 'review-procedures', description: 'UK PEP Account Review and Approval Procedures', quality: 'excellent' }
        ],
        linkedRules: ['rule-9', 'rule-10']
      },
      {
        id: 'uktmp-006',
        title: 'UK Business Banking Relationship Management',
        reference: 'UKTMP-006',
        text: 'UK business banking relationships require ongoing relationship management aligned with FCA principles for treating customers fairly. Relationship managers must: (1) Conduct annual business review meetings with all corporate clients above £500K annual turnover, (2) Document changes in business model, ownership, or geographic footprint within 30 days, (3) Update risk assessments following material changes in regulatory status or business activities, (4) Maintain current beneficial ownership information in compliance with PSC register requirements, and (5) Escalate to senior management any accounts showing signs of potential regulatory non-compliance or reputational risk.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-01-15'
        },
        evidence: [
          { id: 'ev135', type: 'relationship-management', description: 'UK Business Banking Relationship Management Framework', quality: 'excellent' },
          { id: 'ev136', type: 'review-procedures', description: 'Annual Business Review Meeting Procedures', quality: 'good' },
          { id: 'ev137', type: 'psc-compliance', description: 'PSC Register Compliance and Beneficial Ownership Tracking', quality: 'excellent' }
        ],
        linkedRules: ['rule-9', 'rule-10']
      }
    ]
  },
  {
    id: 'uk-money-laundering-regs',
    title: 'UK Money Laundering Regulations 2017',
    type: 'regulatory',
    jurisdiction: 'UK',
    lastUpdated: '2023-10-15',
    visible: false,
    clauses: [
      {
        id: 'uk-mlr-2017-reg-18',
        title: 'Whole-Firm Risk Assessment',
        reference: 'MLR 2017 Regulation 18',
        text: 'Relevant persons must identify and assess the money laundering and terrorist financing risks arising from their customers, countries, geographic areas, products, services, transactions, and delivery channels, and document their risk assessment in writing.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-18'
        },
        evidence: [
          { id: 'ev60', type: 'risk-assessment', description: 'Whole-Firm ML/TF Risk Assessment Documentation', quality: 'excellent' },
          { id: 'ev61', type: 'risk-review', description: 'Annual Risk Assessment Update and Review', quality: 'good' },
          { id: 'ev62', type: 'fca-guidance', description: 'FCA Risk Assessment Guidance Implementation', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2', 'rule-8']
      },
      {
        id: 'uk-mlr-2017-reg-19',
        title: 'Policies, Controls and Procedures',
        reference: 'MLR 2017 Regulation 19',
        text: 'Relevant persons must establish and maintain written policies, controls and procedures to manage and mitigate the money laundering and terrorist financing risks identified in their risk assessment, proportionate to the size and nature of their business.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-22'
        },
        evidence: [
          { id: 'ev63', type: 'policy-framework', description: 'AML/CTF Policies, Controls and Procedures Framework', quality: 'excellent' },
          { id: 'ev64', type: 'board-approval', description: 'Board Approval of AML/CTF Policies Documentation', quality: 'good' },
          { id: 'ev65', type: 'policy-review', description: 'Regular Policy Review and Update Process', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2', 'rule-3']
      },
      {
        id: 'uk-mlr-2017-reg-21',
        title: 'Internal Controls and MLCO',
        reference: 'MLR 2017 Regulation 21',
        text: 'Relevant persons must appoint a Money Laundering Compliance Officer (MLCO) with sufficient authority, knowledge, and resources, and establish internal controls including employee screening and independent audit functions.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev66', type: 'mlco-appointment', description: 'Money Laundering Compliance Officer Appointment and Authority', quality: 'excellent' },
          { id: 'ev67', type: 'internal-controls', description: 'Internal Controls Framework Documentation', quality: 'good' },
          { id: 'ev68', type: 'employee-screening', description: 'AML-relevant Employee Screening Procedures', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'uk-mlr-2017-reg-27',
        title: 'Customer Due Diligence Requirements',
        reference: 'MLR 2017 Regulation 27',
        text: 'Relevant persons must conduct customer due diligence when establishing business relationships, carrying out occasional transactions of €15,000 or more, or when they suspect money laundering or terrorist financing.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-28'
        },
        evidence: [
          { id: 'ev69', type: 'cdd-procedures', description: 'Customer Due Diligence Procedures and Documentation', quality: 'excellent' },
          { id: 'ev70', type: 'threshold-monitoring', description: '€15,000 Transaction Threshold Monitoring System', quality: 'good' },
          { id: 'ev71', type: 'identity-verification', description: 'Customer Identity Verification Process Review', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-28',
        title: 'Ongoing Monitoring Requirements',
        reference: 'MLR 2017 Regulation 28',
        text: 'Relevant persons must conduct ongoing monitoring of business relationships, including scrutiny of transactions to ensure consistency with customer knowledge, business and risk profile, and keep CDD information up to date.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-01'
        },
        evidence: [
          { id: 'ev72', type: 'ongoing-monitoring', description: 'Ongoing Customer Monitoring System Performance', quality: 'excellent' },
          { id: 'ev73', type: 'transaction-scrutiny', description: 'Transaction Scrutiny and Pattern Analysis', quality: 'good' },
          { id: 'ev74', type: 'cdd-updates', description: 'Customer Due Diligence Information Update Process', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-33',
        title: 'Enhanced Due Diligence',
        reference: 'MLR 2017 Regulation 33',
        text: 'Relevant persons must apply enhanced due diligence measures for high-risk business relationships, including PEPs, high-risk third countries, and other situations presenting higher ML/TF risks.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-05'
        },
        evidence: [
          { id: 'ev75', type: 'edd-procedures', description: 'Enhanced Due Diligence Procedures and Implementation', quality: 'excellent' },
          { id: 'ev76', type: 'pep-screening', description: 'Politically Exposed Person Screening and Monitoring', quality: 'good' },
          { id: 'ev77', type: 'high-risk-countries', description: 'High-Risk Third Country Transaction Monitoring', quality: 'excellent' }
        ],
        linkedRules: ['rule-9', 'rule-10']
      },
      {
        id: 'uk-mlr-2017-reg-35',
        title: 'Simplified Due Diligence',
        reference: 'MLR 2017 Regulation 35',
        text: 'Relevant persons may apply simplified due diligence for lower-risk situations, but must still verify customer identity and assess whether transactions are consistent with customer knowledge.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-08'
        },
        evidence: [
          { id: 'ev78', type: 'sdd-criteria', description: 'Simplified Due Diligence Criteria and Application', quality: 'good' },
          { id: 'ev79', type: 'risk-assessment', description: 'Lower-Risk Situation Risk Assessment Process', quality: 'excellent' },
          { id: 'ev80', type: 'monitoring-procedures', description: 'Simplified Due Diligence Monitoring Procedures', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-30',
        title: 'Beneficial Ownership Requirements',
        reference: 'MLR 2017 Regulation 30',
        text: 'Relevant persons must identify beneficial owners of corporate customers, including individuals owning more than 25% or exercising control, and verify their identity using reliable, independent sources.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-10'
        },
        evidence: [
          { id: 'ev81', type: 'bo-identification', description: 'Beneficial Ownership Identification Procedures', quality: 'excellent' },
          { id: 'ev82', type: 'control-verification', description: 'Control Structure Verification and Documentation', quality: 'good' },
          { id: 'ev83', type: 'psc-register', description: 'People with Significant Control Register Verification', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-86',
        title: 'Suspicious Activity Reporting',
        reference: 'MLR 2017 Regulation 86',
        text: 'Relevant persons must make a disclosure to the National Crime Agency as soon as practicable when they know or suspect money laundering or terrorist financing, and maintain records of internal reports.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-12'
        },
        evidence: [
          { id: 'ev84', type: 'sar-procedures', description: 'Suspicious Activity Reporting Procedures to NCA', quality: 'excellent' },
          { id: 'ev85', type: 'internal-reporting', description: 'Internal Suspicious Activity Reporting System', quality: 'good' },
          { id: 'ev86', type: 'sar-statistics', description: 'SAR Filing Statistics and Quality Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'uk-mlr-2017-reg-87',
        title: 'Tipping Off and Disclosure Prohibitions',
        reference: 'MLR 2017 Regulation 87',
        text: 'Relevant persons must not disclose to customers or third parties that a suspicious activity report has been made or that a money laundering investigation is being or may be carried out.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-15'
        },
        evidence: [
          { id: 'ev87', type: 'tipping-off-training', description: 'Tipping Off Prevention Training and Procedures', quality: 'excellent' },
          { id: 'ev88', type: 'disclosure-controls', description: 'Information Disclosure Control Procedures', quality: 'good' },
          { id: 'ev89', type: 'communication-protocols', description: 'Customer Communication Protocol Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'uk-mlr-2017-reg-24',
        title: 'Training Requirements',
        reference: 'MLR 2017 Regulation 24',
        text: 'Relevant persons must ensure that relevant employees are regularly trained in how to recognize and deal with transactions and other activities which may be related to money laundering or terrorist financing.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-18'
        },
        evidence: [
          { id: 'ev90', type: 'training-programs', description: 'AML/CTF Training Program Content and Delivery', quality: 'excellent' },
          { id: 'ev91', type: 'completion-records', description: 'Employee Training Completion and Effectiveness Tracking', quality: 'good' },
          { id: 'ev92', type: 'specialized-training', description: 'Role-Specific AML Training for High-Risk Functions', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'uk-mlr-2017-reg-40',
        title: 'Record Keeping Requirements',
        reference: 'MLR 2017 Regulation 40',
        text: 'Relevant persons must keep CDD information and transaction records for five years after the business relationship ends or transaction is completed, and make records available to competent authorities.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-20'
        },
        evidence: [
          { id: 'ev93', type: 'record-retention', description: 'AML Record Retention Policy and Procedures', quality: 'excellent' },
          { id: 'ev94', type: 'data-protection', description: 'GDPR Compliant AML Record Retention Implementation', quality: 'good' },
          { id: 'ev95', type: 'authority-access', description: 'Competent Authority Record Access Procedures', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      },
      {
        id: 'uk-mlr-2017-reg-20',
        title: 'Third Country Requirements',
        reference: 'MLR 2017 Regulation 20',
        text: 'Relevant persons with branches or subsidiaries in third countries must ensure they apply measures equivalent to UK requirements or inform the FCA if local law prevents compliance.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-22'
        },
        evidence: [
          { id: 'ev96', type: 'third-country-procedures', description: 'Third Country Branch/Subsidiary AML Procedures', quality: 'good' },
          { id: 'ev97', type: 'equivalence-assessment', description: 'Third Country AML Requirement Equivalence Assessment', quality: 'excellent' },
          { id: 'ev98', type: 'fca-reporting', description: 'FCA Notification of Third Country Compliance Issues', quality: 'good' }
        ],
        linkedRules: ["rule-10"]
      },
      {
        id: 'uk-mlr-2017-reg-39',
        title: 'Reliance on Third Parties',
        reference: 'MLR 2017 Regulation 39',
        text: 'Relevant persons may rely on third parties to conduct CDD measures but remain ultimately responsible for compliance and must ensure the third party is subject to equivalent AML requirements.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-25'
        },
        evidence: [
          { id: 'ev99', type: 'third-party-agreements', description: 'Third Party Reliance Agreements and Due Diligence', quality: 'excellent' },
          { id: 'ev100', type: 'equivalence-verification', description: 'Third Party AML Requirement Equivalence Verification', quality: 'good' },
          { id: 'ev101', type: 'oversight-procedures', description: 'Third Party CDD Oversight and Quality Assurance', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-37',
        title: 'Timing of Customer Due Diligence',
        reference: 'MLR 2017 Regulation 37',
        text: 'Customer due diligence must be completed before establishing a business relationship or carrying out an occasional transaction, except in limited circumstances where verification may be delayed.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-28'
        },
        evidence: [
          { id: 'ev102', type: 'cdd-timing', description: 'Customer Due Diligence Timing Procedures and Controls', quality: 'excellent' },
          { id: 'ev103', type: 'delayed-verification', description: 'Delayed Verification Risk Management Procedures', quality: 'good' },
          { id: 'ev104', type: 'relationship-restrictions', description: 'Business Relationship Restriction Controls', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-29',
        title: 'CDD - Purpose and Nature of Business Relationship',
        reference: 'MLR 2017 Regulation 29',
        text: 'Relevant persons must obtain information on the purpose and intended nature of the business relationship or occasional transaction to enable proper risk assessment and ongoing monitoring.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-03-01'
        },
        evidence: [
          { id: 'ev105', type: 'purpose-documentation', description: 'Business Relationship Purpose Documentation Procedures', quality: 'excellent' },
          { id: 'ev106', type: 'risk-profiling', description: 'Customer Risk Profiling Based on Business Purpose', quality: 'good' },
          { id: 'ev107', type: 'monitoring-parameters', description: 'Purpose-Based Transaction Monitoring Parameters', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uk-mlr-2017-reg-26',
        title: 'Risk Assessment and Management',
        reference: 'MLR 2017 Regulation 26',
        text: 'Relevant persons must assess ML/TF risks before launching new products or business practices and take appropriate measures to manage and mitigate identified risks.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-03-05'
        },
        evidence: [
          { id: 'ev108', type: 'product-risk-assessment', description: 'New Product ML/TF Risk Assessment Process', quality: 'excellent' },
          { id: 'ev109', type: 'risk-mitigation', description: 'Risk Mitigation Measures Implementation', quality: 'good' },
          { id: 'ev110', type: 'approval-procedures', description: 'New Product/Service Approval Procedures', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2', 'rule-3']
      },
      {
        id: 'uk-mlr-2017-reg-22',
        title: 'Group-wide Policies and Data Sharing',
        reference: 'MLR 2017 Regulation 22',
        text: 'Relevant persons that are part of a group must implement group-wide AML policies and procedures and establish information sharing arrangements for AML purposes, subject to data protection requirements.',
        metadata: {
          jurisdiction: ['UK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2024-03-08'
        },
        evidence: [
          { id: 'ev111', type: 'group-policies', description: 'Group-wide AML Policy Framework Documentation', quality: 'excellent' },
          { id: 'ev112', type: 'information-sharing', description: 'Group Information Sharing Agreements and Procedures', quality: 'good' },
          { id: 'ev113', type: 'data-protection', description: 'GDPR Compliant Group Data Sharing Implementation', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-2']
      }
    ]
  },
  {
    id: 'eu-aml-directive',
    title: 'EU Anti-Money Laundering Directive (AMLD5)',
    type: 'regulatory',
    jurisdiction: 'EU',
    lastUpdated: '2023-11-28',
    visible: true,
    clauses: [
      {
        id: 'eu-amld5-art13',
        title: 'Ongoing Customer Due Diligence and Monitoring',
        reference: 'AMLD5 Article 13',
        text: 'Obliged entities shall conduct ongoing monitoring of the business relationship including scrutiny of transactions undertaken throughout the course of that relationship to ensure that the transactions being conducted are consistent with their knowledge of the customer, their business and risk profile.',
        metadata: {
          jurisdiction: ['EU'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev27', type: 'rule-performance', description: 'EU Cross-Border Transaction Analysis', quality: 'excellent' },
          { id: 'ev28', type: 'regulatory-mapping', description: 'AMLD5 Compliance Framework', quality: 'excellent' },
          { id: 'ev29', type: 'backtest-results', description: 'EU Payment Pattern Recognition', quality: 'good' }
        ],
        linkedRules: ["rule-1","rule-12"]
      },
      {
        id: 'eu-amld5-art18a',
        title: 'Enhanced Due Diligence for High-Risk Third Countries',
        reference: 'AMLD5 Article 18a',
        text: 'Member States shall require obliged entities to apply enhanced due diligence measures when dealing with natural persons or legal entities established in high-risk third countries identified by the Commission, including enhanced ongoing monitoring.',
        metadata: {
          jurisdiction: ['EU'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev30', type: 'geographic-screening', description: 'High-Risk Country Monitoring Rules', quality: 'excellent' },
          { id: 'ev31', type: 'policy-documentation', description: 'EU Enhanced Due Diligence Procedures', quality: 'good' }
        ],
        linkedRules: ['rule-9', 'rule-12']
      },
      {
        id: 'eu-amld5-art33',
        title: 'Reporting of Suspicious Transactions',
        reference: 'AMLD5 Article 33',
        text: 'Member States shall require obliged entities to promptly inform the financial intelligence unit when they know, suspect or have reasonable grounds to suspect that funds, regardless of the amount involved, are the proceeds of criminal activity or are related to terrorist financing.',
        metadata: {
          jurisdiction: ['EU'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-12'
        },
        evidence: [
          { id: 'ev32', type: 'str-metrics', description: 'Suspicious Transaction Report Statistics', quality: 'fair' },
          { id: 'ev33', type: 'workflow-documentation', description: 'EU STR Filing Process Documentation', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'canada-pcmla',
    title: 'Proceeds of Crime (Money Laundering) and Terrorist Financing Act',
    type: 'regulatory',
    jurisdiction: 'CA',
    lastUpdated: '2024-03-26',
    visible: false,
    clauses: [
      {
        id: 'pcmla-s9-1',
        title: 'Large Cash Transaction Reporting',
        reference: 'PCMLTFA Section 9.1',
        text: 'Every entity referred to in section 5 shall report to FINTRAC the receipt of any amount in cash of $10,000 or more in the course of a single transaction, along with any other prescribed information.',
        metadata: {
          jurisdiction: ['CA'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-03-15'
        },
        evidence: [
          { id: 'ev27', type: 'filing-metrics', description: 'FINTRAC Large Cash Transaction Report Statistics', quality: 'excellent' },
          { id: 'ev28', type: 'audit-report', description: 'OSFI AML Examination Report 2024', quality: 'good' }
        ],
        linkedRules: ['rule-1', 'rule-3']
      },
      {
        id: 'pcmla-s7',
        title: 'Suspicious Transaction Reporting',
        reference: 'PCMLTFA Section 7',
        text: 'Subject to subsection (3), every entity shall report to FINTRAC every financial transaction that occurs or that is attempted in the course of their activities where there are reasonable grounds to suspect that the transaction is related to the commission or attempted commission of a money laundering or terrorist financing offence.',
        metadata: {
          jurisdiction: ['CA'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-03-10'
        },
        evidence: [
          { id: 'ev29', type: 'str-analysis', description: 'Suspicious Transaction Report Quality Review', quality: 'good' },
          { id: 'ev30', type: 'training-records', description: 'FINTRAC Reporting Requirements Training', quality: 'excellent' }
        ],
        linkedRules: []
      },
      {
        id: 'pcmla-s6-1',
        title: 'Client Identification and Record Keeping',
        reference: 'PCMLTFA Section 6.1',
        text: 'Every entity shall keep the prescribed records in respect of prescribed transactions and activities and shall retain them for the prescribed period.',
        metadata: {
          jurisdiction: ['CA'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'medium',
          lastReviewed: '2024-02-28'
        },
        evidence: [
          { id: 'ev31', type: 'record-keeping', description: 'Client Identification Record Retention Audit', quality: 'good' },
          { id: 'ev32', type: 'compliance-testing', description: 'KYC Documentation Completeness Review', quality: 'fair' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      }
    ]
  },
  {
    id: 'australia-aml-ctf',
    title: 'Anti-Money Laundering and Counter-Terrorism Financing Act 2006',
    type: 'regulatory',
    jurisdiction: 'AU',
    lastUpdated: '2024-02-15',
    visible: false,
    clauses: [
      {
        id: 'aml-ctf-s43',
        title: 'Ongoing Customer Due Diligence',
        reference: 'AML/CTF Act Section 43',
        text: 'A reporting entity must conduct ongoing customer due diligence in relation to designated services provided to customers, including conducting enhanced customer due diligence for higher risk customers.',
        metadata: {
          jurisdiction: ['AU'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-02-10'
        },
        evidence: [
          { id: 'ev33', type: 'cdd-review', description: 'Customer Due Diligence Process Assessment', quality: 'excellent' },
          { id: 'ev34', type: 'risk-assessment', description: 'Enhanced Due Diligence Risk Categorization', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9', 'rule-10']
      },
      {
        id: 'aml-ctf-s41',
        title: 'Suspicious Matter Reporting',
        reference: 'AML/CTF Act Section 41',
        text: 'If a reporting entity suspects on reasonable grounds that information it has relates to a matter that may be relevant to investigation or prosecution of a person for an offence against this Act or the proceeds of crime, it must give a suspicious matter report to AUSTRAC.',
        metadata: {
          jurisdiction: ['AU'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-02-05'
        },
        evidence: [
          { id: 'ev35', type: 'smr-metrics', description: 'AUSTRAC Suspicious Matter Report Statistics', quality: 'excellent' },
          { id: 'ev36', type: 'investigation-outcomes', description: 'SMR Follow-up Investigation Results', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'aml-ctf-s82',
        title: 'Transaction Monitoring Program',
        reference: 'AML/CTF Act Section 82',
        text: 'A reporting entity must have and maintain an AML/CTF program that includes a transaction monitoring program designed to identify, mitigate and manage money laundering and terrorism financing risks.',
        metadata: {
          jurisdiction: ['AU'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'high',
          lastReviewed: '2024-01-30'
        },
        evidence: [
          { id: 'ev37', type: 'program-documentation', description: 'AML/CTF Program Annual Review', quality: 'good' },
          { id: 'ev38', type: 'monitoring-effectiveness', description: 'Transaction Monitoring System Performance', quality: 'excellent' }
        ],
        linkedRules: ['rule-1', 'rule-8']
      }
    ]
  },
  {
    id: 'singapore-cdsa',
    title: 'Corruption, Drug Trafficking and Other Serious Crimes Act',
    type: 'regulatory',
    jurisdiction: 'SG',
    lastUpdated: '2024-01-20',
    visible: false,
    clauses: [
      {
        id: 'cdsa-s39',
        title: 'Suspicious Transaction Reporting',
        reference: 'CDSA Section 39',
        text: 'Where a person knows or has reasonable grounds to suspect that any property represents the proceeds of, or was used in connection with, a serious offence, or relates to terrorist financing, and the information came to his attention in the course of his trade, profession, business or employment, he shall disclose the knowledge or suspicion or information to a Suspicious Transaction Reporting Officer.',
        metadata: {
          jurisdiction: ['SG'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-15'
        },
        evidence: [
          { id: 'ev39', type: 'str-filing', description: 'MAS STR Filing Performance Metrics', quality: 'excellent' },
          { id: 'ev40', type: 'compliance-audit', description: 'MAS AML/CFT Inspection Report', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'cdsa-s48f',
        title: 'Customer Due Diligence Measures',
        reference: 'CDSA Section 48F',
        text: 'A financial institution shall perform customer due diligence measures when establishing business relations with any customer, carrying out any transaction for any customer where there is no established business relationship, or when the financial institution suspects money laundering or terrorist financing.',
        metadata: {
          jurisdiction: ['SG'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'high',
          lastReviewed: '2024-01-10'
        },
        evidence: [
          { id: 'ev41', type: 'cdd-procedures', description: 'Customer Due Diligence Process Documentation', quality: 'excellent' },
          { id: 'ev42', type: 'risk-profiling', description: 'Customer Risk Assessment Framework', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      }
    ]
  },
  {
    id: 'hong-kong-amlo',
    title: 'Anti-Money Laundering and Counter-Terrorist Financing Ordinance',
    type: 'regulatory',
    jurisdiction: 'HK',
    lastUpdated: '2024-01-25',
    visible: false,
    clauses: [
      {
        id: 'amlo-s7',
        title: 'Customer Due Diligence Requirements',
        reference: 'AMLO Schedule 2 Section 7',
        text: 'A financial institution must conduct customer due diligence measures before establishing a business relationship, before carrying out an occasional transaction that amounts to HK$120,000 or more, or when the financial institution suspects money laundering or terrorist financing.',
        metadata: {
          jurisdiction: ['HK'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev43', type: 'cdd-compliance', description: 'HKMA CDD Compliance Review', quality: 'excellent' },
          { id: 'ev44', type: 'threshold-monitoring', description: 'HK$120,000 Transaction Threshold Monitoring', quality: 'good' }
        ],
        linkedRules: ["rule-2"]
      },
      {
        id: 'amlo-s25a',
        title: 'Suspicious Transaction Reporting',
        reference: 'AMLO Section 25A',
        text: 'A person commits an offence if the person knows or suspects that another person has engaged in money laundering or terrorist financing, and the information on which the knowledge or suspicion is based came to the person in the course of business, and the person does not disclose the information to the Joint Financial Intelligence Unit as soon as reasonably practicable.',
        metadata: {
          jurisdiction: ['HK'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-18'
        },
        evidence: [
          { id: 'ev45', type: 'str-metrics', description: 'JFIU STR Filing Statistics and Quality', quality: 'good' },
          { id: 'ev46', type: 'training-completion', description: 'STR Recognition and Filing Training', quality: 'excellent' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'japan-narcotics-control',
    title: 'Act on Prevention of Transfer of Criminal Proceeds',
    type: 'regulatory',
    jurisdiction: 'JP',
    lastUpdated: '2023-12-10',
    visible: false,
    clauses: [
      {
        id: 'narcotics-s4',
        title: 'Customer Verification Measures',
        reference: 'Criminal Proceeds Act Article 4',
        text: 'When conducting specified business transactions, specified business operators must verify the identity of customers through confirmation of name, address, date of birth and other prescribed matters, and maintain records of such verification.',
        metadata: {
          jurisdiction: ['JP'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'medium',
          lastReviewed: '2023-12-05'
        },
        evidence: [
          { id: 'ev47', type: 'identity-verification', description: 'Customer Identity Verification Process Audit', quality: 'good' },
          { id: 'ev48', type: 'record-retention', description: 'Customer Record Retention Compliance Review', quality: 'excellent' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'narcotics-s8',
        title: 'Suspicious Transaction Reporting',
        reference: 'Criminal Proceeds Act Article 8',
        text: 'When a specified business operator becomes aware of a transaction that it suspects may be related to criminal proceeds, it must promptly file a report with the Financial Intelligence Unit.',
        metadata: {
          jurisdiction: ['JP'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2023-11-30'
        },
        evidence: [
          { id: 'ev49', type: 'str-filing', description: 'JAFIC STR Filing Performance and Quality', quality: 'good' },
          { id: 'ev50', type: 'suspicious-activity', description: 'Suspicious Activity Detection Effectiveness', quality: 'fair' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'switzerland-amla',
    title: 'Anti-Money Laundering Act (AMLA)',
    type: 'regulatory',
    jurisdiction: 'CH',
    lastUpdated: '2024-01-01',
    visible: false,
    clauses: [
      {
        id: 'amla-art6',
        title: 'Due Diligence Obligations',
        reference: 'AMLA Article 6',
        text: 'Financial intermediaries must establish the identity of the contracting party and verify that the contracting party is the beneficial owner of the assets involved in the business relationship.',
        metadata: {
          jurisdiction: ['CH'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2023-12-20'
        },
        evidence: [
          { id: 'ev51', type: 'beneficial-ownership', description: 'Beneficial Ownership Identification Procedures', quality: 'excellent' },
          { id: 'ev52', type: 'finma-audit', description: 'FINMA Due Diligence Compliance Review', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9', 'rule-10']
      },
      {
        id: 'amla-art9',
        title: 'Reporting Suspicious Activities',
        reference: 'AMLA Article 9',
        text: 'Financial intermediaries must report to the Money Laundering Reporting Office Switzerland (MROS) any business relationship or transaction which they know or have reasonable grounds to suspect is connected with money laundering or the financing of terrorism.',
        metadata: {
          jurisdiction: ['CH'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2023-12-15'
        },
        evidence: [
          { id: 'ev53', type: 'mros-reporting', description: 'MROS Suspicious Activity Report Statistics', quality: 'excellent' },
          { id: 'ev54', type: 'investigation-outcomes', description: 'SAR Investigation and Follow-up Results', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'uae-aml-law',
    title: 'UAE Federal Decree-Law No. 20 of 2018 on Anti-Money Laundering',
    type: 'regulatory',
    jurisdiction: 'AE',
    lastUpdated: '2024-02-01',
    visible: false,
    clauses: [
      {
        id: 'uae-aml-art16',
        title: 'Customer Due Diligence Requirements',
        reference: 'Federal Decree-Law No. 20/2018 Article 16',
        text: 'Financial institutions and DNFBPs must conduct customer due diligence when establishing business relations, carrying out occasional transactions above the prescribed threshold, or when there are suspicions of money laundering or terrorism financing.',
        metadata: {
          jurisdiction: ['AE'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2024-01-25'
        },
        evidence: [
          { id: 'ev55', type: 'cbuae-guidance', description: 'CBUAE Customer Due Diligence Standards', quality: 'excellent' },
          { id: 'ev56', type: 'cdd-implementation', description: 'Enhanced CDD Process Implementation', quality: 'good' }
        ],
        linkedRules: ['rule-2', 'rule-9']
      },
      {
        id: 'uae-aml-art15',
        title: 'Suspicious Transaction Reporting',
        reference: 'Federal Decree-Law No. 20/2018 Article 15',
        text: 'Financial institutions must report to the FIU any transaction or attempted transaction, regardless of the amount, which they suspect or have reasonable grounds to suspect is related to the proceeds of crime or terrorism financing.',
        metadata: {
          jurisdiction: ['AE'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2024-01-20'
        },
        evidence: [
          { id: 'ev57', type: 'fiu-reporting', description: 'UAE FIU STR Filing Performance Metrics', quality: 'good' },
          { id: 'ev58', type: 'compliance-monitoring', description: 'AML Compliance Monitoring Effectiveness', quality: 'excellent' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'amla-2020',
    title: 'Anti-Money Laundering Act of 2020 (AMLA)',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2025-01-15',
    visible: false,
    clauses: [
      {
        id: 'amla-2020-section-1',
        title: 'National AML/CFT Priorities - Risk-Based Monitoring',
        reference: 'Section 6101 (31 U.S.C. 5318(h)(4))',
        text: 'Financial institutions must incorporate FinCEN\'s national AML/CFT priorities into risk assessments and transaction monitoring systems. Monitoring scenarios must be designed to detect priority threat patterns including corruption, cybercrime, terrorist financing, fraud, transnational criminal organization activity, drug trafficking, human trafficking, and proliferation financing. Institutions must document how monitoring addresses each relevant priority and update monitoring parameters based on priorities refreshed every 4 years.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev60', type: 'regulatory-guidance', description: 'FinCEN National Priorities (June 2021)', quality: 'excellent' },
          { id: 'ev61', type: 'policy-documentation', description: 'Priority Integration Documentation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'amla-2020-section-2',
        title: 'Beneficial Ownership Information (Corporate Transparency Act)',
        reference: 'Title LXIV (31 CFR 1010.380)',
        text: 'The Corporate Transparency Act establishes a federal beneficial ownership registry at FinCEN. Financial institutions can access this database to enhance customer risk profiles and transaction monitoring scenarios. Monitoring systems must incorporate beneficial ownership data to detect transactions inconsistent with beneficial owner profiles, monitor for structuring using multiple entities with common beneficial owners, and cross-reference transactions across entities with the same beneficial owners.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev62', type: 'regulatory-filing', description: 'CTA Final Rule (September 2022)', quality: 'excellent' },
          { id: 'ev63', type: 'backtest-results', description: 'Beneficial Owner Monitoring Effectiveness', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'amla-2020-section-3',
        title: 'Effectiveness Standard for Risk-Based AML Programs',
        reference: 'Section 6101 (31 U.S.C. 5318(h))',
        text: 'Financial institutions must maintain "effective, risk-based" AML programs with demonstrably effective transaction monitoring. Monitoring must be reasonably designed to detect and report suspicious activity, not merely compliant on paper. Institutions must conduct regular testing and validation of monitoring effectiveness, measure and document performance metrics including false positive and false negative rates, and demonstrate continuous improvement of monitoring systems with senior management oversight.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev64', type: 'audit-report', description: 'Monitoring Effectiveness Testing Results', quality: 'excellent' },
          { id: 'ev65', type: 'performance-data', description: 'False Positive Rate Analysis', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'amla-2020-section-4',
        title: 'Innovation and Technology Adoption',
        reference: 'Sections 6205 and 6207',
        text: 'AMLA encourages adoption of innovative technologies including artificial intelligence (AI) and machine learning (ML) for transaction monitoring. Financial institutions should consider innovative approaches to monitoring, implement risk-based assessments of new technologies, and validate AI/ML monitoring models. Institutions must document model risk management for automated systems, ensure explainability of AI/ML decisions, maintain human oversight of automated monitoring, and conduct regular review and recalibration of ML models.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev66', type: 'policy-documentation', description: 'AI/ML Model Risk Management Framework', quality: 'good' },
          { id: 'ev67', type: 'backtest-results', description: 'ML Model Validation Results', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'amla-2020-section-5',
        title: 'Enhanced Monitoring for Large Transactions',
        reference: 'Section 6308 (Enhanced Penalties)',
        text: 'AMLA significantly increases penalties for AML violations, creating heightened obligations for transaction monitoring. Monitoring systems must detect concealment schemes and enhanced monitoring of transactions exceeding $1,000,000. Systems should monitor for false or misleading information in large transactions, detect patterns of information concealment, flag involvement of politically exposed persons and their associates, and maintain enhanced investigation procedures for suspicious large transactions.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev68', type: 'performance-data', description: 'Large Transaction Monitoring Metrics', quality: 'excellent' },
          { id: 'ev69', type: 'audit-report', description: 'Enhanced Penalty Compliance Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'amla-2020-section-6',
        title: 'Comprehensive Documentation and Subpoena Readiness',
        reference: 'Section 6308 (Expanded Subpoena Authority)',
        text: 'AMLA expands FinCEN\'s subpoena authority requiring financial institutions to maintain comprehensive documentation of monitoring systems. Institutions must document monitoring scenario logic and parameters, retain records of alert generation, review, and disposition, maintain audit trails of monitoring system changes, document rationale for monitoring thresholds and parameters, and ensure monitoring data is accessible and producible upon regulatory request. All documentation must support detailed regulatory inquiries regarding monitoring decisions.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev70', type: 'audit-report', description: 'Documentation Completeness Review', quality: 'excellent' },
          { id: 'ev71', type: 'compliance-monitoring', description: 'Audit Trail Validation', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'basel-committee',
    title: 'Basel Committee Guidelines',
    type: 'supplement',
    jurisdiction: 'International',
    lastUpdated: '2025-01-15',
    visible: true,
    clauses: [
      {
        id: 'basel-committee-section-1',
        title: 'Risk-Based Monitoring Framework',
        reference: 'BCBS d353 - General Principles',
        text: 'Banks should have adequate policies and processes, including transaction monitoring, designed and implemented to adequately control identified inherent ML/FT risks. Monitoring measures should be proportional and risk-based, informed by banks\' own risk assessment. Institutions must conduct risk assessments to identify ML/FT risks, design monitoring policies based on identified risks, implement controls proportional to risk level, and regularly review and update risk assessments while adjusting monitoring intensity accordingly.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev72', type: 'regulatory-guidance', description: 'Basel Committee Guidelines (BCBS d353)', quality: 'excellent' },
          { id: 'ev73', type: 'policy-documentation', description: 'Risk-Based Monitoring Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'basel-committee-section-2',
        title: 'Ongoing Monitoring and Tiered Due Diligence',
        reference: 'BCBS d353 - Customer Due Diligence',
        text: 'Banks should apply commensurate due diligence and ongoing monitoring as the level of risk varies. Monitoring systems must scrutinize transactions to ensure consistency with customer knowledge, business, and risk profile. Enhanced measures are required for higher-risk customers with more intensive monitoring, more frequent reviews, lower alert thresholds, and senior management involvement. Simplified measures may be permitted for lower-risk customers where allowed by law, though ongoing monitoring remains required.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev74', type: 'audit-report', description: 'Tiered Monitoring Effectiveness Review', quality: 'excellent' },
          { id: 'ev75', type: 'performance-data', description: 'Risk-Based Alert Calibration', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'basel-committee-section-3',
        title: 'Detection and Reporting of Suspicious Transactions',
        reference: 'BCBS d353 - Suspicious Activity Reporting',
        text: 'Banks should have internal procedures for detecting and reporting suspicious transactions according to applicable laws and regulations. Transaction monitoring systems must detect patterns indicative of money laundering and terrorist financing, flag unusual transactions for investigation, and report suspicious activity to the Financial Intelligence Unit (FIU). Banks must maintain records of suspicious activity detection and reporting, and train staff to identify red flags and suspicious patterns.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev76', type: 'compliance-monitoring', description: 'Suspicious Activity Detection Rate', quality: 'excellent' },
          { id: 'ev77', type: 'audit-report', description: 'FIU Reporting Quality Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'basel-committee-section-4',
        title: 'Correspondent Banking Ongoing Monitoring',
        reference: 'BCBS d405 - Correspondent Banking Annex',
        text: 'Correspondent banking relationships should always be subject to ongoing monitoring. Banks must assess ML/FT risks associated with correspondent banking activities and apply appropriate due diligence measures. Mandatory ongoing monitoring is required for all correspondent relationships to monitor transactions for consistency with respondent\'s expected activity, gather information about respondent banks on a continuing basis, assess changes in risk profile, and escalate concerns to appropriate levels.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev78', type: 'performance-data', description: 'Correspondent Banking Monitoring Metrics', quality: 'excellent' },
          { id: 'ev79', type: 'audit-report', description: 'Respondent Risk Assessment Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'basel-committee-section-5',
        title: 'Technology Systems and Validation',
        reference: 'BCBS d353 - Systems Integrity',
        text: 'Banks should ensure technology systems used for transaction monitoring are appropriate, regularly tested, and validated. Systems must be sized appropriately to bank\'s complexity and risk profile, undergo regular testing of functionality, validate detection of relevant scenarios, assess false positive and false negative rates, and maintain system integrity checks. Banks must implement change management procedures for system updates, document system rules and logic, and conduct independent reviews of system effectiveness with regular updates based on new typologies.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev80', type: 'backtest-results', description: 'System Validation Testing Results', quality: 'excellent' },
          { id: 'ev81', type: 'audit-report', description: 'Independent System Review', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fincen-cdd',
    title: 'FinCEN Customer Due Diligence (CDD) Rule',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2025-01-15',
    visible: false,
    clauses: [
      {
        id: 'fincen-cdd-section-1',
        title: 'Customer Due Diligence as Fifth Pillar of AML Programs',
        reference: '31 CFR Chapter X',
        text: 'The CDD Final Rule formally identifies customer due diligence as the fifth essential pillar of an AML program. Financial institutions must implement customer due diligence as an integral part of their AML program, ensure CDD is risk-based and appropriate to the institution\'s risk profile, document CDD policies and procedures, and integrate CDD information with transaction monitoring systems. Regular review, independent testing of CDD effectiveness, and training on CDD requirements are mandatory.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev82', type: 'regulatory-filing', description: 'CDD Final Rule (May 2016)', quality: 'excellent' },
          { id: 'ev83', type: 'policy-documentation', description: 'Fifth Pillar Implementation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-cdd-section-2',
        title: 'Ongoing Monitoring for Suspicious Transactions',
        reference: '31 CFR Chapter X - Element 4',
        text: 'Financial institutions must conduct ongoing monitoring to identify and report suspicious transactions. Monitoring must identify transactions unusual or inconsistent with customer profile, detect patterns indicative of suspicious activity, and monitor for transactions that lack business or lawful purpose. Monitoring approach must be appropriate to the institution\'s size, location, activities, and risk profile. Institutions must investigate flagged transactions in a timely manner and report suspicious activity through SARs.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev84', type: 'performance-data', description: 'Ongoing Monitoring Effectiveness Metrics', quality: 'excellent' },
          { id: 'ev85', type: 'audit-report', description: 'SAR Quality Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-cdd-section-3',
        title: 'Beneficial Ownership Identification and Verification',
        reference: '31 CFR 1010.230',
        text: 'Financial institutions must identify and verify beneficial owners of legal entity customers at account opening using a two-prong test: ownership prong (each individual owning 25% or more of equity interests) and control prong (a single individual with significant control responsibility). Transaction monitoring systems must use beneficial ownership information to monitor for consistency with beneficial owner profiles, detect transactions indicating changes in ownership, monitor for structuring across entities with common beneficial owners, and apply enhanced monitoring when beneficial ownership involves high-risk individuals.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev86', type: 'regulatory-filing', description: 'Beneficial Ownership Requirements (31 CFR 1010.230)', quality: 'excellent' },
          { id: 'ev87', type: 'performance-data', description: 'Beneficial Owner Monitoring Results', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-cdd-section-4',
        title: 'Customer Risk Profiling and Monitoring Intensity',
        reference: '31 CFR Chapter X - Element 3',
        text: 'Financial institutions must develop customer risk profiles based on understanding of the nature and purpose of customer relationships. Risk profiles inform monitoring intensity with higher-risk customers receiving more intensive monitoring, lower alert thresholds, and more frequent reviews. Lower-risk customers receive less intensive but still required monitoring with higher alert thresholds. Institutions must document risk rating rationale, conduct regular reassessment of customer risk ratings, and update risk ratings based on monitoring findings.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev88', type: 'audit-report', description: 'Risk Profiling Effectiveness Review', quality: 'excellent' },
          { id: 'ev89', type: 'policy-documentation', description: 'Risk-Based Monitoring Calibration', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-cdd-section-5',
        title: 'Trigger Events and Customer Review',
        reference: 'CDD Rule Guidance',
        text: 'Financial institutions must establish trigger events that prompt review and update of customer information and risk profile. Trigger events include significant deviation from expected transaction patterns, unusual increases in transaction volumes or values, multiple monitoring alerts within short timeframe, detection of potentially suspicious activity, and changes in customer circumstances. Response to triggers must include customer review, information updates, risk reassessment, and adjustment of monitoring parameters as appropriate.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev90', type: 'compliance-monitoring', description: 'Trigger Event Response Metrics', quality: 'good' },
          { id: 'ev91', type: 'audit-report', description: 'Customer Review Process Validation', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fincen-ctr',
    title: 'FinCEN Currency Transaction Reporting (CTR)',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2025-01-15',
    visible: false,
    clauses: [
      {
        id: 'fincen-ctr-section-1',
        title: 'CTR Filing and Aggregation Requirements',
        reference: '31 U.S.C. 5313(a); 31 CFR § 1010.311',
        text: 'Financial institutions must file a Currency Transaction Report (FinCEN Report 112) for each transaction in currency of more than $10,000. Aggregation is required when multiple currency transactions by or on behalf of any person result in either cash in or cash out totaling more than $10,000 during any one business day. Transaction monitoring systems must aggregate transactions by the same person throughout the institution, track both cash in and cash out separately, aggregate across branches and account types, and use common identifiers to link transactions.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev92', type: 'regulatory-filing', description: 'CTR Regulations (31 CFR § 1010.311)', quality: 'excellent' },
          { id: 'ev93', type: 'performance-data', description: 'CTR Filing Accuracy Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-ctr-section-2',
        title: 'Structuring Detection and Monitoring',
        reference: '31 U.S.C. 5324; 31 CFR § 1010.314',
        text: 'No person shall structure transactions for the purpose of evading CTR filing requirements. Structuring includes breaking down a single sum of currency exceeding $10,000 into smaller sums including sums at or below $10,000. Transaction monitoring must detect multiple cash transactions just below $10,000, track patterns of near-threshold transactions, monitor frequency of transactions across branches, detect patterns over multiple days, and flag unusual patterns of cash activity. SAR filing is required when an institution suspects structuring.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev94', type: 'performance-data', description: 'Structuring Detection Effectiveness', quality: 'excellent' },
          { id: 'ev95', type: 'audit-report', description: 'Structuring SAR Quality Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-ctr-section-3',
        title: 'Exemptions and Ongoing Monitoring',
        reference: '31 CFR § 1020.315',
        text: 'Banks may exempt certain categories of customers from CTR filing requirements but must continue to monitor for suspicious activity. Exempt categories include Phase I entities (banks, government entities, listed public companies) and Phase II entities (certain non-listed businesses). Annual review of exempt person status is required. Transaction monitoring must continue for exempt persons to detect suspicious activity, file SARs when appropriate, monitor for changes in transaction patterns, and detect unusual increases in currency transactions that may trigger SAR filing obligations despite CTR exemption.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev96', type: 'compliance-monitoring', description: 'Exempt Person Annual Review', quality: 'excellent' },
          { id: 'ev97', type: 'audit-report', description: 'Exemption Eligibility Validation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-ctr-section-4',
        title: 'Multiple Participants and "On Behalf Of" Monitoring',
        reference: '31 CFR § 1010.313',
        text: 'Transaction monitoring must detect and aggregate transactions involving multiple participants. "On behalf of" transactions conducted by agents, authorized signers, employees, or nominees acting for another person must be aggregated with that person\'s transactions. Monitoring systems must detect authorized signers conducting transactions for account holders, identify agents acting on behalf of principals, monitor employees conducting transactions for employers, detect nominees or intermediaries, and identify patterns of multiple individuals transacting for the same entity.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['business'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev98', type: 'performance-data', description: '"On Behalf Of" Detection Metrics', quality: 'good' },
          { id: 'ev99', type: 'audit-report', description: 'Multi-Participant Aggregation Review', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fincen-sar',
    title: 'FinCEN Suspicious Activity Reporting (SAR)',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2025-01-15',
    visible: false,
    clauses: [
      {
        id: 'fincen-sar-section-1',
        title: 'General SAR Filing Obligation and Triggering Conditions',
        reference: '31 CFR Chapter X (by institution type)',
        text: 'Financial institutions must file a Suspicious Activity Report (SAR) when they know, suspect, or have reason to suspect that a transaction meets one of four triggering conditions: involves funds derived from illegal activities, is designed to evade BSA requirements, has no business or lawful purpose with no reasonable explanation after examining available facts, or involves use of the institution to facilitate criminal activity. Dollar thresholds vary by institution type, with banks at $5,000 for most transactions and no minimum for insider abuse.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev100', type: 'regulatory-filing', description: 'SAR Regulations (31 CFR § 1020.320)', quality: 'excellent' },
          { id: 'ev101', type: 'performance-data', description: 'SAR Quality Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-sar-section-2',
        title: 'SAR Filing Deadlines and Continuing Activity',
        reference: '31 CFR Chapter X - SAR Regulations',
        text: 'Standard SAR filing deadline is 30 calendar days after initial detection of facts that may constitute a basis for filing. If no suspect was identified, institutions may delay filing for an additional 30 days but no more than 60 calendar days total. For continuing activity, institutions must review suspicious activity at least every 90 days to determine if a continuing activity SAR is warranted, with a 120-day filing deadline. Transaction monitoring systems must enable timely identification to meet filing deadlines and track cumulative suspicious activity over time.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev102', type: 'compliance-monitoring', description: 'SAR Filing Timeliness Metrics', quality: 'excellent' },
          { id: 'ev103', type: 'audit-report', description: 'Continuing Activity SAR Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-sar-section-3',
        title: 'Transaction Monitoring Systems for Suspicious Activity Detection',
        reference: 'BSA Regulations and Regulatory Guidance',
        text: 'Financial institutions must have systems and processes reasonably designed to detect suspicious activity requiring SAR filing. Transaction monitoring systems must be appropriate to institution\'s size, complexity, and risk profile, detect unusual patterns in amounts, frequencies, and types of transactions, monitor for transactions inconsistent with customer profile, identify transactions with no apparent business purpose, detect structuring and BSA evasion attempts, monitor for money laundering typologies, and flag transactions involving high-risk countries or parties.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev104', type: 'backtest-results', description: 'Monitoring System Detection Effectiveness', quality: 'excellent' },
          { id: 'ev105', type: 'audit-report', description: 'System Calibration Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-sar-section-4',
        title: 'SAR Aggregation and Pattern Detection',
        reference: 'SAR Regulations and Guidance',
        text: 'Institutions should aggregate related transactions to determine if they meet SAR filing thresholds and to identify suspicious patterns. Transaction monitoring must aggregate transactions by the same customer over relevant timeframes, aggregate transactions on behalf of the same customer, consider multiple transactions that appear related or connected, aggregate across accounts controlled by same individual or entity, monitor cumulative activity to detect structuring, and track activity across branches and business lines to assess entire relationship for suspicious activity.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev106', type: 'performance-data', description: 'Aggregation Logic Effectiveness', quality: 'good' },
          { id: 'ev107', type: 'audit-report', description: 'Pattern Detection Validation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-sar-section-5',
        title: 'SAR Confidentiality and Record Retention',
        reference: '31 U.S.C. 5318(g)(2)',
        text: 'No institution or its personnel shall disclose a SAR or any information that would reveal the existence of a SAR. Monitoring alerts and investigations must maintain confidentiality, cannot inform customers that transactions are being monitored for SAR purposes, and must protect SAR-related information in systems. Institutions must maintain copies of filed SARs and original or business record equivalent of supporting documentation for five years from the date of filing, including monitoring alerts, investigation documentation, and decision-making rationale.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev108', type: 'compliance-monitoring', description: 'SAR Confidentiality Controls', quality: 'excellent' },
          { id: 'ev109', type: 'audit-report', description: 'Record Retention Compliance', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fincen-travel-rule',
    title: 'FinCEN Travel Rule – Funds Transfer',
    type: 'regulatory',
    jurisdiction: 'US',
    lastUpdated: '2025-01-15',
    visible: false,
    clauses: [
      {
        id: 'fincen-travel-rule-section-1',
        title: 'Funds Transfers - Originator Information Requirements',
        reference: '31 U.S.C. 5318(a)(2); 31 CFR § 1010.410(e)',
        text: 'For each payment order of $3,000 or more that a financial institution accepts as an originator\'s bank, the institution must obtain and retain specified information about the originator including name, address, amount, execution date, payment instructions, and beneficiary\'s bank identity. Information must be transmitted with the transfer including originator\'s name, account number, and address. Records must be maintained for five years and be retrievable by reference to originator name and account number.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev110', type: 'regulatory-filing', description: 'Travel Rule Regulations (31 CFR § 1010.410)', quality: 'excellent' },
          { id: 'ev111', type: 'compliance-monitoring', description: 'Originator Information Completeness', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-travel-rule-section-2',
        title: 'Intermediary and Beneficiary Bank Obligations',
        reference: '31 CFR § 1010.410(f)',
        text: 'Intermediary banks must retain records of payment orders and include in transmittal orders all information received from the sender with a pass-through obligation for all data. Beneficiary banks must retain records of payment orders and all information received from the sender. Transaction monitoring must detect payment orders with missing or incomplete originator information, identify patterns of incomplete information from specific sending institutions, flag wires with missing information for review, and request missing information from sending institutions when appropriate.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking'],
          customerType: ['corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev112', type: 'performance-data', description: 'Wire Transfer Data Quality Metrics', quality: 'excellent' },
          { id: 'ev113', type: 'audit-report', description: 'Intermediary Bank Compliance Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-travel-rule-section-3',
        title: 'Wire Transfer Monitoring for Suspicious Activity',
        reference: 'SAR Regulations and BSA Requirements',
        text: 'Institutions must monitor wire transfers for suspicious activity requiring SAR filing independent of Travel Rule recordkeeping requirements. Monitoring scenarios must detect rapid movement of funds (deposit followed by immediate wire out), round-dollar amounts suggesting structuring, high-risk jurisdictions with weak AML controls, transactions lacking economic purpose or inconsistent with customer business, structuring patterns with multiple wires to same beneficiary just below threshold, funnel accounts, layering through multiple accounts or countries, and circular transfers.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev114', type: 'performance-data', description: 'Wire Transfer SAR Detection Rate', quality: 'excellent' },
          { id: 'ev115', type: 'backtest-results', description: 'Suspicious Wire Pattern Detection', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fincen-travel-rule-section-4',
        title: 'Missing Information and Data Quality Controls',
        reference: 'Regulatory Guidance and Examination Expectations',
        text: 'Institutions should have procedures to address missing or incomplete Travel Rule information. Transaction monitoring must monitor for incoming wires with missing originator information, track sending institutions with frequent data quality issues, detect patterns of incomplete information, flag transactions for enhanced review when information is missing, document requests for missing information, and consider filing SARs for suspicious transfers with incomplete information. Institutions should assess whether to continue relationships with institutions providing poor quality data.',
        metadata: {
          jurisdiction: ['US'],
          productType: ['commercial-banking'],
          customerType: ['corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev116', type: 'compliance-monitoring', description: 'Data Quality Improvement Tracking', quality: 'good' },
          { id: 'ev117', type: 'audit-report', description: 'Correspondent Relationship Assessment', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'germany-aml',
    title: 'Germany – Anti-Money Laundering',
    type: 'regulatory',
    jurisdiction: 'DE',
    lastUpdated: '2025-01-15',
    visible: true,
    clauses: [
      {
        id: 'germany-aml-section-1',
        title: 'Ongoing Monitoring of Business Relationships (Laufende Überwachung)',
        reference: 'Section 10 GwG',
        text: 'Obliged entities must continuously monitor business relationships including transactions carried out throughout the relationship. Monitoring must ensure transactions are consistent with documents and information about the contracting party, beneficial owner, and customer\'s business and risk profile. Continuous monitoring frequency and intensity must be appropriate to customer\'s risk profile with reviews conducted when circumstances change or red flags arise. Transaction monitoring systems must flag transactions inconsistent with known customer activity, business type, or risk assessment.',
        metadata: {
          jurisdiction: ['DE'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev118', type: 'regulatory-guidance', description: 'GwG Section 10 Implementation', quality: 'excellent' },
          { id: 'ev119', type: 'policy-documentation', description: 'Continuous Monitoring Procedures', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'germany-aml-section-2',
        title: 'Risk-Based Approach and Periodic KYC Updates',
        reference: 'Section 10 GwG; BaFin Guidance (Feb 2025)',
        text: 'Apply transaction monitoring intensity proportionate to assessed ML/FT risks. Enhanced due diligence customers require information updates at least every one year with intensified monitoring, lower alert thresholds, and senior management notification. General due diligence customers require updates every five years. Simplified due diligence permitted for low-risk customers with less frequent reviews where allowed. Systems must track customer information age and trigger periodic reviews at prescribed intervals with automated workflows prompting compliance teams.',
        metadata: {
          jurisdiction: ['DE'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev120', type: 'regulatory-guidance', description: 'BaFin Guidance (February 1, 2025)', quality: 'excellent' },
          { id: 'ev121', type: 'compliance-monitoring', description: 'KYC Update Timeliness Tracking', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'germany-aml-section-3',
        title: 'Suspicious Transaction Detection and FIU Reporting',
        reference: 'Section 43 GwG',
        text: 'Detect and report transactions suspected of money laundering or terrorist financing to Germany\'s Financial Intelligence Unit (FIU) without delay. Base suspicion detection on deviation from normal customer patterns, transaction characteristics inconsistent with customer profile, transactions matching known typologies, and unusual patterns. Generate alerts for transactions matching suspicious typologies or deviating significantly from customer profiles. Maintain written documentation of analysis leading to suspicious transaction reports and continue monitoring after filing without customer notification.',
        metadata: {
          jurisdiction: ['DE'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev122', type: 'compliance-monitoring', description: 'FIU Reporting Quality Metrics', quality: 'excellent' },
          { id: 'ev123', type: 'audit-report', description: 'Suspicious Activity Detection Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'germany-aml-section-4',
        title: 'Cash and Cross-Border Transaction Monitoring',
        reference: 'GwG; Future EU AMLR',
        text: 'Monitor cash transactions for unusual patterns and enforce future Europe-wide upper limit of €10,000 for cash payments effective July 10, 2027. Systems must aggregate cash transactions to detect structuring, alert for unusual cash patterns and round-number amounts, and identify customers systematically avoiding detection thresholds. Cross-border wire transfers require enhanced scrutiny with monitoring for transactions to high-risk jurisdictions, incomplete wire transfer information, unusual routing patterns, and threshold avoidance through aggregated cross-border transfers.',
        metadata: {
          jurisdiction: ['DE'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev124', type: 'performance-data', description: 'Cash Transaction Monitoring Metrics', quality: 'excellent' },
          { id: 'ev125', type: 'audit-report', description: 'Cross-Border Wire Transfer Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'germany-aml-section-5',
        title: 'System Testing, Validation, and Governance',
        reference: 'BaFin Guidance; GwG Internal Controls',
        text: 'Establish adequate internal controls, policies, and procedures for transaction monitoring with formal governance frameworks. Conduct regular testing and validation of monitoring systems including periodic scenario testing, false positive rate analysis, detection of known suspicious activity through back-testing, and review of alert disposition outcomes. Document monitoring system configurations, rule and threshold calibration rationale, testing methodologies and results, and system performance metrics. Provide training to staff and report effectiveness to senior management.',
        metadata: {
          jurisdiction: ['DE'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev126', type: 'backtest-results', description: 'Monitoring System Validation Results', quality: 'excellent' },
          { id: 'ev127', type: 'audit-report', description: 'Governance Framework Review', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'italy-aml',
    title: 'Italy – Anti-Money Laundering',
    type: 'regulatory',
    jurisdiction: 'IT',
    lastUpdated: '2025-01-15',
    visible: true,
    clauses: [
      {
        id: 'italy-aml-section-1',
        title: 'Ongoing Monitoring of Customer Relationships',
        reference: 'Article 35 D.Lgs. 231/2007',
        text: 'Obliged entities must carry out ongoing monitoring of business relationships on a continuous basis, scrutinizing transactions throughout the course of the relationship. Monitoring must ensure transactions are consistent with knowledge of the customer and beneficial owner, customer\'s business and activity profile, risk profile, and source of funds where necessary. Implement objective procedures consistent with risk-based criteria considering type of customer, geographic area, delivery channels, and products and services offered. Conduct monitoring with frequency appropriate to the risk level.',
        metadata: {
          jurisdiction: ['IT'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev128', type: 'regulatory-filing', description: 'D.Lgs. 231/2007 Article 35', quality: 'excellent' },
          { id: 'ev129', type: 'policy-documentation', description: 'Continuous Monitoring Procedures', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'italy-aml-section-2',
        title: 'Threshold-Based Monitoring and UIF Anomaly Indicators',
        reference: 'Article 12, 16 D.Lgs. 231/2007; UIF Indicators',
        text: 'Monitor occasional transactions ≥€15,000 and fund transfers ≥€1,000 (non-SEPA) with detection of structuring and aggregation patterns. Implement UIF anomaly indicators as detection scenarios including cash-related anomalies, geographic anomalies, beneficial ownership anomalies, third-party transaction anomalies, and structuring anomalies. Systems must aggregate transactions to detect threshold avoidance with alerts triggering when customers approach or exceed €15,000 in transactions or €1,000 in non-SEPA transfers. Update monitoring scenarios as UIF publishes new typologies.',
        metadata: {
          jurisdiction: ['IT'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev130', type: 'regulatory-guidance', description: 'UIF Anomaly Indicators', quality: 'excellent' },
          { id: 'ev131', type: 'performance-data', description: 'Threshold Monitoring Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'italy-aml-section-3',
        title: 'Suspicious Transaction Reporting to UIF',
        reference: 'Article 35, 41 D.Lgs. 231/2007',
        text: 'Identify suspicious transactions based on specific anomaly indicators adopted by UIF and assess objective risk of money laundering or terrorist financing. Report suspicious transactions to UIF without delay based on deviation from normal patterns, characteristics inconsistent with customer profile, transactions matching UIF anomaly typologies, and unusual patterns. Maintain written documentation of analysis leading to suspicious transaction reports and continue monitoring customer relationships after filing without customer disclosure.',
        metadata: {
          jurisdiction: ['IT'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev132', type: 'compliance-monitoring', description: 'UIF Reporting Quality Metrics', quality: 'excellent' },
          { id: 'ev133', type: 'audit-report', description: 'Suspicious Activity Detection Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'italy-aml-section-4',
        title: 'Enhanced Monitoring for PEPs and High-Risk Customers',
        reference: 'Article 25, 24 D.Lgs. 231/2007',
        text: 'Apply enhanced transaction monitoring for politically exposed persons (Italian and foreign), family members of PEPs, known close associates of PEPs, customers from high-risk third countries, and customers with complex beneficial ownership structures. PEP and high-risk customer accounts must have specialized monitoring profiles with lower thresholds, more sensitive rules, and automated escalation to senior management. Obtain senior management approval to establish or continue relationships, apply intensified ongoing monitoring, scrutinize source of wealth and funds, and maintain enhanced monitoring for at least one year after PEP ceases prominent function.',
        metadata: {
          jurisdiction: ['IT'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev134', type: 'performance-data', description: 'PEP Monitoring Effectiveness', quality: 'excellent' },
          { id: 'ev135', type: 'audit-report', description: 'Enhanced Due Diligence Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'italy-aml-section-5',
        title: 'System Testing, Validation, and Record-Keeping',
        reference: 'Article 36 D.Lgs. 231/2007; Bank of Italy Provisions',
        text: 'Maintain transaction records for at least ten years from date of last transaction including transaction details, customer identification information, supporting documentation, analysis and investigation records for alerts, and risk assessments. Conduct periodic testing of monitoring scenarios including false positive rate analysis, assessment of detection of known suspicious activity, and review of alert disposition outcomes. Document testing methodologies, results, and remediation actions. Update scenarios based on testing outcomes and emerging typologies with formal governance frameworks supporting effective monitoring.',
        metadata: {
          jurisdiction: ['IT'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev136', type: 'backtest-results', description: 'System Validation Results', quality: 'excellent' },
          { id: 'ev137', type: 'audit-report', description: 'Record-Keeping Compliance Review', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'spain-aml',
    title: 'Spain – Anti-Money Laundering',
    type: 'regulatory',
    jurisdiction: 'ES',
    lastUpdated: '2025-01-15',
    visible: true,
    clauses: [
      {
        id: 'spain-aml-section-1',
        title: 'Ongoing Monitoring and Risk-Based Approach',
        reference: 'Article 7 Law 10/2010; Royal Decree 304/2014',
        text: 'Obliged subjects must obtain information on the purpose and intended nature of business relationships and conduct ongoing monitoring on transactions undertaken throughout the relationship. Scrutinize transactions to ensure consistency with knowledge of the customer, customer\'s business and risk profile, commercial activity, and source of funds where necessary. Apply ongoing monitoring throughout entire duration of business relationships on a risk-sensitive basis with intensified monitoring when customer circumstances change or red flags arise. Update documents, data, and information with appropriate frequency.',
        metadata: {
          jurisdiction: ['ES'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev138', type: 'regulatory-filing', description: 'Law 10/2010 Article 7', quality: 'excellent' },
          { id: 'ev139', type: 'policy-documentation', description: 'Ongoing Monitoring Procedures', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'spain-aml-section-2',
        title: 'Detection and Reporting of Suspicious Transactions to SEPBLAC',
        reference: 'Article 17, 18 Law 10/2010',
        text: 'Pay special attention to any event or transaction regardless of its size which by its nature could be related to money laundering or terrorist financing. Record results of analysis in writing and conduct structured special review (examen especial) of suspicious transactions. Report to SEPBLAC on their own initiative any act or transaction (even mere attempts) that following structured review shows any indication or certainty of relation to money laundering or terrorist financing. Submit suspicious transaction reports to SEPBLAC without delay (sin demora) while continuing monitoring after filing without customer disclosure.',
        metadata: {
          jurisdiction: ['ES'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev140', type: 'compliance-monitoring', description: 'SEPBLAC Reporting Quality Metrics', quality: 'excellent' },
          { id: 'ev141', type: 'audit-report', description: 'Structured Review Documentation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'spain-aml-section-3',
        title: 'SEPBLAC Risk Indicators and Systematic Reporting',
        reference: 'Article 17 Law 10/2010; Article 27.1 RD 304/2014',
        text: 'Implement transaction monitoring scenarios based on SEPBLAC-published risk indicators including customer behavior indicators, transaction characteristic indicators, geographic indicators, and product/service indicators. Risk indicators are not exhaustive lists but examples requiring obliged subjects to develop their own lists adapted to their experience and risk assessment. Obliged subjects must report to SEPBLAC monthly the transactions referred to in Article 27.1 for systematic reporting in addition to suspicious transaction reports. Update monitoring scenarios as SEPBLAC issues new or revised risk indicators.',
        metadata: {
          jurisdiction: ['ES'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev142', type: 'regulatory-guidance', description: 'SEPBLAC Risk Indicator Catalogues (2024-2025)', quality: 'excellent' },
          { id: 'ev143', type: 'performance-data', description: 'Systematic Reporting Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'spain-aml-section-4',
        title: 'Enhanced Monitoring for PEPs and High-Risk Countries',
        reference: 'Law 10/2010; Royal Decree 304/2014',
        text: 'Conduct enhanced monitoring for foreign and domestic politically exposed persons, PEPs in international organizations, family members of PEPs, and known close associates of PEPs. Apply enhanced monitoring for transactions involving EU-designated high-risk third countries with additional information gathering, increased controls on specific business relationships, and senior management approval prior to establishing or continuing relationships. PEP-flagged accounts require specialized monitoring profiles with lower detection thresholds, more sensitive rules, and automated escalation to senior management.',
        metadata: {
          jurisdiction: ['ES'],
          productType: ['commercial-banking', 'wealth-management'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev144', type: 'performance-data', description: 'PEP Enhanced Monitoring Effectiveness', quality: 'excellent' },
          { id: 'ev145', type: 'audit-report', description: 'High-Risk Country Transaction Review', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'spain-aml-section-5',
        title: 'Internal Controls, Testing, and Record-Keeping',
        reference: 'Article 26, 27 Law 10/2010',
        text: 'Adopt in writing and implement adequate policies and procedures covering customer due diligence, information gathering and analysis, record keeping, internal control, risk assessment and management, compliance ensuring, reporting, and customer acceptance. Policies must be designed to prevent and forestall transactions related to money laundering or terrorist financing. Conduct periodic testing of monitoring scenarios including false positive analysis, back-testing against known suspicious activity, and alert disposition review. Retain records for minimum five years extendable to ten years with comprehensive audit trails supporting regulatory examinations.',
        metadata: {
          jurisdiction: ['ES'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev146', type: 'backtest-results', description: 'System Testing and Validation', quality: 'excellent' },
          { id: 'ev147', type: 'audit-report', description: 'Internal Controls Review', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'wolfsberg',
    title: 'Wolfsberg Group Standards',
    type: 'supplement',
    jurisdiction: 'International',
    lastUpdated: '2025-01-15',
    visible: true,
    clauses: [
      {
        id: 'wolfsberg-section-1',
        title: 'Risk-Based Monitoring for Suspicious Activity',
        reference: 'Wolfsberg Statement on Effective Monitoring (2024)',
        text: 'Financial institutions should prioritize activities that monitor crystallized risk rather than theoretical risk, casting a wider net than just transaction monitoring to include customer behavior and attributes. Monitor transactions in combination with customer behavior and attributes, focus on effectiveness over volume of alerts, prioritize crystallized risk over theoretical risk, apply risk-based approach to monitoring intensity, design monitoring to produce actionable intelligence, and avoid excessive false positives that dilute effectiveness.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev148', type: 'regulatory-guidance', description: 'Wolfsberg Effective Monitoring Statement (2024)', quality: 'excellent' },
          { id: 'ev149', type: 'policy-documentation', description: 'Risk-Based Monitoring Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'wolfsberg-section-2',
        title: 'Ongoing Monitoring and Enhanced Measures for Higher-Risk Customers',
        reference: 'Wolfsberg AML Principles for Private Banking',
        text: 'Financial institutions must conduct ongoing monitoring of client transactions to ensure consistency with the institution\'s knowledge of the customer, their business, and risk profile. Relationships with higher-risk customers should be subject to more intensive ongoing monitoring with more frequent review of high-risk accounts, lower alert thresholds for high-risk customers, enhanced investigation of alerts, trigger event reviews when risk indicators appear, and review when materially adverse media reports, sanctions, or regulatory actions occur.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['wealth-management'],
          customerType: ['individual', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev150', type: 'policy-documentation', description: 'Private Banking AML Principles', quality: 'excellent' },
          { id: 'ev151', type: 'performance-data', description: 'Enhanced Monitoring Effectiveness', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'wolfsberg-section-3',
        title: 'Correspondent Banking and RFI Process',
        reference: 'Wolfsberg Correspondent Banking Principles (2022); RFI Guidance',
        text: 'Monitor the respondent institution\'s transactions and review that these are in line with information collected during customer due diligence. Monitor for changes in transaction volumes or patterns, unusual activity, and adherence to agreed relationship terms. When transaction monitoring identifies potentially suspicious or unusual activity, issue Requests for Information (RFIs) to obtain clarification. Provide clear specific questions about flagged transactions, set reasonable timeframes for responses, document RFI process, and escalate non-responsive or inadequate responses with consideration of relationship termination for repeated inadequate responses.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev152', type: 'regulatory-guidance', description: 'Correspondent Banking Principles (2022)', quality: 'excellent' },
          { id: 'ev153', type: 'policy-documentation', description: 'RFI Best Practice Guidance (2022)', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'wolfsberg-section-4',
        title: 'Innovation and Technology Adoption',
        reference: 'Wolfsberg Statement on Effective Monitoring Part II (2024)',
        text: 'Financial institutions should establish a responsible transition framework for innovation in suspicious activity monitoring including use of artificial intelligence (AI) and machine learning (ML). Three core pillars for responsible innovation include transition and validation of new monitoring approaches, balancing model risk with financial crime risk, and explainability to demonstrate transparency in coverage and effectiveness. Use AI and ML to enhance detection, leverage ML models to analyze transaction patterns, predict potential risks based on behavioral anomalies, document model validation and testing, and maintain human oversight of automated decisions.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'medium',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev154', type: 'regulatory-guidance', description: 'Wolfsberg Innovation Statement (2024)', quality: 'excellent' },
          { id: 'ev155', type: 'backtest-results', description: 'AI/ML Model Validation', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'wolfsberg-section-5',
        title: 'Focus on Outcomes and Effectiveness',
        reference: 'Wolfsberg Statement on Effective Monitoring (2024)',
        text: 'Financial institutions should measure effectiveness of monitoring programs based on quality of outcomes not volume of alerts or reports. Measure quality of suspicious activity reports (SARs/STRs) not just quantity, assess whether monitoring contributes to effective outcomes in fight against financial crime, evaluate whether increased volumes provide proportionate value, focus resources on high-quality detection and investigation, reduce noise from low-quality alerts, and demonstrate value to law enforcement and regulators through feedback loop between CDD and transaction monitoring.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev156', type: 'performance-data', description: 'SAR Quality Metrics and Law Enforcement Feedback', quality: 'excellent' },
          { id: 'ev157', type: 'audit-report', description: 'Monitoring Effectiveness Assessment', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fatf-40-recommendations',
    title: 'FATF 40 Recommendations',
    type: 'regulatory',
    jurisdiction: 'International',
    lastUpdated: '2025-06-01',
    visible: true,
    clauses: [
      {
        id: 'fatf-rec10-monitoring',
        title: 'Ongoing Monitoring and Transaction Scrutiny',
        reference: 'Recommendation 10',
        text: 'Financial institutions must conduct ongoing due diligence and scrutiny of transactions throughout the business relationship to ensure transactions are consistent with the institution\'s knowledge of the customer, their business and risk profile, including the source of funds where necessary. Enhanced scrutiny is required when transactions do not match the customer\'s expected risk profile.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev158', type: 'regulatory-guidance', description: 'FATF Recommendation 10 Interpretive Note', quality: 'excellent' },
          { id: 'ev159', type: 'policy-documentation', description: 'Ongoing Monitoring Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rec11-records',
        title: 'Record-Keeping for Transaction Monitoring',
        reference: 'Recommendation 11',
        text: 'Financial institutions must maintain records of all transactions, both domestic and international, for at least five years to allow reconstruction of individual transactions and provide evidence for potential criminal proceedings. Records must be sufficient to permit transaction tracing and be accessible for investigation purposes.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev160', type: 'audit-report', description: 'Record Retention Compliance Review', quality: 'excellent' },
          { id: 'ev161', type: 'performance-data', description: 'Transaction Record Audit Trail', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rec16-wire',
        title: 'Monitoring of Wire Transfers',
        reference: 'Recommendation 16',
        text: 'Financial institutions must collect, verify, and transmit originator and beneficiary information for wire transfers to create a suitable AML/CFT audit trail. Institutions must implement risk-based policies for handling transfers with incomplete information, monitor for repeated non-compliance, and apply to both traditional institutions and virtual asset service providers.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev162', type: 'performance-data', description: 'Wire Transfer Monitoring Effectiveness', quality: 'excellent' },
          { id: 'ev163', type: 'backtest-results', description: 'Travel Rule Compliance Testing', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rec20-suspicious',
        title: 'Detection and Reporting of Suspicious Transactions',
        reference: 'Recommendation 20',
        text: 'Financial institutions must monitor all transactions to detect suspicious activity and report promptly to the FIU when suspecting funds are proceeds of criminal activity or related to terrorist financing. Monitoring systems must flag unusual movements, implement case management for timely scrutiny, and report all suspicious transactions regardless of amount.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev164', type: 'performance-data', description: 'Suspicious Transaction Detection Metrics', quality: 'excellent' },
          { id: 'ev165', type: 'audit-report', description: 'FIU Reporting Quality Assessment', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-complex-unusual',
        title: 'Special Attention to Complex and Unusual Transactions',
        reference: 'Recommendations 10, 11, 20',
        text: 'Financial institutions must pay special attention to all complex, unusual large transactions, and unusual patterns of transactions with no apparent economic or visible lawful purpose. Institutions must investigate such transactions, document findings, and keep findings available for competent authorities and auditors for at least five years.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev166', type: 'backtest-results', description: 'Complex Transaction Detection Analysis', quality: 'good' },
          { id: 'ev167', type: 'performance-data', description: 'Unusual Pattern Monitoring', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fatf-correspondent-banking',
    title: 'FATF Correspondent Banking Guidance',
    type: 'regulatory',
    jurisdiction: 'International',
    lastUpdated: '2016-10-01',
    visible: true,
    clauses: [
      {
        id: 'fatf-corr-ongoing',
        title: 'Mandatory Ongoing Monitoring Requirement',
        reference: 'FATF Correspondent Banking Guidance',
        text: 'Correspondent banking relationships must always be subject to ongoing monitoring throughout the relationship life. Monitoring is essential for detecting changes in risk profile and ensuring compliance with AML/CFT measures, with no exceptions for lower-risk relationships though monitoring intensity may vary based on risk assessment.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev168', type: 'regulatory-guidance', description: 'FATF Correspondent Banking Guidance (2016)', quality: 'excellent' },
          { id: 'ev169', type: 'policy-documentation', description: 'Correspondent Relationship Monitoring Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-corr-risk-changes',
        title: 'Monitoring for Risk Profile Changes',
        reference: 'FATF Correspondent Banking Guidance',
        text: 'Correspondent institutions must monitor respondent transactions to detect changes in the respondent\'s risk profile or implementation of risk mitigation measures. Monitoring must cover transaction volumes, types, patterns, and geographic focus to identify deviations from expected activity profiles and changes indicating increased risk.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev170', type: 'performance-data', description: 'Respondent Risk Profile Monitoring', quality: 'excellent' },
          { id: 'ev171', type: 'backtest-results', description: 'Transaction Pattern Analysis', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-corr-unusual',
        title: 'Detection of Unusual Activity',
        reference: 'FATF Correspondent Banking Guidance',
        text: 'Correspondent institutions must monitor for unusual activity or transactions by respondent institutions, including transactions inconsistent with the respondent\'s business model, unusual sizes, frequencies, geographic patterns, counterparties, or transactions with no apparent economic purpose. Enhanced monitoring with real-time capabilities is required for higher-risk relationships.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev172', type: 'performance-data', description: 'Unusual Activity Detection Metrics', quality: 'excellent' },
          { id: 'ev173', type: 'audit-report', description: 'Real-Time Monitoring Effectiveness', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-corr-rfi',
        title: 'Request for Information Process',
        reference: 'FATF Correspondent Banking Guidance',
        text: 'When monitoring detects concerns, correspondent institutions must follow up with respondents through formal Request for Information (RFI) procedures. Institutions must document flagged transactions, request clarification, set response timeframes, track response quality, and escalate unresponsive or inadequate responses as part of assessing the respondent\'s AML/CFT program quality.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev174', type: 'policy-documentation', description: 'RFI Process and Escalation Procedures', quality: 'excellent' },
          { id: 'ev175', type: 'performance-data', description: 'RFI Response Quality Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-corr-nested',
        title: 'Nested Relationships and Payable-Through Accounts Monitoring',
        reference: 'FATF Correspondent Banking Guidance',
        text: 'Where correspondent relationships involve nested relationships or payable-through accounts, institutions must apply enhanced monitoring to address increased risks. Monitoring must detect nested relationship indicators, sub-account structures, indirect access arrangements, and ultimate transaction parties while identifying shell bank indicators and structuring across sub-accounts.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['commercial-banking'],
          customerType: ['business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev176', type: 'backtest-results', description: 'Nested Relationship Detection Analysis', quality: 'good' },
          { id: 'ev177', type: 'performance-data', description: 'Sub-Account Monitoring Effectiveness', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fatf-methodology',
    title: 'FATF Methodology for Technical Compliance',
    type: 'regulatory',
    jurisdiction: 'International',
    lastUpdated: '2025-06-01',
    visible: true,
    clauses: [
      {
        id: 'fatf-method-rec10',
        title: 'Assessment Criteria for Ongoing Monitoring',
        reference: 'FATF Methodology Criterion 10.7',
        text: 'Financial institutions must be legally required to conduct ongoing due diligence and transaction scrutiny throughout business relationships to verify consistency with customer knowledge, business profile, and risk profile including source of funds. Risk-based application required with enhanced measures for higher-risk situations and simplified measures permitted for lower risks based on reasonable monetary thresholds.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev178', type: 'regulatory-guidance', description: 'FATF Methodology Technical Compliance Standards', quality: 'excellent' },
          { id: 'ev179', type: 'audit-report', description: 'Ongoing Monitoring Compliance Assessment', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-method-rec11',
        title: 'Transaction Record Retention Requirements',
        reference: 'FATF Methodology Criterion 11.1',
        text: 'Financial institutions must maintain all transaction records for minimum five years to permit reconstruction of individual transactions and provide evidence for prosecution. Records must be sufficient to allow transaction tracing, be accessible to competent authorities, and cover both domestic and international transactions with preliminary business relationship analyses.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev180', type: 'policy-documentation', description: 'Record Retention Policy Framework', quality: 'excellent' },
          { id: 'ev181', type: 'performance-data', description: 'Record Reconstruction Testing', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-method-rec16',
        title: 'Wire Transfer Information Assessment Criteria',
        reference: 'FATF Methodology Criteria 16.1-16.8',
        text: 'Countries must ensure institutions obtain and maintain originator and beneficiary information for wire transfers with required verification of accuracy. Beneficiary institutions must detect missing information, implement risk-based procedures for incomplete transfers including execution, rejection, or suspension decisions, and monitor repeated compliance failures with termination procedures for non-compliant counterparties.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev182', type: 'backtest-results', description: 'Wire Transfer Compliance Testing', quality: 'excellent' },
          { id: 'ev183', type: 'performance-data', description: 'Incomplete Transfer Handling Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-method-rec20',
        title: 'Suspicious Transaction Reporting Requirements',
        reference: 'FATF Methodology Criteria 20.1-20.2',
        text: 'Direct mandatory legal obligation required for institutions to report suspicions promptly to FIU when suspecting or having reasonable grounds to suspect funds are proceeds of criminal activity or related to terrorist financing. Transaction monitoring systems must be in place to detect suspicious transactions, with reporting required for all suspicious transactions including attempted transactions regardless of amount.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev184', type: 'audit-report', description: 'STR Filing Compliance Review', quality: 'excellent' },
          { id: 'ev185', type: 'performance-data', description: 'Suspicious Activity Detection Metrics', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-method-effectiveness',
        title: 'Effectiveness Assessment for Preventive Measures',
        reference: 'FATF Methodology Immediate Outcome 4',
        text: 'Financial institutions must demonstrate effective application of appropriate CDD including ongoing monitoring, with quality and accuracy of transaction monitoring systems being critical. Assessment focuses on risk-based monitoring intensity, detection of unusual or suspicious transactions, timely identification of risk changes, and overall effectiveness of preventive measures in practice.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-06-01'
        },
        evidence: [
          { id: 'ev186', type: 'performance-data', description: 'Monitoring System Effectiveness Analysis', quality: 'good' },
          { id: 'ev187', type: 'audit-report', description: 'Risk-Based Approach Assessment', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  },
  {
    id: 'fatf-risk-based-guidance',
    title: 'FATF Risk-Based Approach Guidance',
    type: 'regulatory',
    jurisdiction: 'International',
    lastUpdated: '2021-07-01',
    visible: true,
    clauses: [
      {
        id: 'fatf-rba-approach',
        title: 'Risk-Based Transaction Monitoring',
        reference: 'FATF Risk-Based Approach Guidance',
        text: 'Financial institutions must identify and understand ML/TF risks and adjust transaction monitoring processes according to customer risk profiles. Monitoring intensity must be risk-based with enhanced monitoring for high-risk customers, simplified measures for lower-risk customers while still monitoring, and regular review and updating of risk assessments with corresponding monitoring adjustments.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev188', type: 'regulatory-guidance', description: 'FATF Risk-Based Approach for Banking Sector (2014)', quality: 'excellent' },
          { id: 'ev189', type: 'policy-documentation', description: 'Risk-Based Monitoring Framework', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rba-continuous',
        title: 'Continuous and Triggered Monitoring',
        reference: 'Risk-Based Approach for Banking Sector',
        text: 'Monitoring must be conducted continuously or triggered by specific transactions, with comparison of customer activity against peer groups. Systems must monitor for deviations from expected behavior and peer group norms, implementing both continuous monitoring and event-triggered monitoring capabilities to detect inconsistencies with customer profiles.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev190', type: 'performance-data', description: 'Continuous Monitoring Effectiveness Metrics', quality: 'excellent' },
          { id: 'ev191', type: 'backtest-results', description: 'Peer Group Comparison Analysis', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rba-automated',
        title: 'Automated Transaction Monitoring Systems',
        reference: 'Risk-Based Approach for Banking Sector',
        text: 'For high-volume transaction environments, automated systems may be the only realistic monitoring method. Institutions must understand operating rules of monitoring systems, verify system integrity regularly, validate that systems address identified ML/TF risks, test detection capabilities, and document all system rules and parameters.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'critical',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev192', type: 'audit-report', description: 'Automated System Validation Review', quality: 'excellent' },
          { id: 'ev193', type: 'performance-data', description: 'System Integrity Testing Results', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rba-technology',
        title: 'Technology and Innovation in Monitoring',
        reference: 'Opportunities and Challenges of New Technologies (2021)',
        text: 'Financial institutions should leverage modern technologies to improve transaction monitoring effectiveness, including systems that reduce manual input and false positives, identify complex cases, and facilitate risk management. Implementation of AI, machine learning for large volume analysis, real-time monitoring capabilities, and advanced analytics for sophisticated schemes detection is encouraged.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev194', type: 'performance-data', description: 'AI/ML False Positive Reduction Analysis', quality: 'good' },
          { id: 'ev195', type: 'backtest-results', description: 'Advanced Analytics Detection Testing', quality: 'good' }
        ],
        linkedRules: []
      },
      {
        id: 'fatf-rba-testing',
        title: 'Periodic Review and Testing of Monitoring Systems',
        reference: 'Risk-Based Supervision Guidance',
        text: 'Financial institutions must conduct regular risk assessments and testing to ensure transaction monitoring systems remain effective. Required activities include periodic monitoring effectiveness reviews, testing against known scenarios, validation of detection capabilities, assessment of false positive and negative rates, updating monitoring rules based on emerging risks, and independent testing with documented results and remediation actions.',
        metadata: {
          jurisdiction: ['International'],
          productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
          customerType: ['individual', 'business', 'corporate'],
          riskLevel: 'high',
          lastReviewed: '2025-01-15'
        },
        evidence: [
          { id: 'ev196', type: 'audit-report', description: 'Independent Monitoring System Testing', quality: 'excellent' },
          { id: 'ev197', type: 'performance-data', description: 'Detection Capability Validation', quality: 'good' }
        ],
        linkedRules: []
      }
    ]
  }
];

// Rule Performance Data
export const rules = [
  {
    id: 'rule-1',
    name: 'Large Cash Transaction Detection',
    category: 'Cash Monitoring',
    description: 'Implements BSA § 1020.210 requirement for automated detection of cash transactions above $10,000 and aggregated transactions exceeding $10,000 within 24-hour periods. Monitors all cash deposits, withdrawals, and cash equivalents including cashier\'s checks and money orders. Generates CTR alerts and identifies potential structuring patterns.',
    regulatoryBasis: 'BSA § 1020.210 Internal Controls, BSA § 1010.313 Currency Transaction Reports',
    implementedRequirements: [
      {
        requirementId: 'bsa-1020-210',
        description: 'Automated cash transaction monitoring above $10,000'
      },
      {
        requirementId: 'bsa-1010-313',
        description: 'CTR filing for currency transactions and aggregated transactions'
      }
    ],
    lastUpdated: '2024-01-15',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking', 'commercial-banking'],
      customerType: ['individual', 'business'],
      riskLevel: 'high'
    },
    performance: {
      alertsPerMonth: 2847,
      truePositiveRate: 0.23,
      alertsInvestigated: 656,
      coverage: 5,
      avgResolutionDays: 12,
      lastBacktest: '2024-01-15',
      backtestScore: 3
    },
    evidence: {
      lastAdded: '2024-01-20',
      types: ['backtest-results', 'threshold-analysis']
    },
    linkedClauses: ["bsa-1020-210","bsa-1010-313","bsa-1020-700","bsa-1020-800","bsa-1020-900","bsa-1020-1000","bsa-1020-1100","uk-mlr-2017-reg-18","uk-mlr-2017-reg-19","uk-mlr-2017-reg-21","uk-mlr-2017-reg-22","uk-mlr-2017-reg-24","uk-mlr-2017-reg-26","uk-mlr-2017-reg-40","eu-amld5-art13","pcmla-s9-1","aml-ctf-s82"]
  },
  {
    id: 'rule-2',
    name: 'Structuring Pattern Analysis',
    category: 'Behavioral Analytics',
    description: 'Implements BSA § 1020.320 requirement to detect suspicious structuring patterns. Analyzes multiple transactions just below $10,000 reporting thresholds within 7-day periods. Applies machine learning to identify unusual transaction velocity and round-number transaction patterns that may indicate layering activities.',
    regulatoryBasis: 'BSA § 1020.320(a) Suspicious Activity Reporting',
    implementedRequirements: [
      {
        requirementId: 'bsa-1020-320-a',
        description: 'Detection of transactions involving funds from illegal activity through pattern analysis'
      }
    ],
    lastUpdated: '2024-01-10',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking'],
      customerType: ['individual', 'business'],
      riskLevel: 'high'
    },
    performance: {
      alertsPerMonth: 1203,
      truePositiveRate: 0.31,
      alertsInvestigated: 373,
      coverage: 5,
      avgResolutionDays: 15,
      lastBacktest: '2024-01-10',
      backtestScore: 4
    },
    evidence: {
      lastAdded: '2024-01-12',
      types: ['pattern-analysis', 'behavior-modeling']
    },
    linkedClauses: ["bsa-1020-220","bsa-1020-320-a","bsa-1020-400","bsa-1020-410","bsa-1020-700","bsa-1020-800","bsa-1020-900","bsa-1020-1000","bsa-1020-1100","uk-mlr-2017-reg-18","uk-mlr-2017-reg-19","uk-mlr-2017-reg-21","uk-mlr-2017-reg-22","uk-mlr-2017-reg-24","uk-mlr-2017-reg-26","uk-mlr-2017-reg-27","uk-mlr-2017-reg-28","uk-mlr-2017-reg-29","uk-mlr-2017-reg-30","uk-mlr-2017-reg-35","uk-mlr-2017-reg-37","uk-mlr-2017-reg-39","uk-mlr-2017-reg-40","amlo-s7","pcmla-s6-1","aml-ctf-s43","cdsa-s48f","narcotics-s4","amla-art6","uae-aml-art16","tmp-006"]
  },
  {
    id: 'rule-3',
    name: 'Cross-Border Wire Monitoring',
    category: 'Wire Transfer Monitoring',
    description: 'Implements BSA § 1020.315 funds transfer recordkeeping and BSA § 1020.240 correspondent account due diligence requirements. Monitors wire transfers above $3,000 for complete originator/beneficiary information, screens against sanctions lists, and applies enhanced scrutiny to high-risk jurisdictions and correspondent banking relationships.',
    regulatoryBasis: 'BSA § 1020.315 Funds Transfer Records, BSA § 1020.240 Correspondent Account Due Diligence',
    implementedRequirements: [
      {
        requirementId: 'bsa-1020-315',
        description: 'Wire transfer recordkeeping and incomplete transfer monitoring above $3,000'
      },
      {
        requirementId: 'bsa-1020-240',
        description: 'Enhanced monitoring for correspondent account transactions'
      }
    ],
    lastUpdated: '2024-01-05',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking', 'commercial-banking'],
      customerType: ['individual', 'business', 'corporate'],
      riskLevel: 'high'
    },
    performance: {
      alertsPerMonth: 892,
      truePositiveRate: 0.18,
      alertsInvestigated: 161,
      coverage: 4,
      avgResolutionDays: 18,
      lastBacktest: '2024-01-05',
      backtestScore: 3
    },
    evidence: {
      lastAdded: '2024-01-08',
      types: ['wire-analysis', 'geographic-risk']
    },
    linkedClauses: ["bsa-1020-240","bsa-1020-315","bsa-1020-800","bsa-1020-1100","uk-mlr-2017-reg-19","uk-mlr-2017-reg-26","pcmla-s9-1","tmp-006"]
  },
  {
    id: 'rule-8',
    name: 'UK Enhanced Transaction Monitoring',
    description: 'Implements UK MLR 2017 Regulation 28 ongoing monitoring requirements. Conducts enhanced scrutiny of transactions for consistency with customer knowledge, business and risk profile. Applies risk-based monitoring parameters that account for customer type, geographic factors, and established transaction patterns per UK regulatory guidance.',
    regulatoryBasis: 'UK MLR 2017 Regulation 28 Ongoing Monitoring',
    category: 'Geographic Risk Monitoring',
    implementedRequirements: [
      {
        requirementId: 'uk-mlr-2017-reg-28',
        description: 'Ongoing monitoring of business relationships with transaction scrutiny'
      }
    ],
    status: 'active',
    lastUpdated: '2024-01-20',
    metadata: {
      jurisdiction: ['UK'],
      productType: ['retail-banking', 'commercial-banking'],
      customerType: ['individual', 'business', 'corporate'],
      riskLevel: 'high'
    },
    performance: {
      alertsPerMonth: 145,
      truePositiveRate: 0.24,
      alertsInvestigated: 145,
      coverage: 5,
      lastBacktest: '2024-01-20',
      backtestScore: 5
    },
    evidence: {
      lastAdded: '2024-01-22',
      types: ['geographic-analysis', 'cross-border-monitoring']
    },
    linkedClauses: ["bsa-1020-600","patriot-326-a","uk-mlr-2017-reg-18","uk-mlr-2017-reg-19","uk-mlr-2017-reg-28","aml-ctf-s82","uktmp-001","uktmp-002","uktmp-003","uktmp-004"]
  },
  {
    id: 'rule-9',
    name: 'Enhanced Due Diligence Monitoring',
    description: 'Implements UK MLR 2017 Regulation 33 and EU AMLD5 Article 18a enhanced due diligence requirements. Applies enhanced monitoring for high-risk customers including PEPs, high-risk third countries, and other elevated ML/TF risk situations. Transaction thresholds set 50% lower than standard customers with enhanced scrutiny protocols.',
    regulatoryBasis: 'UK MLR 2017 Regulation 33 Enhanced Due Diligence, EU AMLD5 Article 18a High-Risk Third Countries',
    category: 'Risk-Based Monitoring',
    implementedRequirements: [
      {
        requirementId: 'uk-mlr-2017-reg-33',
        description: 'Enhanced due diligence for high-risk business relationships'
      },
      {
        requirementId: 'eu-amld5-art18a',
        description: 'Enhanced monitoring for high-risk third country transactions'
      }
    ],
    status: 'active',
    lastUpdated: '2024-01-25',
    metadata: {
      jurisdiction: ['UK', 'EU'],
      productType: ['wealth-management', 'private-banking'],
      customerType: ['individual', 'corporate'],
      riskLevel: 'critical'
    },
    performance: {
      alertsPerMonth: 78,
      truePositiveRate: 0.35,
      alertsInvestigated: 78,
      coverage: 5,
      lastBacktest: '2024-01-25',
      backtestScore: 4
    },
    linkedClauses: ["bsa-1020-220","bsa-1020-250","bsa-1020-400","bsa-1020-410","patriot-326-a","patriot-326-b","uk-mlr-2017-reg-19","uk-mlr-2017-reg-27","uk-mlr-2017-reg-28","uk-mlr-2017-reg-29","uk-mlr-2017-reg-30","uk-mlr-2017-reg-33","uk-mlr-2017-reg-35","uk-mlr-2017-reg-37","uk-mlr-2017-reg-39","eu-amld5-art18a","pcmla-s6-1","aml-ctf-s43","cdsa-s48f","narcotics-s4","amla-art6","uae-aml-art16","uktmp-001","uktmp-003","uktmp-005","uktmp-006"]
  },
  {
    id: 'rule-10',
    name: 'UK High-Risk Relationship Monitoring',
    description: 'Implements UK MLR 2017 Regulation 19 policies, controls and procedures for managing PEP and high-risk relationship monitoring. Maintains continuous screening against PEP databases, monitors for source of wealth consistency, and applies enhanced transaction monitoring proportionate to ML/TF risks identified.',
    regulatoryBasis: 'UK MLR 2017 Regulation 19 Policies, Controls and Procedures',
    category: 'PEP and High-Risk Monitoring',
    implementedRequirements: [
      {
        requirementId: 'uk-mlr-2017-reg-19',
        description: 'Risk-based policies and controls for high-risk relationship monitoring'
      }
    ],
    status: 'active',
    performance: {
      alertsPerMonth: 34,
      truePositiveRate: 0.42,
      alertsInvestigated: 34,
      coverage: 4,
      lastBacktest: '2024-01-15',
      backtestScore: 5
    },
    linkedClauses: ["bsa-1020-250","patriot-326-b","uk-mlr-2017-reg-19","uk-mlr-2017-reg-20","uk-mlr-2017-reg-33","aml-ctf-s43","amla-art6","uktmp-002","uktmp-004","uktmp-005","uktmp-006"]
  },
  {
    id: 'rule-12',
    name: 'EU Cross-Border Transaction Analysis',
    description: 'Implements EU AMLD5 Article 13 ongoing customer due diligence and Article 18a enhanced measures for high-risk third countries. Monitors cross-border transactions for consistency with customer knowledge and business profile, with enhanced scrutiny for transactions involving countries identified by the European Commission as high-risk.',
    regulatoryBasis: 'EU AMLD5 Article 13 Ongoing CDD, EU AMLD5 Article 18a High-Risk Third Countries',
    category: 'Geographic Risk Monitoring',
    implementedRequirements: [
      {
        requirementId: 'eu-amld5-art13',
        description: 'Ongoing monitoring and transaction scrutiny for business relationship consistency'
      },
      {
        requirementId: 'eu-amld5-art18a',
        description: 'Enhanced due diligence for high-risk third country transactions'
      }
    ],
    status: 'active',
    performance: {
      alertsPerMonth: 189,
      truePositiveRate: 0.24,
      alertsInvestigated: 189,
      coverage: 5,
      lastBacktest: '2024-01-22',
      backtestScore: 4
    },
    linkedClauses: ["finra-tm-001","eu-amld5-art13","eu-amld5-art18a","uktmp-003"]
  },
  {
    id: 'rule-13',
    name: 'Cryptocurrency Transaction Blocking',
    category: 'Internal Policy Enforcement',
    description: 'Implements Internal Transaction Monitoring Policy TMP-001 cryptocurrency prohibition. Real-time screening of wire transfer messages against cryptocurrency-related keywords, blocking of transactions to known cryptocurrency exchanges, and automated alerts for potential cryptocurrency conversion activities.',
    regulatoryBasis: 'Internal Transaction Monitoring Policy TMP-001',
    lastUpdated: '2024-01-20',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
      customerType: ['individual', 'business', 'corporate'],
      riskLevel: 'critical'
    },
    performance: {
      alertsPerMonth: 342,
      truePositiveRate: 0.89,
      alertsInvestigated: 304,
      coverage: 5,
      avgResolutionDays: 2,
      lastBacktest: '2024-01-20',
      backtestScore: 5
    },
    evidence: {
      lastAdded: '2024-01-22',
      types: ['keyword-screening', 'blockchain-analysis']
    },
    implementedRequirements: [
      {
        requirementId: 'tmp-001',
        description: 'Real-time blocking of cryptocurrency exchange transactions'
      }
    ],
    linkedClauses: ['tmp-001']
  },
  {
    id: 'rule-14',
    name: 'Cash-Intensive Business Monitoring',
    category: 'Internal Policy Enforcement',
    description: 'Implements Internal Transaction Monitoring Policy TMP-002 cash-intensive business restrictions. Enhanced monitoring of grandfathered accounts with daily cash transaction alerts, cash-to-deposit ratio analysis, and automated screening against state cannabis licensing databases.',
    regulatoryBasis: 'Internal Transaction Monitoring Policy TMP-002',
    lastUpdated: '2024-01-18',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking', 'commercial-banking'],
      customerType: ['business', 'corporate'],
      riskLevel: 'high'
    },
    performance: {
      alertsPerMonth: 128,
      truePositiveRate: 0.67,
      alertsInvestigated: 86,
      coverage: 4,
      avgResolutionDays: 8,
      lastBacktest: '2024-01-18',
      backtestScore: 4
    },
    evidence: {
      lastAdded: '2024-01-20',
      types: ['cash-ratio-analysis', 'business-verification']
    },
    implementedRequirements: [
      {
        requirementId: 'tmp-002',
        description: 'Enhanced monitoring for grandfathered cash-intensive business accounts'
      }
    ],
    linkedClauses: ['tmp-002']
  },
  {
    id: 'rule-15',
    name: 'Geographic Risk Transaction Screening',
    category: 'Internal Policy Enforcement',
    description: 'Implements Internal Transaction Monitoring Policy TMP-003 high-risk geography restrictions. Automated blocking of transactions to prohibited jurisdictions, enhanced screening for medium-risk countries above $5,000, and compliance officer approval requirements for large international transfers.',
    regulatoryBasis: 'Internal Transaction Monitoring Policy TMP-003',
    lastUpdated: '2024-01-25',
    metadata: {
      jurisdiction: ['US'],
      productType: ['retail-banking', 'commercial-banking', 'wealth-management'],
      customerType: ['individual', 'business', 'corporate'],
      riskLevel: 'critical'
    },
    performance: {
      alertsPerMonth: 89,
      truePositiveRate: 0.94,
      alertsInvestigated: 84,
      coverage: 5,
      avgResolutionDays: 1,
      lastBacktest: '2024-01-25',
      backtestScore: 5
    },
    evidence: {
      lastAdded: '2024-01-26',
      types: ['geographic-screening', 'sanctions-compliance']
    },
    implementedRequirements: [
      {
        requirementId: 'tmp-003',
        description: 'Geographic risk-based transaction limits and blocking'
      }
    ],
    linkedClauses: ['tmp-003']
  },
  {
    id: 'rule-16',
    name: 'Third-Party Payment Processor Analytics',
    category: 'Internal Policy Enforcement',
    description: 'Implements Internal Transaction Monitoring Policy TMP-005 third-party payment processor monitoring. Automated calculation of transaction-to-deposit ratios, detection of unusual clearing patterns, off-cycle settlement monitoring, and dormant account reactivation alerts.',
    regulatoryBasis: 'Internal Transaction Monitoring Policy TMP-005',
    lastUpdated: '2024-01-22',
    metadata: {
      jurisdiction: ['US'],
      productType: ['commercial-banking'],
      customerType: ['business', 'corporate'],
      riskLevel: 'medium'
    },
    performance: {
      alertsPerMonth: 156,
      truePositiveRate: 0.43,
      alertsInvestigated: 67,
      coverage: 4,
      avgResolutionDays: 12,
      lastBacktest: '2024-01-22',
      backtestScore: 3
    },
    evidence: {
      lastAdded: '2024-01-24',
      types: ['settlement-analysis', 'merchant-verification']
    },
    implementedRequirements: [
      {
        requirementId: 'tmp-005',
        description: 'Third-party payment processor transaction ratio and pattern monitoring'
      }
    ],
    linkedClauses: ['tmp-005']
  }
];

// System Alerts
export const alerts = [
  {
    id: 'alert-2',
    type: 'coverage-gap',
    priority: 'medium',
    title: 'High-Value Transfer Monitoring Gap Identified',
    description: 'No active rules configured for monitoring high-value transfers above $100K across different business days',
    relatedClause: 'bsa-1020-320-b',
    relatedRule: null,
    createdAt: '2024-01-27T14:15:00Z',
    status: 'active',
    impact: 'Potential gap in detecting structured high-value transactions',
    recommendation: 'Implement cross-day aggregation rules for large transfers'
  },
  {
    id: 'alert-3',
    type: 'ai-insight',
    priority: 'medium',
    title: 'Cross-Border Wire False Positive Rate Increasing',
    description: 'ML analysis detected 15% increase in false positives for international wire transfers over past 30 days',
    relatedClause: 'bsa-1020-320-a-1',
    relatedRule: 'rule-3',
    createdAt: '2024-01-26T09:45:00Z',
    status: 'investigating',
    impact: 'Analyst efficiency impact, potential alert fatigue',
    recommendation: 'Review wire transfer rule thresholds and geographic risk scoring'
  },
  {
    id: 'alert-5',
    type: 'policy-compliance',
    priority: 'medium',
    title: 'Customer Risk Profile Update Overdue',
    description: 'Quarterly risk profile updates are overdue for 847 high-risk commercial customers, affecting monitoring sensitivity',
    relatedClause: 'tmp-003',
    relatedRule: 'rule-1',
    createdAt: '2024-02-01T11:15:00Z',
    status: 'active',
    impact: 'Reduced monitoring effectiveness for high-risk customer segments',
    recommendation: 'Prioritize risk profile refresh for commercial banking customers above $5M assets'
  },
  {
    id: 'alert-6',
    type: 'regulatory-compliance',
    priority: 'high',
    title: 'UK MLR 2017 Enhanced Due Diligence Coverage Gap',
    description: 'Enhanced due diligence monitoring coverage for UK high-risk customers has dropped to 89%, below the 95% target required by MLR 2017',
    relatedClause: 'uk-mlr-2017-reg-19',
    relatedRule: 'rule-9',
    createdAt: '2024-01-29T08:20:00Z',
    status: 'active',
    impact: 'Potential regulatory compliance risk for UK FCA supervision',
    recommendation: 'Review customer risk classification and enhance automated screening for UK high-risk segments'
  },
  {
    id: 'alert-7',
    type: 'performance-degradation',
    priority: 'medium', 
    title: 'EU Cross-Border Transaction False Positives Rising',
    description: 'EU cross-border transaction monitoring showing 24% increase in false positives over past 45 days, impacting analyst efficiency',
    relatedClause: 'eu-amld5-art13',
    relatedRule: 'rule-12',
    createdAt: '2024-01-27T16:45:00Z',
    status: 'investigating',
    impact: 'Analyst capacity strain and potential delay in genuine suspicious activity detection',
    recommendation: 'Calibrate EU geographic risk scoring parameters and review third-country classifications'
  },
  {
    id: 'alert-8',
    type: 'coverage-gap',
    priority: 'high',
    title: 'AMLD5 High-Risk Third Country Monitoring Incomplete',
    description: 'Monitoring coverage for transactions with EU-designated high-risk third countries only covers 73% of applicable customer base',
    relatedClause: 'eu-amld5-art18a',
    relatedRule: 'rule-12',
    createdAt: '2024-01-30T12:30:00Z',
    status: 'active',
    impact: 'Non-compliance risk with AMLD5 enhanced due diligence requirements',
    recommendation: 'Expand customer segmentation to include all EU high-risk third country exposure'
  }
];

// Analyst Capacity Data
export const analystCapacity = {
  currentStaff: 8,
  currentCapacity: {
    alertsPerDay: 45,
    avgResolutionHours: 4.2,
    investigationThreshold: 50000, // $50k minimum investigation threshold
    monthlyAlertVolume: 4942,
    utilizationRate: 87
  },
  scenarios: {
    '-2': {
      staffCount: 6,
      alertsPerDay: 33,
      investigationThreshold: 100000, // Higher threshold due to reduced capacity
      utilizationRate: 95,
      additionalInvestigationsPerMonth: -94,
      description: 'Reduced capacity scenario'
    },
    '-1': {
      staffCount: 7,
      alertsPerDay: 39,
      investigationThreshold: 75000, // Higher threshold due to reduced capacity
      utilizationRate: 92,
      additionalInvestigationsPerMonth: -47,
      description: 'Slightly reduced capacity'
    },
    '+1': {
      staffCount: 9,
      alertsPerDay: 51,
      investigationThreshold: 10000, // Could investigate $10k+ transactions
      utilizationRate: 78,
      additionalInvestigationsPerMonth: 47,
      description: 'Additional analyst scenario'
    },
    '+2': {
      staffCount: 10,
      alertsPerDay: 57,
      investigationThreshold: 5000, // Even lower threshold with more capacity
      utilizationRate: 71,
      additionalInvestigationsPerMonth: 94,
      description: 'Expanded team scenario'
    }
  },
  performanceMetrics: {
    avgAlertsPerAnalyst: 618,
    avgInvestigationsPerAnalyst: 149,
    qualityScore: 4,
    timelyClosureRate: 5
  }
};

// Compliance Statistics and Metrics (non-score aggregations preserved)
export const complianceMetrics = {
  lastCalculated: '2024-02-01T08:00:00Z',
  statistics: {
    totalDocuments: 28,
    totalClauses: 139,
    totalRules: 12,
    activeAlerts: 8,
    evidenceItems: 29
  },
  coverage: {
    documentsCovered: 28,
    clausesCovered: 139,
    rulesCovered: 12
  }
};

export const getClauseById = (clauseId) => {
  return regulatoryDocuments
    .flatMap(doc => doc.clauses)
    .find(clause => clause.id === clauseId);
};

export const getRuleById = (ruleId) => {
  return rules.find(rule => rule.id === ruleId);
};


// Validate data on module load to catch issues early
try {
  validateDocumentData(regulatoryDocuments);
  validateAlerts(alerts);
  console.log('✅ Mock data validation passed');
} catch (error) {
  console.error('❌ Mock data validation failed:', error);
  throw error;
}