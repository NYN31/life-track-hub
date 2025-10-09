import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: string;
  validation?: Object;
}

const SimpleInputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  register,
  error,
  validation,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        {...register(name, validation)}
        className="form-input-field"
        placeholder={placeholder}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  );
};

export default SimpleInputField;
