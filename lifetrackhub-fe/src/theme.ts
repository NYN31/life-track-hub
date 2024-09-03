import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';
import { colors } from './constants/extend-theme/colors';
import { fontSizes } from './constants/extend-theme/font-sizes';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Roboto, sans-serif',
  },
  fontSizes: fontSizes,
  colors: colors,
});

export default theme;
