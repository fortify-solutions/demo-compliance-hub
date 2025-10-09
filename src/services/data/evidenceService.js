// Evidence Service - Evidence Data Management
import { masterEvidenceList } from '../mockData';

export class EvidenceService {
  constructor() {
    this.evidenceMap = new Map();
    this.initializeEvidenceMap();
  }

  // Initialize evidence map for fast lookups
  initializeEvidenceMap() {
    masterEvidenceList.forEach(evidence => {
      this.evidenceMap.set(evidence.id, evidence);
    });
  }

  // Get evidence by ID
  getEvidenceById(id) {
    return this.evidenceMap.get(id);
  }

  // Get multiple evidence items by IDs
  getEvidenceByIds(ids) {
    if (!Array.isArray(ids)) {
      return [];
    }
    return ids
      .map(id => this.evidenceMap.get(id))
      .filter(evidence => evidence !== undefined);
  }

  // Get all evidence items
  getAllEvidence() {
    return masterEvidenceList;
  }

  // Get evidence by type
  getEvidenceByType(type) {
    return masterEvidenceList.filter(evidence => evidence.type === type);
  }

  // Get evidence by category
  getEvidenceByCategory(category) {
    return masterEvidenceList.filter(evidence =>
      evidence.category && evidence.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Get evidence statistics
  getEvidenceStats() {
    const stats = {
      total: masterEvidenceList.length,
      byType: {},
      byQuality: {},
      byCategory: {}
    };

    masterEvidenceList.forEach(evidence => {
      // Type stats
      stats.byType[evidence.type] = (stats.byType[evidence.type] || 0) + 1;

      // Quality stats
      stats.byQuality[evidence.quality] = (stats.byQuality[evidence.quality] || 0) + 1;

      // Category stats
      if (evidence.category) {
        stats.byCategory[evidence.category] = (stats.byCategory[evidence.category] || 0) + 1;
      }
    });

    return stats;
  }

  // Resolve clause evidence (convert linkedEvidence IDs to full evidence objects)
  resolveClauseEvidence(clause) {
    if (!clause) {
      return [];
    }

    // Handle new linkedEvidence format
    if (clause.linkedEvidence && Array.isArray(clause.linkedEvidence)) {
      return this.getEvidenceByIds(clause.linkedEvidence);
    }

    // Fallback: if clause still has old evidence format, return it
    if (clause.evidence && Array.isArray(clause.evidence)) {
      return clause.evidence;
    }

    return [];
  }

  // Get most recent evidence update date from a set of evidence IDs
  getMostRecentEvidenceDate(evidenceIds) {
    if (!Array.isArray(evidenceIds) || evidenceIds.length === 0) {
      return null;
    }

    const evidenceItems = this.getEvidenceByIds(evidenceIds);
    if (evidenceItems.length === 0) {
      return null;
    }

    const dates = evidenceItems
      .map(ev => ev.lastAdded ? new Date(ev.lastAdded) : null)
      .filter(date => date !== null);

    if (dates.length === 0) {
      return null;
    }

    return new Date(Math.max(...dates.map(d => d.getTime())));
  }

  // Filter evidence by quality
  filterByQuality(evidenceIds, minQuality = 'good') {
    const qualityOrder = { 'excellent': 3, 'good': 2, 'fair': 1 };
    const minQualityValue = qualityOrder[minQuality] || 0;

    return this.getEvidenceByIds(evidenceIds).filter(evidence => {
      const evidenceQualityValue = qualityOrder[evidence.quality] || 0;
      return evidenceQualityValue >= minQualityValue;
    });
  }
}

// Export singleton instance
export const evidenceService = new EvidenceService();
