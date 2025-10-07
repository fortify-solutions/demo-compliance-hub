# Transaction-Level Monitoring Rules: Comprehensive Extraction from European & FATF Regulations


Based on analysis of all regulatory requirement descriptions in the AMLBoost Audit application, this document identifies specific transaction monitoring rules that must be implemented at the technical level to achieve compliance with European and FATF anti-money laundering regulations.


---


## EU Anti-Money Laundering Directive (AMLD5)


### AMLD5 Article 13 - Ongoing Customer Due Diligence and Monitoring

- Continuous scrutiny of all transactions throughout business relationship duration

- Transaction consistency checks against customer knowledge, business profile, and risk profile

- Risk-based monitoring frequency adjustments based on customer classification


### AMLD5 Article 18a - Enhanced Due Diligence for High-Risk Third Countries

- Enhanced ongoing monitoring for customers from EU Commission-identified high-risk countries

- Intensified transaction review for entities established in high-risk third countries

- Geographic risk factor integration into monitoring thresholds


### AMLD5 Article 33 - Reporting of Suspicious Transactions

- Real-time detection of suspicious transactions regardless of amount

- Prompt FIU notification for transactions suspected as criminal proceeds or terrorism financing

- Continuous monitoring post-STR filing without customer notification


---


## Germany – Anti-Money Laundering (GwG)


### Section 1: Ongoing Monitoring (Laufende Überwachung) - Section 10 GwG

- Continuous business relationship monitoring for all transactions

- Transaction consistency verification against:
  - Customer documentation
  - Beneficial owner information
  - Business type
  - Risk profile assessment

- Risk-proportionate monitoring frequency with trigger-based reviews on:
  - Circumstance changes
  - Red flag indicators

- Automated flagging of transactions inconsistent with known customer activity patterns


### Section 2: Risk-Based Approach and Periodic KYC Updates - Section 10 GwG; BaFin Guidance

**Enhanced Due Diligence Customers:**

- Information updates minimum every **1 year**

- Intensified monitoring with lower alert thresholds

- Senior management notification protocols


**General Due Diligence Customers:**

- Information updates every **5 years**

- Standard monitoring intensity


**Simplified Due Diligence:**

- Less frequent reviews for low-risk customers where permitted


**System Requirements:**

- Automated workflow triggers for periodic review scheduling

- Customer information age tracking systems


### Section 3: Suspicious Transaction Detection - Section 43 GwG

- Alert generation for transactions matching suspicious typologies

- Detection triggers:
  - Deviation from normal customer patterns
  - Transaction characteristics inconsistent with customer profile
  - Transactions matching known typologies
  - Unusual pattern identification

- FIU reporting without delay upon suspicion detection

- Written documentation maintenance of analysis supporting reports

- Continued monitoring post-FIU filing without customer notification


### Section 4: Cash and Cross-Border Transaction Monitoring - GwG; Future EU AMLR

**Cash Transaction Monitoring:**

- Europe-wide upper limit: **€10,000** for cash payments (effective July 10, 2027)

- Aggregation across transactions to detect structuring

- Alert generation for unusual cash patterns

- Round-number amount detection

- Systematic threshold avoidance identification


**Cross-Border Wire Transfer Monitoring:**

- Enhanced scrutiny for high-risk jurisdiction transactions

- Incomplete wire transfer information detection

- Unusual routing pattern identification

- Aggregated cross-border transfer threshold avoidance detection


### Section 5: System Testing, Validation, and Governance - BaFin Guidance; GwG

**Testing Requirements:**

- Periodic scenario testing requirements

- False positive rate analysis

- Known suspicious activity detection through back-testing

- Alert disposition outcome reviews


**Documentation Requirements:**

- Monitoring system configurations

- Rule and threshold calibration rationale

- Testing methodologies and results

- System performance metrics

- Staff training programs

- Senior management effectiveness reporting


---


## Italy – Anti-Money Laundering (D.Lgs. 231/2007)


### Section 1: Ongoing Monitoring - Article 35

- Continuous business relationship scrutiny throughout entire relationship duration

