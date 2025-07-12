import React from 'react';
import DatePicker from 'react-datepicker';
import {
  SearchDateRange,
  SearchField,
  SelectDropdown,
} from '../../types/common';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useSearchEnable } from '../../helper/hooks/useSearchEnable';
import { useResetEnable } from '../../helper/hooks/useResetEnable';

const CommonSearchBox: React.FC<{
  textFields?: SearchField[];
  dateFields?: SearchDateRange[];
  selectDropdowns?: SelectDropdown[];
  mandatoryFields?: string[];
  handleSearch: () => void;
  handleReset: () => void;
}> = ({
  textFields,
  dateFields,
  selectDropdowns,
  handleSearch,
  handleReset,
}) => {
  const isSearchButtonEnable = useSearchEnable({ textFields, dateFields });
  const isResetButtonEnable = useResetEnable({ textFields, dateFields });

  const { control, reset } = useForm();

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="bg-white border border-purple-200 rounded-xl shadow-md p-6 flex flex-wrap gap-6 items-end">
        {/* Text Inputs */}
        {textFields?.map((item, index) => (
          <div key={index} className="flex flex-col w-[220px]">
            <label className="mb-1 font-semibold text-gray-700 text-sm">
              {item.name}
            </label>
            <Controller
              name={item.name}
              control={control}
              defaultValue={item.value}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={e => {
                    const val = item.isTrim
                      ? e.target.value.trim()
                      : e.target.value;
                    field.onChange(val);
                    item.setValue(val);
                  }}
                  placeholder={item.name}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm text-sm bg-white"
                />
              )}
            />
          </div>
        ))}

        {/* Date Range Pickers */}
        {dateFields?.map((item, index) => (
          <div key={index} className="flex flex-col w-[220px]">
            <label className="mb-1 font-semibold text-gray-700 text-sm">
              {item.name}
            </label>
            <Controller
              name={item.name}
              control={control}
              defaultValue={item.date}
              render={({ field }) => (
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selectsRange={true}
                  isClearable={true}
                  placeholderText={item.name}
                  startDate={item.date[0]}
                  endDate={item.date[1]}
                  onChange={([startDate, endDate]) => {
                    field.onChange([startDate, endDate]);
                    item.setDateRange([startDate, endDate]);
                  }}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm text-sm bg-white"
                />
              )}
            />
          </div>
        ))}

        {/* Select Dropdowns */}
        {selectDropdowns?.map(item => (
          <div key={item.name} className="flex flex-col w-[220px]">
            <label className="mb-1 font-semibold text-gray-700 text-sm">
              {item.name}
            </label>
            <Controller
              name={item.name}
              control={control}
              defaultValue={item.option}
              render={({ field }) => (
                <Select
                  {...field}
                  options={item.options}
                  onChange={selected => {
                    field.onChange(selected);
                    item.setOption(selected);
                  }}
                  placeholder={item.name}
                  classNamePrefix="react-select"
                  className="text-sm"
                  styles={{
                    control: base => ({
                      ...base,
                      borderColor: '#a78bfa',
                      boxShadow: 'none',
                      '&:hover': { borderColor: '#7c3aed' },
                    }),
                  }}
                />
              )}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            disabled={!isSearchButtonEnable}
            onClick={() => handleSearch()}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-300 text-white font-semibold shadow hover:from-purple-700 hover:to-purple-600 transition text-sm disabled:bg-gray-300 disabled:text-gray-500"
          >
            Search
          </button>
          <button
            type="button"
            disabled={!isResetButtonEnable}
            onClick={() => {
              reset();
              handleReset();
            }}
            className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 bg-white font-semibold shadow hover:bg-gray-100 transition text-sm disabled:bg-gray-200 disabled:text-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonSearchBox;
