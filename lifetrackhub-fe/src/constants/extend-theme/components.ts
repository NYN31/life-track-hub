export const Components = {
  Checkbox: {
    baseStyle: {
      control: {
        _checked: {
          bg: 'icon',
          borderColor: 'icon',
          _hover: {
            bg: 'icon',
            borderColor: 'icon',
          },
        },
      },
    },
  },
  Input: {
    defaultProps: {
      variant: 'none',
      // Set your desired variant here ('none', 'outline', 'filled', 'flushed', 'unstyled')
    },
  },
  Textarea: {
    defaultProps: {
      variant: 'none',
      // Set your desired variant here ('none', 'outline', 'filled', 'flushed', 'unstyled')
    },
  },
};
