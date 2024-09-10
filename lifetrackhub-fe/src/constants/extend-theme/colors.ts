import { blueColor } from './color-files/blue';
import { deepPinkColor } from './color-files/deepPink';
import { whiteColor } from './color-files/default';

export const DEFAULT = 'default';
export const DEEP_PINK = 'deepPink';
export const BLUE = 'blue';

export const APP_COLOR_KEY = 'appColor';

export const colors = () => {
  const appColor = localStorage.getItem(APP_COLOR_KEY) || DEFAULT;
  localStorage.setItem(APP_COLOR_KEY, appColor);

  if (appColor === DEFAULT) return whiteColor;
  else if (appColor === DEEP_PINK) return deepPinkColor;
  else if (appColor === BLUE) return blueColor;
  else return whiteColor;
};
