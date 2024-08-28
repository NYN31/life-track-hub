import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Roboto, sans-serif',
  },
});

export default theme;