- Transaction consistency verification against:
  - Customer and beneficial owner knowledge
  - Customer business and activity profile
  - Risk profile
  - Source of funds (where necessary)

- Objective risk-based monitoring procedures considering:
  - **Customer type**
  - **Geographic area**
  - **Delivery channels**
  - **Products and services offered**

- Risk-appropriate monitoring frequency


### Section 2: Threshold-Based Monitoring - Article 12, 16; UIF Indicators

**Monitoring Thresholds:**

- **Occasional Transactions:** Monitor all transactions **≥€15,000**

- **Fund Transfers:** Monitor all non-SEPA transfers **≥€1,000**


**Detection Requirements:**

- Structuring and aggregation pattern detection

- UIF anomaly indicator implementation:
  - Cash-related anomalies
  - Geographic anomalies
  - Beneficial ownership anomalies
  - Third-party transaction anomalies
  - Structuring anomalies

- Transaction aggregation to detect threshold avoidance:
  - Alert trigger when approaching **€15,000** threshold
  - Alert trigger for **€1,000** non-SEPA transfer threshold

- Monitoring scenario updates as UIF publishes new typologies


### Section 3: Suspicious Transaction Reporting to UIF - Article 35, 41

- UIF-specific anomaly indicator adoption

- Objective money laundering/terrorist financing risk assessment

- Detection triggers:
  - Deviation from normal patterns
  - Characteristics inconsistent with customer profile
  - Transactions matching UIF anomaly typologies
  - Unusual patterns

- UIF reporting without delay

- Written analysis documentation supporting reports

- Continued customer relationship monitoring post-filing without disclosure


### Section 4: Enhanced Monitoring for PEPs - Article 25, 24

**Target Customers:**

- Italian and foreign politically exposed persons (PEPs)

- PEP family members

- Known close associates of PEPs

- Customers from high-risk third countries

- Customers with complex beneficial ownership structures


**Enhanced Monitoring Requirements:**

- Specialized monitoring profiles with lower thresholds

- More sensitive detection rules

- Automated senior management escalation

- Senior management approval for relationship establishment/continuation

- Intensified ongoing monitoring

- Source of wealth and funds scrutiny

- Enhanced monitoring for minimum **1 year** after PEP ceases prominent function


### Section 5: System Testing, Validation, and Record-Keeping - Article 36; Bank of Italy Provisions

**Record Retention:**

- **Minimum 10 years** from last transaction date for:
  - Transaction details
  - Customer identification information
  - Supporting documentation
  - Alert analysis and investigation records
  - Risk assessments


**Periodic Testing Requirements:**

- False positive rate analysis

- Known suspicious activity detection assessment

- Alert disposition outcome reviews

- Testing methodology documentation

- Result documentation

- Remediation action documentation

- Scenario updates based on testing outcomes and emerging typologies

- Formal governance framework requirements


---


## Spain – Anti-Money Laundering (Law 10/2010)


### Section 1: Ongoing Monitoring - Article 7; Royal Decree 304/2014

- Information collection on business relationship purpose and intended nature

- Ongoing transaction monitoring throughout entire relationship duration

- Transaction consistency scrutiny against:
  - Customer knowledge
  - Business and risk profile
  - Commercial activity
  - Source of funds (where necessary)

- Risk-sensitive monitoring with intensification triggers:
  - Customer circumstance changes
  - Red flag indicators

- Appropriate frequency for document, data, and information updates


### Section 2: Suspicious Transaction Reporting to SEPBLAC - Article 17, 18

- Special attention to any event/transaction regardless of size potentially related to ML/TF

- Written analysis result recording

- Structured special review (*examen especial*) of suspicious transactions

- SEPBLAC reporting triggers:
  - Transaction shows indication of ML/TF relation
  - Transaction shows certainty of ML/TF relation
  - Attempted transactions meeting criteria

- Reporting without delay (*sin demora*)

- Continued monitoring post-filing without customer disclosure


### Section 3: SEPBLAC Risk Indicators - Article 17; Article 27.1 RD 304/2014

**Indicator Implementation:**

- SEPBLAC-published risk indicator scenarios:
  - Customer behavior indicators
  - Transaction characteristic indicators
  - Geographic indicators
  - Product/service indicators

