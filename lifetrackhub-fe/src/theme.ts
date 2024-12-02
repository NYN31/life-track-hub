import '@fontsource/roboto';
import { colors } from './constants/extend-theme/colors';
import { fontSizes } from './constants/extend-theme/font-sizes';
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Open Sans, sans-serif' },
        body: { value: 'Roboto, sans-serif' },
      },
      colors: colors(),
      fontSizes: fontSizes,
    },
  },
});

export const system = createSystem(defaultConfig, config);
