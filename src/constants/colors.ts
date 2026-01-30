// Premium color scheme with gradients
export const colors = {
  primary: '#6366F1', // Indigo
  secondary: '#8B5CF6', // Purple
  accent: '#EC4899', // Pink
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  
  // Gradient colors
  gradientStart: '#667EEA',
  gradientMiddle: '#764BA2',
  gradientEnd: '#F093FB',
  
  // Alternative gradient sets
  gradient2Start: '#FA709A',
  gradient2End: '#FEE140',
  
  gradient3Start: '#30CFD0',
  gradient3End: '#330867',
  
  // Background colors
  background: '#0F172A', // Dark blue-gray
  backgroundLight: '#1E293B',
  backgroundCard: '#1E293B',
  
  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  
  // Border colors
  border: '#334155',
  borderLight: '#475569',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Glass morphism
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
};

export const gradients = {
  primary: [colors.gradientStart, colors.gradientMiddle, colors.gradientEnd],
  secondary: [colors.gradient2Start, colors.gradient2End],
  dark: [colors.gradient3Start, colors.gradient3End],
  success: ['#11998E', '#38EF7D'],
  error: ['#FF0844', '#FF3D77'],
  wingo: ['#FFB75E', '#ED8F03'],
};
