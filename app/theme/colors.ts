/** Dark theme tokens — kid-friendly accents on deep backgrounds */
export const colors = {
  bgDeep: '#07060f',
  bgCard: '#12101c',
  bgElevated: '#1a1628',
  textPrimary: '#f8fafc',
  textSecondary: '#a5b4c1',
  textMuted: '#64748b',
  accentViolet: '#a78bfa',
  accentPink: '#f472b6',
  accentCyan: '#22d3ee',
  accentAmber: '#fbbf24',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#fb7185',
  borderSubtle: 'rgba(167, 139, 250, 0.35)',
  borderGlass: 'rgba(255, 255, 255, 0.12)',
  inputBg: 'rgba(15, 12, 30, 0.85)',
} as const;

export const gradients = {
  home: ['#0a0618', '#1a0f3c', '#2d1b69', '#0f172a'] as const,
  game: ['#040814', '#0f1c2e', '#1e3a5f', '#0c1929'] as const,
  feedback: ['#050a12', '#0f1f2e', '#134e4a', '#0a1628'] as const,
  buttonPrimary: ['#7c3aed', '#6366f1', '#4f46e5'] as const,
  buttonMic: ['#db2777', '#ea580c', '#f59e0b'] as const,
  cardBorder: ['#c084fc', '#818cf8', '#22d3ee'] as const,
} as const;
