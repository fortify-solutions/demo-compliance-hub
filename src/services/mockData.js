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
          { id: 'ev1', type: 'program-documentation', description: 'AML Program Written Policy and Procedures', quality: 'excellent' },
          { id: 'ev2', type: 'independent-testing', description: '2023 Independent AML Program Testing Report', quality: 'good' },
          { id: 'ev3', type: 'training-records', description: 'Annual AML Training Completion Records', quality: 'excellent' }
        ],
        linkedRules: ['rule-1']
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
          { id: 'ev4', type: 'cip-procedures', description: 'Customer Identification Program Procedures', quality: 'excellent' },
          { id: 'ev5', type: 'identity-verification', description: 'Identity Verification System Testing', quality: 'good' },
          { id: 'ev6', type: 'sanctions-screening', description: 'Government List Screening Results', quality: 'excellent' }
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
          { id: 'ev7', type: 'sar-filing', description: 'SAR Filing Statistics and Quality Review', quality: 'good' },
          { id: 'ev8', type: 'investigation-procedures', description: 'Suspicious Activity Investigation Procedures', quality: 'excellent' },
          { id: 'ev9', type: 'regulatory-feedback', description: 'FinCEN SAR Filing Feedback Reports', quality: 'good' }
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
          { id: 'ev10', type: 'filing-timeliness', description: 'SAR Filing Timeline Compliance Metrics', quality: 'excellent' },
          { id: 'ev11', type: 'record-retention', description: 'SAR Supporting Documentation Audit', quality: 'good' },
          { id: 'ev12', type: 'regulatory-access', description: 'Regulator Information Request Response Times', quality: 'excellent' }
        ],
        linkedRules: ['rule-5']
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
          { id: 'ev13', type: 'confidentiality-training', description: 'SAR Confidentiality Training Documentation', quality: 'good' },
          { id: 'ev14', type: 'access-controls', description: 'SAR System Access Control Reviews', quality: 'excellent' },
          { id: 'ev15', type: 'policy-procedures', description: 'SAR Confidentiality Policy and Procedures', quality: 'good' }
        ],
        linkedRules: ['rule-5']
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
          { id: 'ev16', type: 'ctr-filing', description: 'Currency Transaction Report Filing Statistics', quality: 'excellent' },
          { id: 'ev17', type: 'aggregation-logic', description: 'Multiple Transaction Aggregation Testing', quality: 'good' },
          { id: 'ev18', type: 'exemption-procedures', description: 'CTR Exemption Process Documentation', quality: 'excellent' }
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
          { id: 'ev19', type: 'correspondent-dd', description: 'Correspondent Account Due Diligence Procedures', quality: 'excellent' },
          { id: 'ev20', type: 'risk-assessment', description: 'Foreign Institution Risk Assessment Framework', quality: 'good' },
          { id: 'ev21', type: 'enhanced-procedures', description: 'High-Risk Jurisdiction Enhanced Due Diligence', quality: 'good' }
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
          { id: 'ev22', type: 'private-banking-dd', description: 'Private Banking Enhanced Due Diligence Procedures', quality: 'excellent' },
          { id: 'ev23', type: 'beneficial-ownership', description: 'Beneficial Owner Identification Documentation', quality: 'good' },
          { id: 'ev24', type: 'source-of-funds', description: 'Source of Funds Verification Procedures', quality: 'excellent' }
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
          { id: 'ev25', type: 'wire-records', description: 'Wire Transfer Record Retention Compliance', quality: 'excellent' },
          { id: 'ev26', type: 'incomplete-wires', description: 'Incomplete Wire Transfer Monitoring Procedures', quality: 'good' },
          { id: 'ev27', type: 'beneficiary-screening', description: 'Wire Transfer Beneficiary Screening Results', quality: 'good' }
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
          { id: 'ev28', type: 'cdd-procedures', description: 'Customer Due Diligence Written Procedures', quality: 'excellent' },
          { id: 'ev29', type: 'ongoing-monitoring', description: 'Ongoing Customer Monitoring System Performance', quality: 'good' },
          { id: 'ev30', type: 'risk-based-approach', description: 'Risk-Based CDD Implementation Review', quality: 'excellent' }
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
          { id: 'ev31', type: 'bo-procedures', description: 'Beneficial Owner Identification Procedures', quality: 'excellent' },
          { id: 'ev32', type: 'verification-testing', description: 'Beneficial Owner Verification Testing Results', quality: 'good' },
          { id: 'ev33', type: 'control-person', description: 'Control Person Identification Documentation', quality: 'good' }
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
          { id: 'ev34', type: 'section311-compliance', description: 'Section 311 Special Measures Compliance Procedures', quality: 'excellent' },
          { id: 'ev35', type: 'prohibited-transactions', description: 'Prohibited Transaction Blocking System Testing', quality: 'good' },
          { id: 'ev36', type: 'regulatory-updates', description: 'FinCEN Special Measures Update Tracking', quality: 'excellent' }
        ],
        linkedRules: ['rule-6', 'rule-7']
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
          { id: 'ev37', type: 'gto-compliance', description: 'Geographic Targeting Order Compliance Procedures', quality: 'good' },
          { id: 'ev38', type: 'geographic-monitoring', description: 'Geographic Risk Monitoring System Performance', quality: 'excellent' },
          { id: 'ev39', type: 'additional-reporting', description: 'GTO Additional Reporting Requirements Implementation', quality: 'good' }
        ],
        linkedRules: ['rule-6', 'rule-7', 'rule-8']
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
          { id: 'ev40', type: 'training-programs', description: 'AML Training Program Content and Delivery Records', quality: 'excellent' },
          { id: 'ev41', type: 'completion-tracking', description: 'Employee Training Completion Tracking System', quality: 'good' },
          { id: 'ev42', type: 'effectiveness-testing', description: 'Training Effectiveness Assessment Results', quality: 'good' }
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
          { id: 'ev43', type: 'independent-testing', description: 'Annual Independent AML Program Testing Report', quality: 'excellent' },
          { id: 'ev44', type: 'testing-scope', description: 'Independent Testing Scope and Risk Assessment', quality: 'good' },
          { id: 'ev45', type: 'remediation-tracking', description: 'Testing Finding Remediation Tracking', quality: 'excellent' }
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
          { id: 'ev46', type: 'officer-designation', description: 'AML Compliance Officer Designation Documentation', quality: 'excellent' },
          { id: 'ev47', type: 'authority-independence', description: 'Compliance Officer Authority and Independence Assessment', quality: 'good' },
          { id: 'ev48', type: 'resource-adequacy', description: 'AML Program Resource Adequacy Review', quality: 'good' }
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
          { id: 'ev49', type: 'record-retention', description: 'BSA Record Retention Policy and Procedures', quality: 'excellent' },
          { id: 'ev50', type: 'access-procedures', description: 'Regulator Record Access Procedures and Testing', quality: 'good' },
          { id: 'ev51', type: 'retention-schedule', description: 'BSA Record Retention Schedule Compliance Review', quality: 'excellent' }
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
          { id: 'ev52', type: 'internal-controls', description: 'AML Internal Controls Framework Documentation', quality: 'excellent' },
          { id: 'ev53', type: 'segregation-duties', description: 'AML Function Segregation of Duties Review', quality: 'good' },
          { id: 'ev54', type: 'management-oversight', description: 'AML Management Oversight and Reporting Structure', quality: 'excellent' }
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
          { id: 'ev12', type: 'system-performance', description: 'Transaction Monitoring System Metrics', quality: 'good' },
          { id: 'ev13', type: 'alert-analysis', description: 'Alert Quality Assessment Reports', quality: 'excellent' }
        ],
        linkedRules: ['rule-12']
      }
    ]
  },
  {
    id: 'internal-tmp',
    title: 'Internal Transaction Monitoring Policy',
    type: 'internal',
    jurisdiction: 'US',
    lastUpdated: '2024-02-15',
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
          { id: 'ev14', type: 'rule-performance', description: 'Crypto Exchange Block Rule Performance', quality: 'excellent' },
          { id: 'ev15', type: 'audit-report', description: 'Q4 2023 Crypto Transaction Review', quality: 'good' }
        ],
        linkedRules: ['rule-13']
      },
      {
        id: 'tmp-002',
        title: 'Cash Intensive Business Restrictions',
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
          { id: 'ev16', type: 'workflow-metrics', description: 'Cash Business Account Closure Tracking', quality: 'excellent' },
          { id: 'ev17', type: 'training-records', description: 'Enhanced Due Diligence Training Completion', quality: 'good' }
        ],
        linkedRules: ['rule-14']
      },
      {
        id: 'tmp-003',
        title: 'High-Risk Geography Transaction Limits',
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
          { id: 'ev18', type: 'system-validation', description: 'Geographic Risk Filter Testing', quality: 'excellent' },
          { id: 'ev19', type: 'compliance-review', description: 'OFAC Compliance Validation Report', quality: 'excellent' }
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
          { id: 'ev22', type: 'data-analytics', description: 'Merchant Settlement Pattern Analysis', quality: 'good' },
          { id: 'ev23', type: 'system-monitoring', description: 'Real-time Transaction Ratio Tracking', quality: 'excellent' }
        ],
        linkedRules: ['rule-16']
      }
    ]
  },
  {
    id: 'uk-money-laundering-regs',
    title: 'UK Money Laundering Regulations 2017',
    type: 'regulatory',
    jurisdiction: 'UK',
    lastUpdated: '2023-10-15',
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
        linkedRules: ['rule-5']
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
        linkedRules: ['rule-5']
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
        linkedRules: ['rule-6', 'rule-7', 'rule-10']
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
        linkedRules: ['rule-1', 'rule-6', 'rule-12']
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
        linkedRules: ['rule-5']
      }
    ]
  },
  {
    id: 'canada-pcmla',
    title: 'Proceeds of Crime (Money Laundering) and Terrorist Financing Act',
    type: 'regulatory',
    jurisdiction: 'CA',
    lastUpdated: '2024-03-26',
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
        linkedRules: ['rule-5']
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
        linkedRules: ['rule-5']
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
        linkedRules: ['rule-5']
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
        linkedRules: ['rule-2', 'rule-6', 'rule-7']
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
        linkedRules: ['rule-5']
      }
    ]
  },
  {
    id: 'japan-narcotics-control',
    title: 'Act on Prevention of Transfer of Criminal Proceeds',
    type: 'regulatory',
    jurisdiction: 'JP',
    lastUpdated: '2023-12-10',
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
        linkedRules: ['rule-5']
      }
    ]
  },
  {
    id: 'switzerland-amla',
    title: 'Anti-Money Laundering Act (AMLA)',
    type: 'regulatory',
    jurisdiction: 'CH',
    lastUpdated: '2024-01-01',
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
        linkedRules: ['rule-5']
      }
    ]
  },
  {
    id: 'uae-aml-law',
    title: 'UAE Federal Decree-Law No. 20 of 2018 on Anti-Money Laundering',
    type: 'regulatory',
    jurisdiction: 'AE',
    lastUpdated: '2024-02-01',
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
        linkedRules: ['rule-5']
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
    linkedClauses: ['bsa-1020-320-a-1', 'bsa-1020-320-b']
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
    linkedClauses: ['bsa-1020-320-a-1']
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
    linkedClauses: ['bsa-1020-320-a-1']
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
    linkedClauses: ['uk-mlr-2017-reg-28', 'uk-mlr-2017-reg-19']
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
    linkedClauses: ['uk-mlr-2017-reg-19', 'eu-amld5-art18a']
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
    linkedClauses: ['uk-mlr-2017-reg-19']
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
    linkedClauses: ['eu-amld5-art13', 'eu-amld5-art18a']
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
    utilizationRate: 4
  },
  scenarios: {
    '-2': {
      staffCount: 6,
      alertsPerDay: 33,
      investigationThreshold: 100000, // Higher threshold due to reduced capacity
      utilizationRate: 5,
      additionalInvestigationsPerMonth: -94,
      description: 'Reduced capacity scenario'
    },
    '-1': {
      staffCount: 7,
      alertsPerDay: 39,
      investigationThreshold: 75000, // Higher threshold due to reduced capacity
      utilizationRate: 5,
      additionalInvestigationsPerMonth: -47,
      description: 'Slightly reduced capacity'
    },
    '+1': {
      staffCount: 9,
      alertsPerDay: 51,
      investigationThreshold: 10000, // Could investigate $10k+ transactions
      utilizationRate: 3,
      additionalInvestigationsPerMonth: 47,
      description: 'Additional analyst scenario'
    },
    '+2': {
      staffCount: 10,
      alertsPerDay: 57,
      investigationThreshold: 5000, // Even lower threshold with more capacity
      utilizationRate: 3,
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
    totalDocuments: 7,
    totalClauses: 11,
    totalRules: 12,
    activeAlerts: 8,
    evidenceItems: 29
  },
  coverage: {
    documentsCovered: 7,
    clausesCovered: 11,
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