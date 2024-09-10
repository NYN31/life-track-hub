import { deepPink } from './color-files/deepPink';
import { whiteColor } from './color-files/default';

export const DEFAULT = 'default';
export const DEEP_PINK = 'deepPink';

export const APP_COLOR_KEY = 'appColor';

export const colors = () => {
  const appColor = localStorage.getItem(APP_COLOR_KEY) || DEFAULT;
  localStorage.setItem(APP_COLOR_KEY, appColor);

  if (appColor === DEFAULT) return whiteColor;
  else if (appColor === DEEP_PINK) return deepPink;
  else return whiteColor;
};
