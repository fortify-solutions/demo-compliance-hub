// Alert Service - System Alerts and Notifications Management
import { alerts as rawAlerts } from '../mockData';

export class AlertService {
  constructor() {
    this.alerts = rawAlerts;
    this.dismissedAlerts = new Set();
    this.alertSubscribers = new Set();
  }

  // Get all alerts with optional filtering
  getAlerts(filters = {}) {
    let filteredAlerts = this.alerts.filter(alert =>
      !this.dismissedAlerts.has(alert.id)
    );

    // Filter by priority
    if (filters.priority) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.priority === filters.priority
      );
    }

    // Filter by type
    if (filters.type) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.type === filters.type
      );
    }

    // Filter by clause context
    if (filters.clauseId) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.context?.clauseId === filters.clauseId
      );
    }

    // Filter by document context
    if (filters.documentId) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.context?.documentId === filters.documentId
      );
    }

    return filteredAlerts.sort((a, b) => {
      // Sort by priority (high -> medium -> low), then by timestamp
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];

      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }

  // Get alerts for specific clause
  getAlertsForClause(clauseId) {
    return this.getAlerts({ clauseId });
  }

  // Get alert by ID
  getAlertById(id) {
    return this.alerts.find(alert => alert.id === id);
  }

  // Dismiss an alert
  dismissAlert(alertId) {
    this.dismissedAlerts.add(alertId);
    this.notifySubscribers('alert_dismissed', { alertId });
  }

  // Restore dismissed alert
  restoreAlert(alertId) {
    this.dismissedAlerts.delete(alertId);
    this.notifySubscribers('alert_restored', { alertId });
  }

  // Add new alert (for future real-time features)
  addAlert(alertData) {
    const newAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...alertData
    };

    this.alerts.unshift(newAlert);
    this.notifySubscribers('alert_added', { alert: newAlert });
    return newAlert;
  }

  // Get alert statistics
  getAlertStats() {
    const activeAlerts = this.alerts.filter(alert =>
      !this.dismissedAlerts.has(alert.id)
    );

    const stats = {
      total: activeAlerts.length,
      dismissed: this.dismissedAlerts.size,
      byPriority: {
        high: 0,
        medium: 0,
        low: 0
      },
      byType: {},
      recent: 0 // Alerts from last 24 hours
    };

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    activeAlerts.forEach(alert => {
      // Priority stats
      stats.byPriority[alert.priority]++;

      // Type stats
      stats.byType[alert.type] = (stats.byType[alert.type] || 0) + 1;

      // Recent alerts
      if (new Date(alert.timestamp) > oneDayAgo) {
        stats.recent++;
      }
    });

    return stats;
  }

  // Subscribe to alert changes
  subscribe(callback) {
    this.alertSubscribers.add(callback);

    // Return unsubscribe function
    return () => {
      this.alertSubscribers.delete(callback);
    };
  }

  // Notify subscribers of changes
  notifySubscribers(event, data) {
    this.alertSubscribers.forEach(callback => {
      try {
        callback({ event, data });
      } catch (error) {
        console.error('Error in alert subscriber:', error);
      }
    });
  }

  // Mark alerts as read/unread
  markAsRead(alertIds) {
    if (!Array.isArray(alertIds)) {
      alertIds = [alertIds];
    }

    alertIds.forEach(id => {
      const alert = this.getAlertById(id);
      if (alert) {
        alert.read = true;
      }
    });

    this.notifySubscribers('alerts_read', { alertIds });
  }

  // Get unread alert count
  getUnreadCount() {
    return this.alerts.filter(alert =>
      !this.dismissedAlerts.has(alert.id) && !alert.read
    ).length;
  }

  // Filter alerts by time range
  getAlertsInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return this.alerts.filter(alert => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= start && alertDate <= end;
    });
  }

  // Clear all dismissed alerts
  clearDismissed() {
    this.dismissedAlerts.clear();
    this.notifySubscribers('dismissed_cleared', {});
  }

  // Export alert data for reporting
  exportAlerts(format = 'json') {
    const activeAlerts = this.getAlerts();
    const stats = this.getAlertStats();

    const exportData = {
      exportDate: new Date().toISOString(),
      stats,
      alerts: activeAlerts
    };

    if (format === 'csv') {
      return this.convertToCsv(activeAlerts);
    }

    return exportData;
  }

  // Helper to convert alerts to CSV format
  convertToCsv(alerts) {
    const headers = ['ID', 'Type', 'Priority', 'Title', 'Message', 'Timestamp', 'Context'];
    const rows = alerts.map(alert => [
      alert.id,
      alert.type,
      alert.priority,
      alert.title,
      alert.message.replace(/"/g, '""'), // Escape quotes
      alert.timestamp,
      JSON.stringify(alert.context || {})
    ]);

    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
  }
}

// Export singleton instance
export const alertService = new AlertService();