# CLAUDE.md - AMLBoost Audit Project

## Project Overview

This is an advanced React application demonstrating a comprehensive AML (Anti-Money Laundering) transaction monitoring compliance system for financial institutions, branded as AMLBoost Audit. The system focuses specifically on transaction monitoring capabilities rather than case management or sanctions screening. The application was designed and built through collaborative sessions between a human product owner and Claude, with a focus on creating a Risk Manager-centric interface for ongoing compliance monitoring and audit readiness.

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
- **React 19 + Vite**: Modern development experience with fast HMR
- **Tailwind CSS v4**: Utility-first styling (though we encountered configuration challenges)
- **Lucide React**: Consistent, professional iconography
- **Mock Data Services**: Comprehensive regulatory framework simulation
- **Component Architecture**: Modular, reusable components following established patterns

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Main navigation and filters
│   ├── DocumentTree.jsx     # Regulatory document hierarchy
│   ├── ClauseContent.jsx    # Master/detail clause views
│   ├── AlertsPanel.jsx      # System alerts and recommendations
│   └── CapacityModal.jsx    # Analyst capacity planning interface
├── services/
│   └── mockData.js          # Comprehensive mock data and utilities
├── App.jsx                  # Main application layout and state
└── main.jsx                 # React entry point
```

## Data Model Design

### Regulatory Documents
- Hierarchical structure (Document → Clauses)
- Each document has aggregate compliance score
- Support for multiple jurisdictions (US, UK, EU)

### Clauses
- Individual regulatory requirements with full text
- Metadata taxonomy: jurisdiction, product type, customer type, risk level
- Scoring system (0-100%) with red-orange-green visualization
- Evidence tracking with quality assessments
- Linked to monitoring rules through metadata matching

### Monitoring Rules
- Performance metrics: alerts/month, true positive rate, SAR filings
- Backtest scores and coverage percentages
- Linked to clauses through shared metadata
- Support for different rule categories (Cash Monitoring, Behavioral Analytics, etc.)

### System Alerts
- Types: Performance degradation, coverage gaps, AI insights, regulatory updates
- Priority levels: High, Medium, Low
- Contextual linking to specific clauses and rules
- Action recommendations and impact assessments

### Analyst Capacity Modeling
- Current vs. projected staffing scenarios
- Investigation threshold optimization ("with +1 analyst: investigate $10K+ vs current $50K+")
- ROI calculations for additional resources
- Utilization rate tracking and optimization

## Key Features Implemented

### 🎯 Three-Panel Dashboard Layout
- **Left Panel**: Regulatory document tree with hierarchical navigation
- **Center Panel**: Master/detail clause views with comprehensive analysis
- **Right Panel**: Real-time alerts and quick actions

### 🔍 Advanced Filtering System
- Multi-dimensional filtering: jurisdiction, product type, customer type
- Real-time search across clause content
- Dynamic result counting and context awareness

### 📊 Compliance Scoring Visualization
- Overall compliance score (84% in mock data)
- Red-orange-green heat mapping for clause-level scores
- Performance trending and historical comparison

### 🚨 Intelligent Alert Management
- Priority-based workflow (High/Medium/Low)
- Context-aware filtering (show alerts for selected clause)
- Action recommendations with business impact analysis

### 👥 Capacity Planning Interface
- Current state: 8 analysts, 87% utilization, $50K+ investigation threshold
- Projected scenario: +1 analyst → 78% utilization, $10K+ threshold
- ROI analysis: +15 additional SARs/month, better regulatory coverage

### 📋 Evidence Management
- Quality-scored evidence (Excellent, Good, Fair)
- Multiple evidence types: rule performance, backtest results, audit reports
- Audit trail preparation for regulatory examinations

## Development Challenges Encountered

### Tailwind CSS v4 Configuration Issues
- **Problem**: Custom CSS classes not being processed correctly
- **Root Cause**: Tailwind v4 has different configuration requirements vs. v3
- **Attempted Solutions**:
  1. Fixed PostCSS configuration to use `@tailwindcss/postcss`
  2. Removed `@tailwindcss/typography` dependency
  3. Converted custom classes to utility classes
  4. Fallback to inline styles for critical styling

### Layout and Styling Problems
- **Issue**: Text overlapping, missing colors, basic styling appearance
- **Contributing Factors**:
  - Tailwind config not fully compatible with Vite setup
  - Custom CSS classes not being processed
  - Height calculations causing overflow issues
- **Resolution Status**: Partially resolved with inline styles approach

## Mock Data Highlights

The application includes comprehensive mock data representing:
- **3 Major Regulatory Frameworks**: BSA, PATRIOT Act, FinCEN Transaction Monitoring
- **1 Internal Policy Document**: Transaction Monitoring Policy with governance and procedures
- **11 Detailed Clauses**: 8 regulatory + 3 internal policy clauses, each with full text, metadata, and linked rules
- **12 Monitoring Rules**: Realistic performance metrics and backtesting data
- **Active Alert System**: 5 different alert types including policy compliance alerts with varying priorities
- **Capacity Modeling**: Current and projected analyst scenarios

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
1. **Interactive Clause Selection**: Make document tree clickable to navigate to clause details
2. **Advanced Filtering**: Add date ranges, evidence quality filters
3. **Export Functionality**: Implement actual report generation
4. **Workflow Management**: Add alert resolution tracking
5. **Historical Trending**: Show compliance score changes over time

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
```

## Key Learning Outcomes

1. **User-Centered Design**: Starting with persona definition (Risk Manager) led to much cleaner feature prioritization
2. **Metadata-Driven Architecture**: Using shared metadata taxonomy creates powerful associations between regulatory requirements and monitoring rules
3. **Alert-Driven UX**: Background AI monitoring with prioritized alerts creates proactive compliance management
4. **Dual Artifact Strategy**: Separating internal operational reports from formal audit packages addresses different stakeholder needs
5. **Capacity Planning Integration**: Showing business impact ("investigate $10K+ vs $50K+") makes technical decisions more compelling

This project demonstrates how thoughtful UX design and comprehensive data modeling can create sophisticated compliance tools that actually help risk managers do their jobs more effectively, rather than just checking regulatory boxes.

---

*Built collaboratively with Claude Code - demonstrating the power of AI-assisted software development for complex business domains.*