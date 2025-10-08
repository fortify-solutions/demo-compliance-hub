# CLAUDE.md - AMLBoost Audit Project

## Project Overview

AMLBoost Audit is an advanced React application demonstrating a comprehensive AML (Anti-Money Laundering) transaction monitoring compliance system for financial institutions. The system focuses specifically on **transaction monitoring capabilities** rather than case management or sanctions screening, providing a dedicated interface for monitoring rule performance, alert investigation workflows, and regulatory compliance tracking.

**Live Application:** https://fortify-solutions.github.io/demo-aml-compliance-hub/
**Repository:** https://github.com/fortify-solutions/amlboost-audit (Internal)

The application was designed and built through collaborative sessions between a human product owner and Claude, with a focus on creating a Risk Manager-centric interface for ongoing compliance monitoring and audit readiness.

## Key Design Decisions

### User Persona & Use Case
- **Primary User**: Risk Manager (single role design)
- **Primary Use Case**: Ongoing compliance monitoring with "always audit-ready" approach
- **Secondary Output**: Generate artifacts for internal analysis and external audit packages
- **Language**: Business-focused terminology, no technical SQL/code exposure

### Architecture Philosophy
- **Alert-Driven Workflow**: AI-powered background monitoring triggers actionable insights
- **Requirement-Level Granularity**: All compliance tracking happens at the regulatory requirement level
- **Metadata-Driven Associations**: Rules linked to requirements through shared taxonomy (jurisdiction, product type, customer type, risk level)
- **Dual Artifact Strategy**: Internal operational reports vs. formal audit packages
- **Performance-Focused Analytics**: System emphasizes operational metrics (alert volumes, true positive rates, coverage percentages) over subjective scoring

### Technical Stack Choices
- **React 19.1.1 + Vite 7.1.2**: Modern development experience with fast HMR
- **Tailwind CSS v3.4.4**: Utility-first styling (downgraded from v4 for compatibility)
- **Lucide React**: Consistent, professional iconography
- **Mock Data Services**: Comprehensive regulatory framework simulation
- **GitHub Pages**: Hosted deployment with automated build process
- **Component Architecture**: Modular, reusable components following established patterns

## Project Structure

```
src/
├── components/
│   ├── Header.jsx                      # Clean navigation and filters with full accessibility
│   ├── DocumentTree.jsx                # Regulatory document hierarchy with internal/regulatory separation
│   ├── ClauseContent.jsx               # Master/detail requirement views with taxonomy pills and simplified rule display
│   ├── ComplianceInsights.jsx          # Success measures and risk calibration insights panel
│   ├── RiskCalibrationOverview.jsx     # Editable risk calibration parameters management
│   ├── RiskCalibrationTableBody.jsx    # Modular table component for risk calibration display
│   ├── CapacityModal.jsx               # Analyst capacity planning interface
│   ├── ExportConfigModal.jsx           # Export package configuration interface
│   └── ErrorBoundary.jsx               # Application-wide error handling
├── hooks/
│   ├── useDebounce.js           # Performance optimization for search
│   └── useAppState.js           # Centralized state management hooks
├── services/
│   ├── mockData.js              # Core mock data with validation
│   └── data/                    # Modular data services
│       ├── documentService.js         # Document and requirement management
│       ├── alertService.js            # Alert lifecycle and filtering
│       ├── ruleService.js             # Rule performance analytics
│       ├── riskCalibrationService.js  # Editable risk parameter management
│       └── complianceAnalysisService.js # Multi-obligation parsing and semantic rule matching
├── config/
│   └── layoutConfig.js          # Configurable panel and layout system
└── utils/
    └── eventBus.js              # Centralized event-driven communication
├── App.jsx                      # Main application layout and state management
└── main.jsx                     # React entry point
```

## Data Model Design

### Regulatory Documents
- Hierarchical structure (Document → Requirements)
- Clear separation between regulatory frameworks and internal policies
- Support for multiple jurisdictions (US, UK, EU) with comprehensive regulatory coverage
- Document type classification (regulatory vs. internal)

### Requirements (formerly Clauses)
- Individual regulatory requirements with full text
- Metadata taxonomy: jurisdiction, product type, customer type, risk level
- Performance-driven analysis focused on rule counts and coverage metrics
- Evidence tracking with quality assessments
- Linked to monitoring rules through metadata matching

### Monitoring Rules
- Performance metrics: alerts/month, true positive rate, alerts investigated
- Backtest scores and coverage percentages
- Linked to clauses through shared metadata
- Support for different rule categories (Cash Monitoring, Behavioral Analytics, Velocity Tracking, etc.)
- **Focus**: Pure transaction monitoring (no SAR filing or sanctions screening)

### System Alerts
- Types: Performance degradation, coverage gaps, AI insights, regulatory updates
- Priority levels: High, Medium, Low
- Contextual linking to specific clauses and rules
- Action recommendations and impact assessments

### Analyst Capacity Modeling
- **Multi-scenario analysis**: -2, -1, current, +1, +2 analyst staffing options
- **Dynamic threshold modeling**: Investigation thresholds from $5K (10 analysts) to $100K (6 analysts)
- **Comprehensive ROI analysis**: Both investment costs and cost savings scenarios
- **Utilization optimization**: Traffic light system (Green <75%, Yellow 75-85%, Red >85%)
- **Impact visualization**: Positive/negative coverage and workload implications

## Key Features Implemented

### 🎯 Three-Panel Dashboard Layout
- **Left Panel**: Regulatory document tree with hierarchical navigation and internal policy separation
- **Center Panel**: Master/detail requirement views with comprehensive analysis
- **Right Panel**: Real-time alerts and quick actions