- Custom indicator list development based on institutional experience and risk assessment

- **Monthly systematic reporting** to SEPBLAC for Article 27.1 transactions (in addition to STRs)

- Monitoring scenario updates as SEPBLAC issues new/revised risk indicators


### Section 4: Enhanced Monitoring for PEPs - Article 11; RD 304/2014

**Target Customers:**

- Spanish and foreign PEPs

- PEP family members

- Known close associates

- Customers from Commission-identified high-risk countries


**Enhanced Requirements:**

- Lower transaction thresholds

- Increased monitoring sensitivity

- Senior management approval for relationships

- Intensified ongoing monitoring

- Source of wealth verification

- Automated senior management escalation


### Section 5: System Testing and Governance - Law 10/2010; RD 304/2014

**Testing Requirements:**

- Periodic false positive rate analysis

- Scenario detection capability testing

- Alert quality assessment


**Documentation Requirements:**

- Testing methodologies

- Results

- Remediation actions

- Governance frameworks

- Monitoring effectiveness reporting to senior management


---


## FATF 40 Recommendations


### Recommendation 10 - Ongoing Monitoring and Transaction Scrutiny

- Continuous due diligence throughout business relationship

- Transaction consistency verification against:
  - Institution's customer knowledge
  - Customer business profile
  - Customer risk profile
  - Source of funds (where necessary)

- Enhanced scrutiny for transactions not matching expected customer risk profile


### Recommendation 11 - Record-Keeping for Transaction Monitoring

**Retention Requirements:**

- **Minimum 5 years** for all transactions (domestic and international)


**Record Capabilities:**

- Individual transaction reconstruction

- Evidence provision for criminal proceedings

- Transaction tracing

- Investigation access


### Recommendation 16 - Wire Transfer Monitoring

**Data Collection:**

- Originator and beneficiary information collection and verification

- Complete SWIFT message information transmission

- Risk-based procedures for incomplete information transfers


**Monitoring Requirements:**

- Missing or incomplete beneficiary information (manual review flagging)

- Repetitive transfers just under **$3,000** (structuring detection)

- Beneficiary cross-referencing against sanctions and PEP lists

- Geographic patterns involving high-risk countries

- Correspondent banking relationship concentration risk


### Recommendation 20 - Suspicious Transaction Detection and Reporting

- All transaction monitoring to detect suspicious activity

- Prompt FIU reporting when suspecting:
  - Funds are criminal activity proceeds
  - Funds related to terrorist financing

- Unusual movement flagging

- Case management for timely scrutiny

- Reporting for all suspicious transactions regardless of amount


### Complex and Unusual Transactions - Recommendations 10, 11, 20

**Special Attention To:**

- Complex large transactions

- Unusual large transactions

- Unusual transaction patterns with no apparent economic or lawful purpose


**Requirements:**

- Transaction investigation requirement

- Findings documentation

- **5-year** availability to competent authorities and auditors


---


## FATF Correspondent Banking Guidance


### Ongoing Monitoring Requirement

- Mandatory ongoing monitoring throughout correspondent relationship life

- No exceptions for lower-risk relationships (intensity may vary)

- Risk profile change detection

- AML/CFT compliance measure verification


### Risk Profile Changes Monitoring

**Monitor For:**

- Transaction volume changes

- Transaction type changes

- Transaction pattern changes

- Geographic focus changes


**Detection Requirements:**

- Deviation detection from expected activity profiles

- Increased risk indicator identification


### Unusual Activity Detection

**Enhanced Monitoring Triggers:**

- Transactions inconsistent with respondent business model

- Unusual transaction sizes

- Unusual transaction frequencies

- Unusual geographic patterns

- Unusual counterparties

- Transactions with no apparent economic purpose


**System Requirements:**

- Real-time monitoring capabilities for higher-risk relationships


### Request for Information (RFI) Process

**Formal RFI Procedures:**

- Flagged transaction details documentation

- Clarification requests

- Response timeframes

- Response quality tracking

- Escalation for unresponsive/inadequate responses

- AML/CFT program quality assessment


### Nested Relationships and Payable-Through Accounts

