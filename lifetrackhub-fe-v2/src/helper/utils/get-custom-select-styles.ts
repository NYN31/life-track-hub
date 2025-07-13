const FIELD_BORDER_COLOR = '#7c3aed';
const FIELD_BG_COLOR = '#ffffff';
const FIELD_DARK_BG_COLOR = '#111827';

export const getCustomSelectStyles = (isDark: boolean) => {
  return {
    control: (base: any) => ({
      ...base,
      borderRadius: '8px',
      borderColor: FIELD_BORDER_COLOR,
      backgroundColor: isDark ? FIELD_DARK_BG_COLOR : FIELD_BG_COLOR,
      boxShadow: 'none',
      '&:hover': { borderColor: FIELD_BORDER_COLOR },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      color: isDark ? '#f3f4f6' : '#1f2937',
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