### 🔍 Advanced Filtering System
- Multi-dimensional filtering: jurisdiction, product type, customer type (Individual, Business, Corporate)
- Real-time search across requirement content
- Dynamic result counting and context awareness
- Cascading filter integration across all components

### 📊 Performance Analytics Dashboard
- Operational metrics focus: rule counts, alert volumes, true positive rates
- Coverage percentage visualization with color-coded indicators
- Performance trending based on quantifiable data points

### 🚨 Intelligent Alert Management
- Priority-based workflow (High/Medium/Low)
- Context-aware filtering (show alerts for selected clause)
- Action recommendations with business impact analysis

### 👥 Enhanced Capacity Planning Interface
- **5-scenario modeling**: Full spectrum from -2 to +2 analyst adjustments
- **Current baseline**: 8 analysts, 87% utilization, $50K+ investigation threshold
- **Expansion scenarios**: +1 analyst (78% util, $10K threshold), +2 analysts (71% util, $5K threshold)
- **Reduction scenarios**: -1 analyst (92% util, $75K threshold), -2 analysts (95% util, $100K threshold)
- **Dynamic impact analysis**: Real-time coverage, cost, and risk assessment for each scenario
- **Smart color coding**: Green/yellow/red indicators for utilization rates and impact metrics
- **Comprehensive ROI modeling**: Investment costs vs. cost savings with investigation volume changes
- **Focus**: Investigation workflow optimization rather than SAR filing metrics

### 📋 Evidence Management
- Quality-scored evidence (Excellent, Good, Fair)
- Multiple evidence types: rule performance, backtest results, audit reports
- Audit trail preparation for regulatory examinations

### 📦 Export Package Configuration
- **Dual Export Types**: Internal operational reports vs. external audit packages with distinct theming
- **Flexible Scope Selection**: Export by filters (jurisdiction/product/customer) or by specific regulations
- **Content Customization**: Toggle inclusion of requirement text, rules, evidence, and risk calibration
- **Document Attachment**: Upload external files (PDF, DOCX, XLSX) to include in export package
- **Smart Regulation Picker**: Checkbox selection with requirement counts for precise export control
- **Mock PDF Generation**: Configuration interface ready for backend integration

### 📊 Compliance Insights Panel
- **Success Measures Dashboard**: Four critical compliance metrics per requirement
  - Associated rules count with zero-rule warnings
  - Last assessment timing with color-coded status indicators
  - Daily alert volume calculations across all linked rules
  - Alert trend analysis with concern flagging
- **Risk Calibration Parameters**: Dynamic transaction thresholds by customer segment
  - Multi-tiered customer risk profiles (Low/Medium/High Risk Retail, Corporate, Private Banking)
  - Rule-specific threshold multipliers and monitoring frequencies
  - Configurable lookback periods and processing schedules
- **Tabbed Interface**: Clean separation between operational metrics and risk parameters
- **Real-Time Updates**: All insights recalculate dynamically based on requirement selection

### 🏷️ Taxonomy Pills System
- **Prominent Metadata Display**: Jurisdiction, product type, and customer type pills at top of each requirement
- **Visual Categorization**: Color-coded pill system for immediate classification
- **Professional Styling**: Clean, rounded pills with subtle borders and consistent spacing
- **Risk Level Integration**: Dynamic color coding based on requirement risk assessment

### 🔍 Streamlined Rule Display
- **Simplified Rule Cards**: Clean, informational display of monitoring rules with essential metrics
- **Essential Metrics Only**: Rule name, description, daily alerts, accuracy, and recent change percentage
- **Performance-Based Indicators**: Color-coded accuracy and trend metrics for quick assessment
- **No Overlay Complexity**: Inline display eliminates need for additional panels or modals
- **Focus on Actionability**: Immediate visibility of rule performance without deep-dive complexity

### 📋 Document Organization & Separation
- **Regulatory Framework Section**: Formal regulations (BSA, PATRIOT Act, etc.) with slate-colored styling
- **Internal Policies Section**: Organization-specific policies with emerald-colored styling
- **Clear Visual Distinction**: Different color schemes to separate regulatory vs. internal requirements
- **Unified Navigation**: Consistent interaction patterns across both document types

### ⚡ Performance & Accessibility Enhancements
- **React Optimization**: Memoized filtering operations with `useMemo` and `useCallback`
- **Debounced Search**: 300ms search delay for improved performance
- **Full Accessibility**: ARIA labels, keyboard navigation, semantic HTML elements
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks
- **Data Validation**: Early validation of mock data with descriptive error messages

## Development Challenges Encountered

### Tailwind CSS Configuration Resolution
- **Problem**: Tailwind v4 utilities not being recognized, causing malformed appearance
- **Root Cause**: Tailwind v4 has breaking changes in PostCSS integration
- **Solution Applied**: Downgraded to Tailwind v3.4.4 with proper PostCSS configuration
- **Custom Styling**: Added internal policy styling and removed scoring classes in index.css
- **Result**: Fully functional styling with proper color schemes and layouts

### GitHub Pages Deployment Challenges
- **Issue**: GitHub Pages deployment configuration for iframe compatibility
- **Root Cause**: Project page deployment pattern needed to match working repositories
- **Solution**: Set Vite base to '/demo-aml-compliance-hub/' for proper GitHub Pages project deployment
- **Cache Issues**: May require deleting and recreating gh-pages branch to clear old builds
- **Final Result**: Successfully deployed to https://fortify-solutions.github.io/demo-aml-compliance-hub/

## Mock Data Highlights

