import { blueColor } from './color-files/blue';
import { greenColor } from './color-files/green';
import { orangeColor } from './color-files/orange';
import { pinkColor } from './color-files/pink';
import { purpleColor } from './color-files/purple';

export const PINK = 'pink';
export const BLUE = 'blue';
export const PURPLE = 'purple';
export const ORANGE = 'orange';
export const GREEN = 'green';

export const APP_COLOR_KEY = 'appColor';

export const colors = () => {
  const appColor = localStorage.getItem(APP_COLOR_KEY) || PURPLE;
  localStorage.setItem(APP_COLOR_KEY, appColor);

  if (appColor === PINK) return pinkColor;
  else if (appColor === BLUE) return blueColor;
  else if (appColor === PURPLE) return purpleColor;
  else if (appColor === ORANGE) return orangeColor;
  else if (appColor === GREEN) return greenColor;
  else return purpleColor;
};
