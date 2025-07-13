export const THEME_KEY = 'theme';

export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';
  }
  return 'light';
};