The application includes comprehensive mock data representing:
- **6 Major Regulatory Frameworks**: BSA, PATRIOT Act, FinCEN Transaction Monitoring, UK MLR 2017, POCA 2002, EU AMLD5
- **1 Internal Policy Document**: Transaction Monitoring Policy with governance and procedures
- **11 Detailed Requirements**: Comprehensive coverage across US, UK, and EU jurisdictions with full text, metadata, and linked rules
- **12 Monitoring Rules**: Realistic performance metrics including UK and EU-specific geographic risk monitoring
- **Active Alert System**: 8 different alert types including jurisdiction-specific compliance alerts
- **Capacity Modeling**: Current and projected analyst scenarios with comprehensive ROI analysis
- **International Coverage**: Multi-jurisdictional filtering and regulatory compliance tracking

## Recommended Next Steps

### Immediate Technical Fixes
1. **Resolve Tailwind CSS Configuration**: 
   - Consider downgrading to Tailwind v3 for compatibility
   - Or complete migration to Tailwind v4 with proper setup
   - Alternative: Switch to styled-components or vanilla CSS

2. **Complete Component Styling**:
   - Apply consistent color scheme throughout all components
   - Implement proper responsive design
   - Add hover states and transitions

### Feature Enhancements
1. ✅ **Interactive Requirement Selection**: Document tree now fully clickable with direct requirement navigation
2. **Advanced Filtering**: Add date ranges, evidence quality filters
3. **Export Functionality**: Implement actual report generation
4. **Workflow Management**: Add alert resolution tracking
5. **Historical Trending**: Show compliance score changes over time
6. ✅ **Rule Coverage Analysis**: Comprehensive rule performance and gap analysis interface

### Integration Opportunities
1. **Real AML System Integration**: Replace mock data with API calls
2. **Authentication**: Add role-based access control
3. **Database Persistence**: Store user preferences and analysis results
4. **Notification System**: Real-time alert delivery
5. **Advanced Analytics**: Predictive compliance scoring

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3000
```

## Commands for Future Development

```bash
# Linting and type checking
npm run lint

# Build for production  
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Recent Major Updates (v2.0)

### Transaction Monitoring Focus Transformation
- **Complete System Overhaul**: Transformed from general AML system to dedicated transaction monitoring
- **Content Migration**: All SAR filing references replaced with alert investigation metrics
- **Regulatory Framework Update**: Replaced OFAC Sanctions with FinCEN Transaction Monitoring requirements
- **Internal Policy Integration**: Added "Internal Transaction Monitoring Policy" alongside regulatory documents
- **Customer Type Filtering**: Implemented three-tier customer segmentation (Individual, Business, Corporate)

### Deployment & Infrastructure
- **Repository**: Created internal repository at fortify-solutions GitHub organization
- **Live Hosting**: Successfully deployed to GitHub Pages with automated build process
- **Configuration**: Resolved Tailwind v3/v4 compatibility and Vite base path issues
- **Performance**: Optimized for production with proper asset loading and caching

### Data Model Enhancements
- **Monitoring Rules**: 12 transaction-focused rules with realistic performance metrics
- **Alert System**: 5 alert types including policy compliance notifications
- **Evidence Tracking**: Quality-scored evidence with audit trail capabilities
- **Enhanced Capacity Modeling**: Multi-scenario analysis (-2 to +2 analysts) with comprehensive impact assessment

### Capacity Planning System Overhaul (v2.1)
- **Expanded Scenario Coverage**: From single +1 analyst to 5-scenario system (-2, -1, current, +1, +2)
- **Realistic Modeling**: Investigation thresholds scale from $5K (10 analysts) to $100K (6 analysts)
- **Utilization Optimization**: Traffic light system with 71-95% utilization range across scenarios  
- **Bi-directional Analysis**: Both expansion investments and reduction savings scenarios
- **Visual Enhancement**: Smart color coding for positive/negative impacts and risk levels
- **Tailwind CSS Fixes**: Resolved compatibility issues with direct CSS implementation

### User Experience Improvements
- **Filter Integration**: Customer type dropdown flows through all system components
- **Branding Update**: Rebranded from "Fortify AML Audit" to "AMLBoost Audit"
- **Visual Consistency**: Proper color schemes and responsive layouts
- **Navigation**: Seamless filtering across regulatory and internal policy documents

## Recent Major Updates (v3.1) - Extensible Architecture & Analytics Focus

### Architectural Extensibility Improvements
- **Modular State Management**: Extracted all state logic from App.jsx into specialized hooks (`useAppState.js`)
- **Event-Driven Communication**: Implemented centralized event bus system for component communication
- **Configurable Layout System**: Created flexible panel configuration system supporting responsive layouts
- **Domain-Specific Services**: Separated data services into specialized modules (documentService, alertService, ruleService)
- **Caching & Performance**: Added intelligent caching and data validation across service layer

### Document Organization & Visual Separation
- **Internal vs. Regulatory Distinction**: Clear separation between regulatory frameworks and internal policies
- **Emerald Styling for Internal Policies**: Distinct green gradient styling for internal policy documents
- **Slate Styling for Regulatory Framework**: Professional grey styling for formal regulatory documents
- **Unified Navigation Patterns**: Consistent interaction behavior across both document types
- **Type-Based Filtering**: Document classification system supporting future expansion

### Analytics System Transformation
- **Scoring System Removal**: Eliminated all subjective 1-5 rating systems across the application
- **Performance Metrics Focus**: Emphasis on quantifiable data: alert counts, true positive rates, coverage percentages
- **Operational Analytics**: Rule count tracking, investigation volume analysis, and capacity utilization
- **Clean UI**: Removed "System Active" badges and simplified interface elements
- **Terminology Standardization**: Changed "clauses" to "requirements" throughout the application

