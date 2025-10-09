import React from 'react';
import Select from 'react-select';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { OptionType } from '../../../types/common';
import { getCustomSelectStyles } from '../../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../../helper/hooks/useDarkMode';

interface SimpleSelectFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: OptionType;
  options: OptionType[];
  required?: boolean;
  error?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  trigger?: UseFormTrigger<any>;
}

const SimpleSelectField: React.FC<SimpleSelectFieldProps> = ({
  id,
  name,
  label,
  defaultValue,
  options,
  required = false,
  error,
  placeholder,
  register,
  setValue,
  trigger,
}) => {
  const isDark = useDarkMode();

  // Register the field
  register(name);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        id={id}
        defaultValue={defaultValue}
        options={options}
        onChange={selected => {
          setValue(name, selected, { shouldDirty: true, shouldTouch: true });
          trigger?.(name);
        }}
        placeholder={placeholder || `Select ${label}`}
        classNamePrefix="react-select"
        className="text-sm react-select-container dark:react-select-dark"
        styles={getCustomSelectStyles(isDark)}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  );
};

export default SimpleSelectField;