**Enhanced Monitoring For:**

- Sub-account structures

- Indirect access arrangements

- Ultimate transaction party identification

- Shell bank indicators

- Structuring across sub-accounts


---


## FATF Methodology for Technical Compliance


### Criterion 10.7 - Ongoing Monitoring Assessment

- Legal requirement for ongoing due diligence and transaction scrutiny

- Consistency verification against:
  - Customer knowledge
  - Business profile
  - Risk profile (including source of funds)

- Risk-based application:
  - Enhanced measures for higher-risk situations
  - Simplified measures permitted for lower risks based on reasonable monetary thresholds


### Criterion 11.1 - Transaction Record Retention

**Retention Period:**

- **Minimum 5 years** for all transaction records


**Record Requirements:**

- Permit individual transaction reconstruction

- Provide prosecution evidence

- Allow transaction tracing

- Be accessible to competent authorities

- Coverage: Domestic and international transactions with preliminary business relationship analyses


### Criteria 16.1-16.8 - Wire Transfer Information

**Originator Requirements:**

- Originator and beneficiary information obtaining and maintenance

- Accuracy verification requirements


**Beneficiary Institution Responsibilities:**

- Missing information detection

- Risk-based procedures for incomplete transfers:
  - Execution decisions
  - Rejection decisions
  - Suspension decisions

- Repeated compliance failure monitoring

- Termination procedures for non-compliant counterparties


### Criteria 20.1-20.2 - Suspicious Transaction Reporting

**Legal Obligations:**

- Direct mandatory legal obligation for prompt FIU reporting

- Reporting triggers:
  - Suspicion funds are criminal activity proceeds
  - Reasonable grounds to suspect criminal activity proceeds
  - Suspicion of terrorist financing relation


**System Requirements:**

- Transaction monitoring systems requirement for suspicious transaction detection

- Reporting required for:
  - All suspicious transactions regardless of amount
  - Attempted transactions


### Immediate Outcome 4 - Effectiveness Assessment

**Demonstration Requirements:**

- Effective CDD application including ongoing monitoring

- Quality and accuracy of transaction monitoring systems (critical assessment factor)


**Assessment Focus Areas:**

- Risk-based monitoring intensity

- Unusual or suspicious transaction detection

- Timely risk change identification

- Overall preventive measure effectiveness in practice


---


## FATF Risk-Based Approach Guidance


### Risk-Based Transaction Monitoring

- ML/TF risk identification and understanding

- Transaction monitoring process adjustment according to customer risk profiles:
  - Enhanced monitoring for high-risk customers
  - Simplified measures for lower-risk customers (while still monitoring)

- Regular risk assessment review and updating

- Corresponding monitoring adjustments


### Continuous and Triggered Monitoring

**Continuous Monitoring:**

- Ongoing activity surveillance


**Event-Triggered Monitoring:**

- Specific transaction-triggered surveillance


**Analysis Requirements:**

- Customer activity comparison against peer groups

- Deviation detection from:
  - Expected behavior
  - Peer group norms

- Profile inconsistency detection


### Automated Transaction Monitoring Systems

**System Requirements:**

- High-volume transaction environment requirement

- System understanding requirements:
  - Operating rules comprehension
  - Regular system integrity verification
  - Validation that systems address identified ML/TF risks
  - Detection capability testing
  - Documentation of all system rules and parameters


### Technology and Innovation in Monitoring

**Modern Technology Leverage:**

- Manual input reduction systems

- False positive reduction systems

- Complex case identification

- Risk management facilitation


**Advanced Technologies:**

- AI implementation

- Machine learning for large volume analysis

- Real-time monitoring capabilities

- Advanced analytics for sophisticated scheme detection


### Periodic Review and Testing

**Testing Requirements:**

- Regular risk assessment and testing requirements

- Periodic monitoring effectiveness reviews

- Testing against known scenarios

- Detection capability validation

- False positive and negative rate assessment

- Monitoring rule updates based on emerging risks

- Independent testing with documented results

- Remediation action documentation


---


## Summary Statistics


### Specific Numeric Thresholds Identified

- **€10,000** - EU cash payment upper limit (Germany, effective 2027)