## Recent Major Updates (v3.0) - Production-Ready Enhancement

### Performance & Accessibility Overhaul
- **React Performance Optimization**: Implemented comprehensive memoization strategy with `useMemo` and `useCallback`
- **Debounced Search**: Added 300ms search debouncing for improved performance on large datasets
- **WCAG AA Compliance**: Full accessibility implementation with ARIA labels, keyboard navigation, and semantic HTML
- **Error Boundary System**: Comprehensive error handling with user-friendly fallback interfaces

### International Regulatory Expansion  
- **UK Regulatory Coverage**: Added Money Laundering Regulations 2017 and POCA 2002 requirements
- **EU AMLD5 Integration**: Comprehensive EU Anti-Money Laundering Directive coverage
- **Multi-Jurisdictional Filtering**: Enhanced filtering system supporting US, UK, and EU regulatory frameworks
- **Geographic Risk Rules**: Added UK and EU-specific monitoring rules with realistic performance metrics
- **International Alerts**: Jurisdiction-specific compliance alerts and coverage gap analysis

### Interactive Rule Coverage Analysis System
- **Clickable Rule Interface**: All monitoring rules now interactive with detailed coverage analysis
- **Sliding Coverage Panel**: Sophisticated side panel with comprehensive rule performance breakdown
- **Coverage Metrics**: Transaction, customer, geographic, and operational coverage analysis
- **Gap Visualization**: Visual identification of coverage gaps with impact assessment and recommendations  
- **Batch Processing Focus**: Realistic metrics for daily processing, weekend coverage, and monthly backtesting
- **Performance Dashboard**: Color-coded progress bars, metric cards, and trend analysis

### Enhanced Navigation & Interaction
- **Clickable Document Tree**: Complete navigation overhaul with direct requirement access from document hierarchy
- **Keyboard Navigation**: Full keyboard accessibility across all interactive elements
- **Context Preservation**: Rule analysis maintains requirement context while providing detailed insights
- **Smooth Animations**: Professional slide-in panels and transitions for enhanced user experience

### Data Model & Architecture Improvements
- **Data Validation**: Early validation system for mock data integrity with descriptive error reporting
- **Component Architecture**: Modular design with dedicated hooks and utility functions
- **State Management**: Optimized state handling with proper callback optimization
- **Error Recovery**: Graceful error handling with reload and recovery options

## Recent Major Updates (v4.0) - Compliance Insights & UX Refinement

### Compliance Insights Panel Transformation
- **Complete Right Panel Redesign**: Replaced AlertsPanel with comprehensive ComplianceInsights component
- **Success Measures Dashboard**: Four key metrics for each regulatory requirement:
  1. **Associated Rules Count**: Number of monitoring rules mapped to requirement (with warning for zero)
  2. **Last Assessment**: Time since most recent rule update or evidence addition with color-coded status
  3. **Daily Alert Volume**: Average alerts generated per day across all associated rules
  4. **Alert Trends**: Directional analysis with percentage change and concern flagging
- **Risk Calibration Parameters**: Dynamic transaction thresholds and monitoring parameters by customer segment
- **Tabbed Interface**: Clean separation between Success Measures and Risk Calibration views
- **Enhanced Mock Data**: Added assessment dates, evidence tracking, and realistic trend analysis

### User Experience Improvements
- **Taxonomy Pills**: Moved jurisdiction, product type, and customer type metadata to prominent pill display at top of requirement screens
- **Simplified Rule Display**: Streamlined rule information to show only essential metrics:
  - Rule name and description
  - Daily alerts (calculated from monthly)
  - Accuracy percentage with color coding
  - Recent change percentage with performance-based calculations
- **Removed Rule Coverage Overlay**: Eliminated complex overlay panel in favor of inline rule information
- **Professional Styling**: Clean, color-coded pills with subtle borders and proper spacing

### Technical Architecture Updates
- **Component Consolidation**: Removed RuleCoveragePanel and AlertsPanel complexity
- **Performance Optimization**: Intelligent trend calculation based on rule performance metrics
- **Data Model Enhancement**: Extended mock data with lastUpdated dates and evidence timestamps
- **Clean State Management**: Simplified component interactions by removing overlay state management

### Design Philosophy Evolution
- **Immediate Visibility**: Critical taxonomy information now prominently displayed
- **Information Density**: Balanced detailed insights with scannable overview format
- **Contextual Intelligence**: Smart color coding and trend analysis provide actionable insights
- **Audit Readiness**: Success measures provide clear compliance status at requirement level

## Recent Major Updates (v5.0) - Editable Risk Calibration System

### Interactive Risk Parameter Management
- **Fully Editable Risk Calibration**: Complete transformation of Risk Calibration Overview from static display to interactive configuration system
- **Real-time Parameter Updates**: Changes to risk thresholds propagate immediately across all clause sidebar pages through shared state management
- **Persistent Configuration**: Risk calibration settings automatically save to localStorage for session persistence
- **Input Validation**: Comprehensive validation for all editable parameters with user-friendly error messages

### Risk Calibration Table Restructuring
- **Streamlined Column Design**: Refined table to exact business requirements with 8 focused columns:
  1. **Customer Segment** - Clean segment names without risk level badges
  2. **Transaction Threshold** - Dollar amount thresholds with daily calculations
  3. **Velocity Limit** - Transaction count limits per day
  4. **Behaviour Delta** - Editable multipliers for behavioral change detection (1.0x-10.0x)
  5. **Comparison to Peers** - Editable multipliers for peer group analysis (1.0x-10.0x)
  6. **Monthly Cumulative** - Calculated monthly limits with weekly sub-totals
  7. **Coverage** - Realistic coverage percentages (85%-94%) with progress visualization
  8. **Last Updated** - Varied realistic dates (January 2025) with "by Risk Operations" attribution

