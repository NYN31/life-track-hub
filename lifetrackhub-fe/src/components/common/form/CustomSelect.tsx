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
    <div>
      {label && <label className="form-label">{label}</label>}
      <div className="w-full">
        <Select
          value={value}
          onChange={onChangeAction}
          options={options}
          classNamePrefix="react-select"
          className="text-sm react-select-container dark:react-select-dark"
          styles={getCustomSelectStyles(isDark)}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
