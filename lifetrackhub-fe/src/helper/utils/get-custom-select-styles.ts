const FIELD_BG_COLOR = '#ffffff';
const FIELD_DARK_BG_COLOR = '#111827';
const gray_700 = '#424242';
const purple_200 = '#e9d5ff';
const purple_400 = '#b794f4';
const purple_600 = '#9333ea';

export const getCustomSelectStyles = (isDark: boolean) => {
  return {
    container: (base: any) => ({
      ...base,
      width: '100%',
      minWidth: 0,
    }),
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '47px',
      height: '47px',
      borderRadius: '8px',
      borderColor: state.isFocused
        ? isDark
          ? purple_600
          : purple_400
        : isDark
        ? gray_700
        : purple_200,
      backgroundColor: isDark ? FIELD_DARK_BG_COLOR : FIELD_BG_COLOR,
      boxShadow: state.isFocused
        ? `0 0 0 2px ${isDark ? '#7C3AED40' : '#C084FC40'}` // optional glow
        : 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? isDark
            ? purple_600
            : purple_200
          : isDark
          ? gray_700
          : purple_200,
      },
    }),

    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      width: '100%',
      zIndex: 100, // Ensure the menu appears above other elements
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#969bab' : '#e5e7eb',
      color: '#111827',
      padding: '2px 6px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? '#f3f4f6' : '#1f2937', // text color
      fontWeight: 500,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? '#374151' // hover bg in dark
          : '#f3f4f6' // hover bg in light
        : isDark
        ? '#1f2937' // default bg in dark
        : '#fff', // default bg in light
      color: isDark ? '#f9fafb' : '#111827',
      cursor: 'pointer',
    }),
  };
};