- **€15,000** - Italy occasional transaction monitoring threshold

- **€1,000** - Italy non-SEPA fund transfer threshold

- **$3,000** - FATF wire transfer recordkeeping threshold

- **5 years** - FATF minimum record retention period

- **10 years** - Italy minimum record retention period

- **1 year** - Germany EDD customer information update frequency; Italy/Spain minimum PEP monitoring post-role cessation

- **5 years** - Germany general DD customer information update frequency


### Processing Requirements

- **Real-time transaction processing** (multiple regulations)

- **Continuous monitoring** (ongoing throughout relationship)

- **Event-triggered monitoring** (circumstance changes, red flags)

- **Batch processing** for aggregation analysis (24-hour periods, rolling windows)

- **Monthly systematic reporting** (Spain SEPBLAC)


### Customer Segmentation Criteria

- Enhanced Due Diligence (EDD) customers

- General Due Diligence customers

- Simplified Due Diligence customers (where permitted)

- Politically Exposed Persons (PEPs) and related parties

- High-risk third country customers

- Complex beneficial ownership structure customers


### Key Pattern Detection Requirements

- **Structuring detection** (below reporting thresholds)

- **Velocity changes** (transaction frequency increases)

- **Round-number amount detection**

- **Geographic risk pattern detection**

- **Peer group comparison deviations**

- **Unusual routing patterns**

- **Incomplete information detection**

- **Nested relationship indicators**


---


## Implementation Considerations


### Rule Parameterization by Customer Segment

Based on Italy Article 35 requirement for objective procedures considering:

1. **Customer Type**: Individual / Business / Corporate
   - Different thresholds for each segment
   - Different velocity baselines
   - Different peer group comparisons

2. **Geographic Area**: Domestic / EU / High-Risk Third Countries
   - Enhanced scrutiny for high-risk jurisdictions
   - Lower thresholds for transactions involving high-risk countries
   - Real-time blocking capabilities for prohibited jurisdictions

3. **Delivery Channels**: Branch / Online / Mobile / ATM
   - Channel-specific pattern analysis
   - Cross-channel aggregation
   - Channel-switching detection

4. **Products and Services**: Retail Banking / Commercial Banking / Wealth Management / Wire Transfers
   - Product-specific monitoring rules
   - Service-specific thresholds
   - Product combination risk analysis


### Risk-Based Threshold Adjustments

**High-Risk Customers** (PEPs, high-risk countries, complex structures):

- 50-75% reduction in alert thresholds

- Real-time processing rather than batch

- Senior management auto-escalation

- Enhanced documentation requirements


**Standard Risk Customers**:

- Standard regulatory thresholds

- Batch processing acceptable

- Standard review procedures


**Low-Risk Customers** (where simplified DD permitted):

- Higher thresholds acceptable

- Less frequent monitoring

- Streamlined review processes


### Technical Architecture Requirements

**Real-Time Processing Needs**:

- Cash transactions for structuring detection

- Wire transfers to high-risk jurisdictions

- PEP transaction monitoring

- Large transaction alerts


**Batch Processing Acceptable**:

- Daily aggregation for CTR-level monitoring

- Periodic behavioral analysis

- Monthly pattern detection

- Peer group comparison analytics


**Data Requirements**:

- Customer risk classification data

- Geographic risk ratings

- Product/service metadata

- Channel information

- Beneficial ownership data

- PEP status flags

- Historical transaction baselines


**Integration Points**:

- Core banking systems (transaction feeds)

- Customer information files

- Sanctions screening systems

- Case management platforms

- Regulatory reporting systems

- Senior management dashboards


---


**Source**: `/Users/tom/Documents/AML/demo-aml-compliance-hub/src/services/mockData.js`

**Analysis Date**: January 2025

**Scope**: European (EU, Germany, Italy, Spain) and FATF regulatory requirements for transaction monitoring


This document provides comprehensive technical specifications for implementing transaction-level monitoring rules to achieve compliance with European and international anti-money laundering regulations. Each rule specification includes explicit thresholds, time windows, customer segmentation criteria, and processing requirements needed for system implementation.
