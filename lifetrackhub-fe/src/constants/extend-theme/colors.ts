import { blueColor } from './color-files/blue';
import { pinkColor } from './color-files/pink';
import { whiteColor } from './color-files/default';
import { cyanColor } from './color-files/cyan';
import { purpleColor } from './color-files/purple';

export const DEFAULT = 'default';
export const PINK = 'pink';
export const BLUE = 'blue';
export const CYAN = 'cyan';
export const PURPLE = 'purple';

export const APP_COLOR_KEY = 'appColor';

export const colors = () => {
  const appColor = localStorage.getItem(APP_COLOR_KEY) || DEFAULT;
  localStorage.setItem(APP_COLOR_KEY, appColor);

  if (appColor === DEFAULT) return whiteColor;
  else if (appColor === PINK) return pinkColor;
  else if (appColor === BLUE) return blueColor;
  else if (appColor === CYAN) return cyanColor;
  else if (appColor === PURPLE) return purpleColor;
  else return whiteColor;
};
