# AML Audit Flow Demo

A comprehensive React application demonstrating an advanced AML (Anti-Money Laundering) compliance audit system for financial institutions.

## Features

### 🎯 **Risk Manager Focused Interface**
- Single-role design optimized for Risk Managers
- Ongoing compliance monitoring with "audit readiness" scoring
- Business-focused language (no technical SQL/code exposure)

### 📊 **Real-time Compliance Dashboard** 
- Overall compliance score with red-orange-green visualization
- Interactive regulatory document tree with hierarchical filtering
- Clause-level scoring with heat map visualization
- Advanced filtering by jurisdiction, product type, and customer type

### 🔍 **Intelligent Alert System**
- AI-powered background monitoring with automated gap detection
- Priority-based alert management (High/Medium/Low)
- Alert types: Performance degradation, coverage gaps, regulatory updates, AI insights
- Context-aware alerts linked to specific clauses and rules

### 📈 **Analyst Capacity Planning**
- Current vs. projected capacity modeling
- ROI analysis for additional staffing
- Investigation threshold optimization
- Resource allocation insights ("with +1 analyst, investigate $10K+ vs $50K+")

### 📋 **Dual Artifact Generation**
- **Internal Reports**: Rule strategy performance, P&L impact, resource optimization
- **Audit Packages**: Formal evidence packages, compliance certifications, gap remediation plans
- Pre-built templates for common audit scenarios

### 🏛️ **Regulatory Framework Support**
- Bank Secrecy Act (BSA) clauses and requirements
- USA PATRIOT Act customer identification rules  
- OFAC sanctions screening requirements
- Metadata-driven rule-to-clause associations
- Evidence quality tracking and scoring

## Technical Architecture

### **Frontend Stack**
- **React 19** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** with custom Fortify design system
- **Lucide React** for consistent iconography

### **Data Structure**
- Comprehensive mock data services
- Hierarchical regulatory document structure
- Metadata taxonomy (jurisdiction, product type, customer type, risk level)
- Rule performance metrics and backtesting results
- Evidence quality tracking and audit trails

### **Component Architecture**
```
App
├── Header (filters, compliance score, actions)
├── DocumentTree (regulatory framework navigation)
├── ClauseContent (master/detail clause views)
├── AlertsPanel (intelligent monitoring system)
└── CapacityModal (analyst planning interface)
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Usage Guide

### **Main Dashboard**
- **Left Panel**: Navigate regulatory documents (BSA, PATRIOT Act, OFAC)
- **Center Panel**: View clause details with compliance scoring
- **Right Panel**: Monitor system alerts and recommendations

### **Key Workflows**
1. **Daily Monitoring**: Check overall compliance score and active alerts
2. **Clause Investigation**: Click any clause for detailed analysis
3. **Gap Analysis**: Review red/orange scored clauses for improvement areas  
4. **Capacity Planning**: Use "Capacity Planning" button for staffing analysis
5. **Audit Preparation**: Generate evidence packages and compliance reports

### **Filtering & Search**
- Filter by jurisdiction (US, UK, EU)
- Filter by product type (retail, commercial, wealth management)
- Filter by customer type (individual, business, corporate)
- Full-text search across clause content

## Design Principles

### **Audit Readiness Focus**
- Continuous monitoring vs. reactive audit prep
- Always maintain "audit-ready" state
- Proactive gap identification and remediation

### **Business Language**
- Risk-focused terminology
- P&L and resource impact analysis
- Regulatory compliance scoring without technical jargon

### **Alert-Driven Architecture**
- Background AI monitoring triggers actionable insights
- Priority-based workflow management
- Context-aware recommendations

## Mock Data Structure

The application includes comprehensive mock data representing:
- **3 Regulatory Documents** with 6+ detailed clauses
- **12 Monitoring Rules** with realistic performance metrics
- **System Alerts** covering all major alert types
- **Analyst Capacity** modeling with ROI calculations
- **Evidence Tracking** with quality assessments

## Future Enhancements

- Integration with real AML transaction monitoring systems
- Advanced analytics and trend analysis
- Workflow management for alert resolution
- Multi-jurisdiction regulatory framework expansion
- API integration for live rule performance data

---

**Built for Risk Managers who need to maintain continuous audit readiness while optimizing AML compliance programs.**