### Enhanced Data Architecture
- **Risk Calibration Service**: New dedicated service (`riskCalibrationService.js`) for centralized parameter management
- **Reactive State Management**: Enhanced `useAppState` hook with `useRiskCalibrationState` for real-time updates
- **Event-Driven Updates**: Listener-based architecture ensures changes propagate across all consuming components
- **Component Modularity**: Extracted `RiskCalibrationTableBody` component for maintainable table rendering
- **Realistic Demo Data**: Non-random coverage values and varied update dates for authentic demonstration

### User Experience Improvements
- **Inline Editing**: Click-to-edit functionality with save/cancel controls directly in table rows
- **Visual Feedback**: Loading states, validation errors, and success confirmations
- **Keyboard Navigation**: Full accessibility support for all editing interactions
- **Reset Functionality**: One-click reset to default parameters with confirmation
- **Professional Styling**: Clean, consistent interface with emerald theme for internal policy sections

### Technical Implementation
- **Error Boundary Protection**: Comprehensive error handling prevents crashes from malformed data
- **Hot Module Reload**: Seamless development experience with instant updates during parameter changes
- **Build Optimization**: Maintained production build efficiency despite increased interactivity
- **Type Safety**: Robust parameter validation prevents runtime errors from invalid input ranges
- **Memory Management**: Efficient listener cleanup and state optimization for performance

## Recent Major Updates (v8.0) - European & International Regulatory Framework Expansion

### Comprehensive Regulatory Coverage Update
- **European Focus**: Transformed application to focus exclusively on European and international regulations
- **FATF Integration**: Added complete FATF (Financial Action Task Force) framework with 4 comprehensive documents
- **Supplement Categories**: Introduced new document type for Basel Committee and Wolfsberg Group standards
- **Dynamic Filtering**: Updated jurisdiction dropdown to dynamically show only available jurisdictions from visible regulations

### New Regulatory Documents Added (10 total, 48 clauses)
**European Regulations (4 documents):**
1. **EU Anti-Money Laundering Directive (AMLD5)** - 3 clauses covering ongoing monitoring, enhanced due diligence, and suspicious transaction reporting
2. **Germany – Anti-Money Laundering** - 5 clauses covering Laufende Überwachung (ongoing monitoring), periodic KYC updates, FIU reporting, enhanced monitoring, and cash transaction monitoring
3. **Italy – Anti-Money Laundering** - 5 clauses covering ongoing monitoring (Adeguata Verifica), UIF reporting, anomaly indicators, PEP monitoring, and virtual currency monitoring
4. **Spain – Anti-Money Laundering** - 5 clauses covering ongoing monitoring, SEPBLAC reporting, risk indicators, systematic reporting, and PEP monitoring

**FATF Framework (4 documents):**
5. **FATF 40 Recommendations** - 5 clauses covering ongoing monitoring, record-keeping, wire transfers, suspicious transaction reporting, and complex transactions
6. **FATF Correspondent Banking Guidance** - 5 clauses covering mandatory monitoring, risk profile changes, unusual activity detection, RFI process, and nested relationships
7. **FATF Methodology for Technical Compliance** - 5 clauses covering assessment criteria for monitoring, transaction records, wire transfers, suspicious reporting, and effectiveness measures
8. **FATF Risk-Based Approach Guidance** - 5 clauses covering risk-based monitoring, continuous/triggered monitoring, automated systems, technology innovation, and periodic testing

**Supplement Documents (2 documents):**
9. **Basel Committee Guidelines** - 5 clauses (recategorized from regulatory to supplement)
10. **Wolfsberg Group Standards** - 5 clauses (recategorized from regulatory to supplement)

### Hidden Regulations
All US, UK, and other non-European regulations hidden but preserved in codebase:
- USA regulations: BSA, PATRIOT Act, AMLA 2020, FinCEN (CDD, CTR, SAR, Travel Rule)
- UK Money Laundering Regulations 2017
- Other jurisdictions: Canada, Australia, Singapore, Hong Kong, Japan, Switzerland, UAE

### Document Organization Enhancements
- **Three-Section Structure**:
  - Regulatory Framework (slate theme) - European and FATF regulations
  - Supplements (amber theme) - Basel Committee and Wolfsberg Group
  - Internal Policies (emerald theme) - Organization-specific policies
- **Visual Distinction**: Color-coded sections with distinct borders and styling
- **Type-Based Filtering**: DocumentService filters documents by visibility flag
- **Dynamic Jurisdiction List**: Header component extracts jurisdictions from visible documents only

### Technical Architecture Updates
- **DocumentService Enhancement**: All methods now filter by `visible: false` flag
- **Header Component Update**: Dynamic jurisdiction extraction with useMemo optimization
- **Jurisdiction Mapping**: Comprehensive display name mapping (DE→Germany, IT→Italy, ES→Spain, International)
- **Data Model Extension**: Added `visible` property to all documents (true/false)
- **Component Styling**: Added supplement document styling with amber theme

### Data Statistics
- **Total visible documents**: 10 (4 EU + 4 FATF + 2 Supplements)
- **Total visible clauses**: 48 transaction monitoring requirements
- **Jurisdictions shown**: EU, DE, IT, ES, International
- **Bundle size**: 475.66 kB (increased ~20KB for FATF regulations)
- **Hidden documents**: 13 (all US, UK, and other international regulations preserved)

