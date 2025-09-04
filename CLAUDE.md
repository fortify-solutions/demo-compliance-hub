# CLAUDE.md - AMLBoost Audit Project

## Project Overview

AMLBoost Audit is an advanced React application demonstrating a comprehensive AML (Anti-Money Laundering) transaction monitoring compliance system for financial institutions. The system focuses specifically on **transaction monitoring capabilities** rather than case management or sanctions screening, providing a dedicated interface for monitoring rule performance, alert investigation workflows, and regulatory compliance tracking.

**Live Application:** https://scaling-adventure-gg8gvqm.pages.github.io/  
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
- **Clause-Level Granularity**: All compliance tracking happens at the regulatory clause level
- **Metadata-Driven Associations**: Rules linked to clauses through shared taxonomy (jurisdiction, product type, customer type, risk level)
- **Dual Artifact Strategy**: Internal operational reports vs. formal audit packages

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
│   ├── Header.jsx               # Main navigation and filters with full accessibility
│   ├── DocumentTree.jsx         # Regulatory document hierarchy with clickable navigation
│   ├── ClauseContent.jsx        # Master/detail clause views with rule interactions
│   ├── AlertsPanel.jsx          # System alerts and recommendations
│   ├── CapacityModal.jsx        # Analyst capacity planning interface
│   ├── RuleCoveragePanel.jsx    # Rule coverage analysis sliding panel
│   └── ErrorBoundary.jsx        # Application-wide error handling
├── hooks/
│   └── useDebounce.js           # Performance optimization for search
├── services/
│   └── mockData.js              # Comprehensive mock data with validation
├── App.jsx                      # Main application layout and state management
└── main.jsx                     # React entry point
```

## Data Model Design

### Regulatory Documents
- Hierarchical structure (Document → Clauses)
- Each document has aggregate compliance score
- Support for multiple jurisdictions (US, UK, EU) with comprehensive regulatory coverage

### Clauses
- Individual regulatory requirements with full text
- Metadata taxonomy: jurisdiction, product type, customer type, risk level
- Scoring system (0-100%) with red-orange-green visualization
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
- **Left Panel**: Regulatory document tree with hierarchical navigation
- **Center Panel**: Master/detail clause views with comprehensive analysis
- **Right Panel**: Real-time alerts and quick actions

### 🔍 Advanced Filtering System
- Multi-dimensional filtering: jurisdiction, product type, customer type (Individual, Business, Corporate)
- Real-time search across clause content
- Dynamic result counting and context awareness
- Cascading filter integration across all components

### 📊 Compliance Scoring Visualization
- Overall compliance score (84% in mock data)
- Red-orange-green heat mapping for clause-level scores
- Performance trending and historical comparison

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

### 🔍 Interactive Rule Coverage Analysis
- **Clickable Rule Cards**: All monitoring rules in clause detail view are interactive
- **Sliding Coverage Panel**: Comprehensive rule analysis in dedicated side panel
- **Coverage Breakdown**: Transaction, customer, geographic, and operational coverage metrics
- **Gap Identification**: Visual identification of coverage gaps with impact assessment
- **Batch Processing Focus**: Daily processing, weekend coverage, and monthly backtesting metrics
- **Performance Visualization**: Color-coded progress bars and metric cards

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
- **Custom Styling**: Added score styling classes in index.css for compliance visualization
- **Result**: Fully functional styling with proper color schemes and layouts

### GitHub Pages Deployment Challenges
- **Issue**: Internal repository deployment with incorrect base paths
- **Root Cause**: Internal repos use different URL structure than public repos
- **Solution**: Set Vite base to '/' instead of '/repo-name/' for internal repositories
- **Cache Issues**: Required deleting and recreating gh-pages branch to clear old builds
- **Final Result**: Successfully deployed to https://scaling-adventure-gg8gvqm.pages.github.io/

## Mock Data Highlights

The application includes comprehensive mock data representing:
- **6 Major Regulatory Frameworks**: BSA, PATRIOT Act, FinCEN Transaction Monitoring, UK MLR 2017, POCA 2002, EU AMLD5
- **1 Internal Policy Document**: Transaction Monitoring Policy with governance and procedures
- **11 Detailed Clauses**: Comprehensive coverage across US, UK, and EU jurisdictions with full text, metadata, and linked rules
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
1. ✅ **Interactive Clause Selection**: Document tree now fully clickable with direct clause navigation
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
- **Clickable Document Tree**: Complete navigation overhaul with direct clause access from document hierarchy
- **Keyboard Navigation**: Full keyboard accessibility across all interactive elements
- **Context Preservation**: Rule analysis maintains clause context while providing detailed insights
- **Smooth Animations**: Professional slide-in panels and transitions for enhanced user experience

### Data Model & Architecture Improvements
- **Data Validation**: Early validation system for mock data integrity with descriptive error reporting
- **Component Architecture**: Modular design with dedicated hooks and utility functions
- **State Management**: Optimized state handling with proper callback optimization
- **Error Recovery**: Graceful error handling with reload and recovery options

## Key Learning Outcomes

1. **User-Centered Design**: Starting with persona definition (Risk Manager) led to much cleaner feature prioritization
2. **Metadata-Driven Architecture**: Using shared metadata taxonomy creates powerful associations between regulatory requirements and monitoring rules
3. **Alert-Driven UX**: Background AI monitoring with prioritized alerts creates proactive compliance management
4. **Dual Artifact Strategy**: Separating internal operational reports from formal audit packages addresses different stakeholder needs
5. **Capacity Planning Integration**: Showing business impact ("investigate $10K+ vs $50K+") makes technical decisions more compelling

This project demonstrates how thoughtful UX design and comprehensive data modeling can create sophisticated compliance tools that actually help risk managers do their jobs more effectively, rather than just checking regulatory boxes.

---

*Built collaboratively with Claude Code - demonstrating the power of AI-assisted software development for complex business domains.*