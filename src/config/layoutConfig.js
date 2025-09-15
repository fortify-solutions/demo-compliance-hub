// Layout Configuration System
// Defines configurable panel layouts and responsive behavior

export const PANEL_POSITIONS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  OVERLAY: 'overlay'
};

export const PANEL_SIZES = {
  NARROW: '320px',
  MEDIUM: '384px',
  WIDE: '480px',
  FLEXIBLE: 'flex-1'
};

export const DEFAULT_LAYOUT_CONFIG = {
  panels: [
    {
      id: 'document-tree',
      position: PANEL_POSITIONS.LEFT,
      width: PANEL_SIZES.NARROW,
      component: 'DocumentTree',
      collapsible: true,
      defaultCollapsed: false,
      ariaLabel: 'Regulatory document navigation'
    },
    {
      id: 'clause-content',
      position: PANEL_POSITIONS.CENTER,
      width: PANEL_SIZES.FLEXIBLE,
      component: 'ClauseContent',
      collapsible: false,
      ariaLabel: 'Clause content and details'
    },
    {
      id: 'alerts-panel',
      position: PANEL_POSITIONS.RIGHT,
      width: PANEL_SIZES.MEDIUM,
      component: 'AlertsPanel',
      collapsible: true,
      defaultCollapsed: false,
      ariaLabel: 'System alerts and recommendations'
    }
  ],
  overlays: [
    {
      id: 'capacity-modal',
      component: 'CapacityModal',
      modalStyle: 'centered'
    },
    {
      id: 'rule-coverage-panel',
      component: 'RuleCoveragePanel',
      modalStyle: 'slide-right'
    }
  ],
  responsive: {
    breakpoints: {
      mobile: 768,
      tablet: 1024
    },
    mobileLayout: {
      stacked: true,
      collapsedByDefault: ['document-tree', 'alerts-panel']
    }
  }
};

export const createLayoutConfig = (customConfig = {}) => {
  return {
    ...DEFAULT_LAYOUT_CONFIG,
    ...customConfig,
    panels: customConfig.panels || DEFAULT_LAYOUT_CONFIG.panels,
    overlays: customConfig.overlays || DEFAULT_LAYOUT_CONFIG.overlays
  };
};

export const getPanelClassName = (panel, isCollapsed = false) => {
  const baseClasses = [];

  // Position-based classes
  switch (panel.position) {
    case PANEL_POSITIONS.LEFT:
      baseClasses.push('bg-white border-r border-gray-200');
      break;
    case PANEL_POSITIONS.CENTER:
      baseClasses.push('bg-white');
      break;
    case PANEL_POSITIONS.RIGHT:
      baseClasses.push('bg-gray-50 border-l border-gray-200');
      break;
  }

  // Common panel classes
  baseClasses.push('overflow-y-auto');

  // Collapsed state
  if (isCollapsed) {
    baseClasses.push('hidden md:block w-12');
  } else if (panel.width === PANEL_SIZES.FLEXIBLE) {
    baseClasses.push('flex-1');
  } else {
    baseClasses.push(`w-${panel.width}`);
  }

  return baseClasses.join(' ');
};