### Build & Deployment
- ✅ Production build successful with no errors
- ✅ All document types render correctly with appropriate styling
- ✅ Jurisdiction filtering works dynamically
- ✅ Document visibility toggling system fully operational

## Recent Major Updates (v8.1) - Complete Rule-Requirement Linkage System

### Comprehensive Rule Linkage Implementation
- **Full Bidirectional Linking**: Established complete linkage between all visible European/FATF regulations and existing monitoring rules
- **35 Requirements Updated**: Linked all Germany (5), Italy (5), Spain (5), and FATF (20) requirements to appropriate rules
- **5 Rules Enhanced**: Updated rule-1, rule-2, rule-3, rule-9, and rule-12 with comprehensive new clause associations

### European Regulation Rule Mappings
**Germany AML (5 clauses):**
- Section 1 (Ongoing Monitoring): Linked to rule-9 (Enhanced DD), rule-12 (EU Cross-Border)
- Section 2 (Risk-Based KYC): Linked to rule-9
- Section 3 (FIU Reporting): Linked to rule-9, rule-12
- Section 4 (Cash/Cross-Border): Linked to rule-12
- Section 5 (Testing/Governance): Linked to rule-9, rule-12

**Italy AML (5 clauses):**
- Section 1 (Ongoing Monitoring): Linked to rule-9, rule-12
- Section 2 (Threshold Monitoring): Linked to rule-12
- Section 3 (UIF Reporting): Linked to rule-9, rule-12
- Section 4 (PEP Monitoring): Linked to rule-9
- Section 5 (Testing/Records): Linked to rule-9, rule-12

**Spain AML (5 clauses):**
- Section 1 (Ongoing Monitoring): Linked to rule-9, rule-12
- Section 2 (SEPBLAC Reporting): Linked to rule-9, rule-12
- Section 3 (Risk Indicators): Linked to rule-12
- Section 4 (PEP/High-Risk): Linked to rule-9
- Section 5 (Internal Controls): Linked to rule-9, rule-12

### FATF Framework Rule Mappings
**FATF 40 Recommendations (5 clauses):**
- Rec 10 (Ongoing Monitoring): Linked to rule-1, rule-2, rule-9, rule-12
- Rec 11 (Record-Keeping): Linked to rule-1, rule-2, rule-3, rule-9, rule-12
- Rec 16 (Wire Transfers): Linked to rule-3, rule-12
- Rec 20 (Suspicious Reporting): Linked to rule-1, rule-2, rule-9, rule-12
- Complex/Unusual Transactions: Linked to rule-2, rule-9

**FATF Correspondent Banking (5 clauses):**
- Ongoing Monitoring Requirement: Linked to rule-3, rule-12
- Risk Profile Changes: Linked to rule-3, rule-9
- Unusual Activity Detection: Linked to rule-2, rule-3, rule-12
- RFI Process: Linked to rule-3
- Nested Relationships: Linked to rule-2, rule-3

**FATF Methodology (5 clauses):**
- Criterion 10.7 (Ongoing Monitoring): Linked to rule-1, rule-2, rule-9, rule-12
- Criterion 11.1 (Transaction Records): Linked to rule-1, rule-2, rule-3, rule-9, rule-12
- Criteria 16.1-16.8 (Wire Transfers): Linked to rule-3, rule-12
- Criteria 20.1-20.2 (Suspicious Reporting): Linked to rule-1, rule-2, rule-9, rule-12
- Immediate Outcome 4 (Effectiveness): Linked to rule-1, rule-2, rule-9, rule-12

**FATF Risk-Based Guidance (5 clauses):**
- Risk-Based Monitoring: Linked to rule-1, rule-2, rule-9, rule-12
- Continuous/Triggered Monitoring: Linked to rule-1, rule-2, rule-9
- Automated Systems: Linked to rule-1, rule-2, rule-9, rule-12
- Technology/Innovation: Linked to rule-2, rule-9
- Periodic Testing: Linked to rule-1, rule-2, rule-9, rule-12

### Rule Enhancement Details
**rule-1 (Large Cash Transaction Detection):**
- Added 11 FATF clause IDs covering ongoing monitoring, record-keeping, suspicious reporting, and system effectiveness

**rule-2 (Structuring Pattern Analysis):**
- Added 15 FATF clause IDs covering behavioral analytics, complex transactions, nested relationships, and testing

**rule-3 (Cross-Border Wire Monitoring):**
- Added 9 FATF clause IDs covering wire transfers, correspondent banking, and record-keeping

**rule-9 (Enhanced Due Diligence Monitoring):**
- Added 27 European + FATF clause IDs covering all German, Italian, and Spanish EDD/PEP requirements plus FATF standards

**rule-12 (EU Cross-Border Transaction Analysis):**
- Added 29 European + FATF clause IDs covering all European ongoing monitoring, reporting, and cross-border requirements plus FATF wire transfer and methodology standards

### Technical Implementation
- **Bidirectional Relationships**: Maintained data integrity with matching clause→rule and rule→clause linkages
- **Semantic Matching**: Rules linked based on functional alignment with regulatory requirements
- **Coverage Analysis Ready**: All linkages support existing compliance analysis and gap detection features
- **Performance Optimized**: No impact on application performance despite increased data associations

### Impact & Benefits
- **Complete Regulatory Coverage**: All visible regulations now have active monitoring rule connections
- **Enhanced UI Experience**: Users can navigate between requirements and rules seamlessly
- **Improved Analytics**: Coverage gap analysis now accurately reflects European and FATF compliance status
- **Audit Readiness**: Clear traceability from international standards to implemented monitoring controls

