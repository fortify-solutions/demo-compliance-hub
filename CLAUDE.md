# CLAUDE.md - AMLBoost Audit Project

## Project Overview

AMLBoost Audit is a React application demonstrating an AML transaction monitoring compliance system for financial institutions, focusing on rule performance monitoring, alert investigation workflows, and regulatory compliance tracking.

**Live Application:** https://fortify-solutions.github.io/demo-aml-compliance-hub/
**Repository:** https://github.com/fortify-solutions/amlboost-audit (Internal)

## Key Design Principles

- **Primary User**: Risk Manager with "always audit-ready" approach
- **Alert-Driven Workflow**: AI-powered background monitoring triggers actionable insights
- **Requirement-Level Granularity**: All compliance tracking at regulatory requirement level
- **Metadata-Driven Associations**: Rules linked to requirements through shared taxonomy
- **Performance-Focused**: Operational metrics over subjective scoring

## Technical Stack

- React 19.1.1 + Vite 7.1.2
- Tailwind CSS v3.4.4 (use v3, not v4)
- Lucide React for icons
- Mock data services with comprehensive regulatory simulation
- GitHub Pages deployment (base: '/demo-aml-compliance-hub/')

## Project Structure

```
src/
├── components/
│   ├── Header.jsx                    # Navigation and filters
│   ├── DocumentTree.jsx              # Regulatory document hierarchy
│   ├── ClauseContent.jsx             # Master/detail requirement views
│   ├── ComplianceInsights.jsx        # Success measures & risk calibration
│   ├── RiskCalibrationOverview.jsx   # Editable risk parameters
│   ├── CapacityModal.jsx             # Analyst capacity planning
│   ├── ExportConfigModal.jsx         # Export configuration
│   └── ErrorBoundary.jsx             # Error handling
├── hooks/
│   ├── useDebounce.js                # Search optimization
│   └── useAppState.js                # Centralized state management
├── services/
│   ├── mockData.js                   # Core mock data
│   └── data/
│       ├── documentService.js
│       ├── alertService.js
│       ├── ruleService.js
│       ├── riskCalibrationService.js
│       └── complianceAnalysisService.js
├── config/
│   └── layoutConfig.js               # Configurable panel system
└── utils/
    └── eventBus.js                   # Event-driven communication
```

## Data Model

### Regulatory Documents
- Hierarchical: Document → Requirements
- Three categories: Regulatory Framework (slate), Supplements (amber), Internal Policies (emerald)
- Currently focused on European & FATF regulations (US/UK regulations hidden but preserved)

### Requirements
- Individual regulatory obligations with full text
- Metadata: jurisdiction, product type, customer type, risk level
- Linked to monitoring rules through metadata matching
- Evidence tracking with quality assessments

### Monitoring Rules
- Performance metrics: alerts/month, true positive rate, coverage %
- Transaction monitoring focus (no SAR filing or sanctions screening)
- Semantic rule-obligation matching with confidence scoring

### Analyst Capacity Modeling
- 5-scenario analysis: -2, -1, current, +1, +2 analysts
- Dynamic thresholds: $5K (10 analysts) to $100K (6 analysts)
- Utilization optimization with traffic light system

## Key Features

- **Three-Panel Dashboard**: Document tree, requirement details, compliance insights
- **Advanced Filtering**: Jurisdiction, product type, customer type, real-time search
- **Compliance Insights**: Success measures dashboard + risk calibration parameters
- **Editable Risk Calibration**: Fully independent threshold management with localStorage persistence
- **Capacity Planning**: Multi-scenario ROI analysis with utilization modeling
- **Export Configuration**: Dual-mode (internal/external) with flexible scope selection
- **Semantic Analysis**: Multi-obligation parsing and intelligent rule coverage assessment
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Performance**: Debounced search, memoized operations, event-driven architecture

## Current Regulatory Coverage

**Visible Documents (10 total, 48 requirements):**
- 4 European regulations (EU AMLD5, Germany, Italy, Spain)
- 4 FATF documents (40 Recommendations, Correspondent Banking, Methodology, Risk-Based Guidance)
- 2 Supplements (Basel Committee, Wolfsberg Group)

**Hidden but Preserved:**
- US regulations (BSA, PATRIOT Act, FinCEN, etc.)
- UK Money Laundering Regulations
- Other jurisdictions (Canada, Australia, Singapore, etc.)

To toggle visibility, edit `visible: false` flag in `src/services/mockData.js`

## Running the Application

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Important Configuration Notes

### Tailwind CSS
- **Use v3.4.4 only** - v4 has breaking changes
- PostCSS configuration required for proper compilation
- Custom styles in `src/index.css` for document type themes

### GitHub Pages Deployment
- Vite base must be '/demo-aml-compliance-hub/'
- May need to delete and recreate gh-pages branch if caching issues occur

### Risk Calibration Service
- All threshold values independently editable (baseAmount, dailyAggregate, weeklyCumulative, monthlyCumulative)
- Automatic localStorage persistence
- Migration logic handles legacy calculated values

### Document Visibility System
- DocumentService filters by `visible: false` flag
- Header dynamically extracts jurisdictions from visible documents
- All linkages maintained for hidden regulations

## Key Learning Outcomes

1. **Metadata-Driven Architecture**: Shared taxonomy creates powerful rule-requirement associations
2. **Event-Driven State**: Centralized eventBus enables seamless cross-component updates
3. **Independent Field Management**: Breaking calculated dependencies improves flexibility
4. **Semantic Analysis**: Pattern recognition required for multi-obligation parsing
5. **Contextual Coverage**: Nuanced analysis prevents false compliance warnings
6. **Realistic Demo Data**: Business-realistic values improve demonstration credibility

## Integration Opportunities

- Replace mock data with real API calls
- Implement actual PDF export generation (interface ready)
- Add authentication/role-based access
- Database persistence for user preferences
- Real-time alert delivery system

---

*Built collaboratively with Claude Code - demonstrating AI-assisted software development for complex business domains.*
