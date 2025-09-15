// Centralized Event Bus System
// Manages application-wide events and cross-component communication

class EventBus {
  constructor() {
    this.events = new Map();
  }

  // Subscribe to an event
  on(eventType, callback) {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }

    this.events.get(eventType).push(callback);

    // Return unsubscribe function
    return () => {
      this.off(eventType, callback);
    };
  }

  // Unsubscribe from an event
  off(eventType, callback) {
    const callbacks = this.events.get(eventType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Emit an event
  emit(eventType, data = null) {
    const callbacks = this.events.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event callback for ${eventType}:`, error);
        }
      });
    }
  }

  // Clear all listeners for an event type
  clear(eventType) {
    if (eventType) {
      this.events.delete(eventType);
    } else {
      this.events.clear();
    }
  }

  // Get listener count for debugging
  getListenerCount(eventType) {
    const callbacks = this.events.get(eventType);
    return callbacks ? callbacks.length : 0;
  }
}

// Create singleton instance
export const eventBus = new EventBus();

// Application Event Types
export const APP_EVENTS = {
  // Document/Clause Navigation
  DOCUMENT_SELECTED: 'document:selected',
  CLAUSE_SELECTED: 'clause:selected',
  CLAUSE_UPDATED: 'clause:updated',

  // Rule Analysis
  RULE_SELECTED: 'rule:selected',
  RULE_COVERAGE_REQUESTED: 'rule:coverage_requested',

  // Filtering and Search
  FILTERS_CHANGED: 'filters:changed',
  FILTERS_RESET: 'filters:reset',
  SEARCH_PERFORMED: 'search:performed',

  // Alerts and Notifications
  ALERT_TRIGGERED: 'alert:triggered',
  ALERT_DISMISSED: 'alert:dismissed',
  NOTIFICATION_SHOWN: 'notification:shown',

  // Modal Management
  MODAL_OPENED: 'modal:opened',
  MODAL_CLOSED: 'modal:closed',
  PANEL_TOGGLED: 'panel:toggled',

  // Data Updates
  DATA_REFRESHED: 'data:refreshed',
  DATA_ERROR: 'data:error',

  // Analytics and Tracking
  USER_ACTION: 'analytics:user_action',
  PERFORMANCE_METRIC: 'analytics:performance'
};

// Convenience functions for common events
export const emitDocumentSelected = (document) => {
  eventBus.emit(APP_EVENTS.DOCUMENT_SELECTED, { document });
};

export const emitClauseSelected = (clause) => {
  eventBus.emit(APP_EVENTS.CLAUSE_SELECTED, { clause });
};

export const emitRuleSelected = (rule) => {
  eventBus.emit(APP_EVENTS.RULE_SELECTED, { rule });
};

export const emitFiltersChanged = (filters) => {
  eventBus.emit(APP_EVENTS.FILTERS_CHANGED, { filters });
};

export const emitUserAction = (action, context = {}) => {
  eventBus.emit(APP_EVENTS.USER_ACTION, { action, context, timestamp: Date.now() });
};

// React Hook for using event bus in components
import { useEffect, useCallback } from 'react';

export const useEventBus = (eventType, callback, dependencies = []) => {
  const stableCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const unsubscribe = eventBus.on(eventType, stableCallback);
    return unsubscribe;
  }, [eventType, stableCallback]);
};

// Hook for emitting events with analytics tracking
export const useEventEmitter = () => {
  return useCallback((eventType, data, trackAnalytics = false) => {
    eventBus.emit(eventType, data);

    if (trackAnalytics) {
      emitUserAction(eventType, data);
    }
  }, []);
};

// Debug utilities
export const debugEventBus = () => {
  console.log('Event Bus State:', {
    registeredEvents: Array.from(eventBus.events.keys()),
    listenerCounts: Array.from(eventBus.events.entries()).map(([event, callbacks]) => ({
      event,
      listenerCount: callbacks.length
    }))
  });
};