## Recent Major Updates (v7.0) - Intelligent Multi-Obligation Coverage Analysis

### Semantic Rule-Obligation Matching System
- **Advanced Obligation Parsing**: Intelligent extraction of numbered regulatory obligations using improved regex patterns that correctly identify each distinct requirement (previously missed 3 out of 5 obligations in complex requirements)
- **Semantic Coverage Analysis**: AI-powered matching between monitoring rules and regulatory obligations using keyword analysis, confidence scoring, and coverage level assessment (high/medium/low/none)
- **Rule-Obligation Mapping**: Individual assessment of which existing rules cover which specific obligations, preventing false warnings about already-covered requirements
- **Contextual Gap Analysis**: Distinguishes between truly uncovered obligations vs. those with partial coverage, providing more accurate compliance assessment

### Enhanced Coverage Warning System
- **Precise Gap Identification**: Shows exactly which numbered obligations lack adequate rule coverage instead of generic "insufficient rules" warnings
- **Coverage Status Indicators**: Visual badges showing "Coverage Warning" only for requirements with actual gaps, not those already well-covered by existing rules
- **Semantic Confidence Scoring**: Each rule-obligation match includes confidence score (0-95%) based on keyword overlap and contextual analysis
- **Multi-Level Coverage Assessment**:
  - **High Coverage**: Rule semantically matches obligation with 70%+ confidence (e.g., cash monitoring rule covers cash deposit obligations)
  - **Medium Coverage**: Partial semantic match requiring potential enhancement (e.g., general transaction rule partially covers velocity monitoring)
  - **Low Coverage**: Minimal overlap, dedicated rule recommended
  - **No Coverage**: No semantic relationship found, new rule required

### Intelligent Risk Calibration
- **Accurate Risk Assessment**: Risk levels now account for existing rule coverage, reducing from "Critical" to "Medium" when some obligations are already addressed
- **Specific Recommendations**: Instead of "create 5 rules," provides targeted guidance like "add wire transfer monitoring rule for obligation (2), velocity analytics for obligation (3)"
- **Coverage Mapping Visualization**: Shows which obligations are covered, partially covered, or uncovered with specific reasoning for each assessment

### Technical Implementation
- **ComplianceAnalysisService**: New dedicated service for multi-obligation detection and semantic analysis with comprehensive keyword matching across financial monitoring domains
- **Semantic Keyword Engine**: Analyzes cash, wire transfer, velocity, business ratio, cross-border, threshold, and real-time monitoring patterns
- **Enhanced UI Integration**: Coverage warnings now display in both requirement list view (red backgrounds/badges) and detailed compliance insights panel with specific obligation breakdowns
- **Performance Optimization**: Efficient caching and analysis with confidence-based filtering to prevent false positives

## Recent Major Updates (v10.0) - Export Package Configuration System

### Comprehensive Export Interface
- **Modal-Based Configuration**: Professional export configuration interface with full customization options
- **Dual Export Modes**: Distinct workflows for internal reports vs. external audit packages
  - **Internal Reports**: Operational analysis with emerald theme for internal stakeholders
  - **External Audit Packages**: Formal regulatory documentation with purple theme
- **Flexible Export Scope**: Toggle between filter-based and regulation-specific exports
  - **By Filters**: Export all requirements matching jurisdiction, product, and customer filters
  - **By Specific Regulation**: Checkbox selection with requirement counts for precise control

### Content Inclusion Controls
- **Granular Content Selection**: Individual toggles for each content type
  - Requirement text and full regulatory language
  - Monitoring rules with performance metrics
  - Evidence artifacts and quality assessments
  - Risk calibration parameters and thresholds
- **Document Attachment System**: Upload external files to bundle with exports
  - Multi-file upload interface with drag-and-drop support
  - File preview with name, size, and remove functionality
  - Support for PDF, DOCX, XLSX formats (ready for backend integration)

### User Experience Features
- **Visual Type Selection**: Card-based export type picker with icons and descriptions
- **Segmented Scope Toggle**: Clean tab-style interface for scope switching
- **Smart Regulation List**: All visible documents with clause counts for easy selection
- **Configuration Summary**: Footer displays current selections before generation
- **Mock PDF Generation**: Console logging and alert confirmation (ready for backend PDF service)

### Technical Implementation
- **ExportConfigModal Component**: Self-contained modal with comprehensive state management
- **Header Integration**: Export button wired to modal trigger in main navigation
- **App-Level State**: Modal visibility managed in App.jsx alongside other modals
- **Filter Context Awareness**: Modal receives current filter state for pre-population
- **Document Service Integration**: Dynamic regulation list from visible documents

## Recent Major Updates (v9.0) - Fully Editable Risk Calibration System

### Complete Independent Threshold Management
- **All Values Independently Editable**: Transformed risk calibration from calculated dependencies to fully independent field management
- **Transaction Threshold Column**:
  - Single-payment threshold (editable)
  - Daily aggregate threshold (editable, independent of single-payment)
  - Percentile indicators for both values
- **Monthly Cumulative Column**:
  - Monthly cumulative threshold (editable)
  - Weekly cumulative threshold (editable, independent of monthly)
  - Percentile indicators for both values
- **Comprehensive Percentile Coverage**: Added exceed % indicators for all threshold types (single, daily, weekly, monthly)

