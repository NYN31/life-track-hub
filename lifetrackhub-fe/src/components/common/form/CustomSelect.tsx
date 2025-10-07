import React from 'react';
import { getCustomSelectStyles } from '../../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../../helper/hooks/useDarkMode';
import { OptionType } from '../../../types/common';
import Select from 'react-select';

interface CustomSelectProps {
  label: string;
  value: OptionType | null;
  options: OptionType[];
  onChangeAction: (option: OptionType | null) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChangeAction,
}) => {
  const isDark = useDarkMode();

  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <Select
        value={value}
        onChange={onChangeAction}
        options={options}
        classNamePrefix="react-select"
        className="text-sm react-select-container dark:react-select-dark"
        styles={getCustomSelectStyles(isDark)}
      />
    </>
  );
};

export default CustomSelect;
