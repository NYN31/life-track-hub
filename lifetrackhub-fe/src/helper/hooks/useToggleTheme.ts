import { useEffect, useState } from 'react';
import { getInitialTheme, THEME_KEY } from '../utils/get-initial-theme';

export default function useToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    getInitialTheme() as 'light' | 'dark'
  );

  // Apply theme to html element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