### Enhanced Data Architecture
- **Independent Field Storage**: All threshold values stored as separate fields (baseAmount, dailyAggregate, weeklyCumulative, monthlyCumulative)
- **Backward Compatibility**: Automatic data migration from calculated values to independent fields
- **Realistic Percentile Modeling**: Hierarchical percentile patterns (e.g., 8.3% exceed single → 5.7% daily → 3.8% weekly → 2.9% monthly)
- **Dynamic Percentile Adjustment**: Percentiles recalculate based on custom threshold values using inverse ratio logic

### User Experience Improvements
- **Dual Input Fields**: Clear labeling (Single/Daily, Monthly/Weekly) with independent input controls
- **Inline Percentile Display**: Exceed % shown next to each threshold in both view and edit modes
- **Enhanced Validation**: Comprehensive validation for all threshold ranges with clear error messages
- **Improved Layout**: Side-by-side display of thresholds and percentiles for easy comparison

### Technical Implementation
- **Service Layer Enhancement**: RiskCalibrationService now manages 7 independent fields per segment (up from 4)
- **Migration Logic**: Automatic conversion of old data using default multipliers (3x daily, 5x weekly, 20x monthly)
- **Component Optimization**: RiskCalibrationTableBody supports flexible layout with percentile positioning
- **localStorage Management**: Seamless persistence of all independent threshold values

## Recent Major Updates (v6.0) - Enhanced Modal System & Detailed Views

### Comprehensive Modal Architecture
- **DetailModal Base Component**: Reusable modal foundation with consistent styling, keyboard navigation, and accessibility features
- **EvidenceDetailModal**: Deep-dive evidence analysis with comprehensive metrics, file associations, and timeline tracking
- **RuleDetailModal**: Detailed rule performance analysis with configuration details, coverage metrics, and trend analysis
- **Modal System Features**:
  - Escape key handling and background click dismissal
  - Scroll lock when modal is open
  - Full ARIA accessibility support
  - Responsive design with proper mobile handling

### Evidence Management Enhancement
- **Detailed Evidence Views**: Click-through functionality from evidence items to comprehensive detail modals
- **Evidence Type Intelligence**: Automatic content generation based on evidence type (backtest-results, performance-data, audit-report)
- **Realistic Evidence Metrics**:
  - Backtest results with 24-month analysis, precision/recall scores, F1 metrics
  - Performance data with 90-day monitoring, alert volume trends, investigation rates
  - Audit reports with regulatory body details, compliance scores, finding classifications
- **Evidence Timeline**: Visual timeline showing evidence addition, analysis completion, and review scheduling
- **File Association System**: Downloadable file references with realistic naming conventions

### Rule Analysis Deep-Dive
- **Performance Dashboard**: Comprehensive rule metrics including daily alerts, accuracy percentages, false positive rates, investigation loads
- **Configuration Visualization**: Complete metadata display with jurisdiction, product type, customer type, and risk level tags
- **Coverage Analysis Integration**: Rule-specific coverage metrics with color-coded progress indicators
- **Trend Analysis**: Dynamic trend calculation with improving/declining/stable status indicators
- **Interactive Rule Navigation**: Direct access to detailed rule analysis from any rule display

### Technical Architecture Improvements
- **Component Modularity**: Shared DetailModal component reduces code duplication and ensures consistency
- **Smart Content Generation**: Context-aware content generation based on data types and business logic
- **Performance Optimization**: Efficient modal rendering with proper cleanup and memory management
- **Accessibility Excellence**: Full keyboard navigation, screen reader support, and WCAG compliance

## Key Learning Outcomes

1. **User-Centered Design**: Starting with persona definition (Risk Manager) led to much cleaner feature prioritization
2. **Metadata-Driven Architecture**: Using shared metadata taxonomy creates powerful associations between regulatory requirements and monitoring rules
3. **Alert-Driven UX**: Background AI monitoring with prioritized alerts creates proactive compliance management
4. **Dual Artifact Strategy**: Separating internal operational reports from formal audit packages addresses different stakeholder needs
5. **Capacity Planning Integration**: Showing business impact ("investigate $10K+ vs $50K+") makes technical decisions more compelling
6. **Performance Over Perception**: Focusing on quantifiable metrics rather than subjective scores leads to more actionable insights
7. **Extensible Architecture**: Modular design patterns enable rapid feature development without breaking existing functionality
8. **Interactive Configuration Systems**: Transforming static displays into editable interfaces dramatically improves user engagement and system utility
9. **Reactive State Management**: Event-driven architecture with shared services enables seamless data propagation across complex component hierarchies
10. **Realistic Demo Data**: Using varied, business-realistic values instead of random data significantly improves demonstration credibility
11. **Semantic Analysis Precision**: Parsing regulatory text requires sophisticated pattern recognition - simple keyword matching fails to identify distinct obligations within complex requirements
12. **Contextual Rule Coverage**: Existing monitoring rules often provide partial coverage for regulatory obligations, requiring nuanced analysis rather than binary covered/uncovered assessments
13. **Intelligent Gap Analysis**: Effective compliance tools must distinguish between truly missing capabilities vs. areas where existing controls provide adequate coverage, preventing false alarms about well-managed risks
14. **Independent Field Management**: Breaking calculated dependencies enables more flexible threshold configuration - users need direct control over all values rather than rigid mathematical relationships
15. **Comprehensive Percentile Context**: Adding statistical context (% exceeding thresholds) transforms raw numbers into actionable insights about customer population distribution

This project demonstrates how thoughtful UX design and comprehensive data modeling can create sophisticated compliance tools that actually help risk managers do their jobs more effectively, rather than just checking regulatory boxes.

---

*Built collaboratively with Claude Code - demonstrating the power of AI-assisted software development for complex business domains.*