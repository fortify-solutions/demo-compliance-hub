// Document Service - Regulatory Documents Data Management
import { regulatoryDocuments as rawDocuments } from '../mockData';

export class DocumentService {
  constructor() {
    this.documents = rawDocuments;
    this.cache = new Map();
  }

  // Get all documents
  getAllDocuments() {
    return this.documents;
  }

  // Get document by ID
  getDocumentById(id) {
    if (this.cache.has(`doc_${id}`)) {
      return this.cache.get(`doc_${id}`);
    }

    const document = this.documents.find(doc => doc.id === id);
    if (document) {
      this.cache.set(`doc_${id}`, document);
    }
    return document;
  }

  // Get documents by jurisdiction
  getDocumentsByJurisdiction(jurisdiction) {
    const cacheKey = `jurisdiction_${jurisdiction}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const filtered = this.documents.filter(doc =>
      doc.jurisdiction === jurisdiction
    );
    this.cache.set(cacheKey, filtered);
    return filtered;
  }

  // Get clause by ID from any document
  getClauseById(clauseId) {
    const cacheKey = `clause_${clauseId}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    for (const document of this.documents) {
      const clause = document.clauses.find(c => c.id === clauseId);
      if (clause) {
        this.cache.set(cacheKey, { clause, document });
        return { clause, document };
      }
    }
    return null;
  }

  // Filter clauses across all documents
  filterClauses(filters = {}) {
    const { jurisdiction, productType, customerType, searchTerm } = filters;
    let results = [];

    for (const document of this.documents) {
      const filteredClauses = document.clauses.filter(clause => {
        // Jurisdiction filter
        if (jurisdiction && !clause.metadata.jurisdiction.includes(jurisdiction)) {
          return false;
        }

        // Product type filter
        if (productType && !clause.metadata.productType.includes(productType)) {
          return false;
        }

        // Customer type filter
        if (customerType && !clause.metadata.customerType.includes(customerType)) {
          return false;
        }

        // Search term filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return clause.title.toLowerCase().includes(searchLower) ||
                 clause.text.toLowerCase().includes(searchLower) ||
                 clause.reference.toLowerCase().includes(searchLower);
        }

        return true;
      });

      results = results.concat(
        filteredClauses.map(clause => ({
          clause,
          document: {
            id: document.id,
            title: document.title,
            jurisdiction: document.jurisdiction
          }
        }))
      );
    }

    return results;
  }

  // Get compliance statistics
  getComplianceStats() {
    let totalClauses = 0;
    const jurisdictionStats = {};
    const riskStats = { critical: 0, high: 0, medium: 0, low: 0 };
    let totalRules = 0;

    for (const document of this.documents) {
      document.clauses.forEach(clause => {
        totalClauses++;
        totalRules += clause.linkedRules ? clause.linkedRules.length : 0;

        // Jurisdiction stats
        clause.metadata.jurisdiction.forEach(jurisdiction => {
          jurisdictionStats[jurisdiction] = (jurisdictionStats[jurisdiction] || 0) + 1;
        });

        // Risk level stats
        riskStats[clause.metadata.riskLevel]++;
      });
    }

    return {
      totalClauses,
      totalRules,
      jurisdictionStats,
      riskStats,
      documentCount: this.documents.length
    };
  }

  // Search functionality
  search(query, options = {}) {
    const { limit = 50, includeDocument = true } = options;
    const searchTerm = query.toLowerCase();
    const results = [];

    for (const document of this.documents) {
      for (const clause of document.clauses) {
        const score = this.calculateRelevanceScore(clause, searchTerm);
        if (score > 0) {
          results.push({
            clause,
            document: includeDocument ? document : { id: document.id, title: document.title },
            relevanceScore: score
          });
        }
      }
    }

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  // Private helper for search relevance
  calculateRelevanceScore(clause, searchTerm) {
    let score = 0;

    // Title match (highest weight)
    if (clause.title.toLowerCase().includes(searchTerm)) {
      score += 100;
    }

    // Reference match
    if (clause.reference.toLowerCase().includes(searchTerm)) {
      score += 80;
    }

    // Text content match
    if (clause.text.toLowerCase().includes(searchTerm)) {
      score += 50;
    }

    // Metadata matches
    if (clause.metadata.jurisdiction.some(j => j.toLowerCase().includes(searchTerm))) {
      score += 30;
    }

    if (clause.metadata.productType.some(p => p.toLowerCase().includes(searchTerm))) {
      score += 20;
    }

    return score;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
export const documentService = new DocumentService();