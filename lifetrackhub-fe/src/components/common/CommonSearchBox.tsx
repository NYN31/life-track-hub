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
import { getCustomSelectStyles } from '../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../helper/hooks/useDarkMode';

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
  const isDark = useDarkMode();

  const isSearchButtonEnable = useSearchEnable({
    textFields,
    dateFields,
    selectDropdowns,
  });
  const isResetButtonEnable = useResetEnable({
    textFields,
    dateFields,
    selectDropdowns,
  });

  const { control, reset } = useForm();

  return (
    <div className="w-full mb-3 md:mb-4">
      <div className="common-box flex flex-wrap gap-2 lg:gap-2 items-end">
        {/* Text Inputs */}
        {textFields?.map((item, index) => (
          <div key={index} className="flex flex-col w-full lg:w-[220px]">
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
                  className="w-full h-[47px] px-3 py-2 border border-purple-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                />
              )}
            />
          </div>
        ))}

        {/* Date Range Pickers */}
        {dateFields?.map((item, index) => (
          <div key={index} className="flex flex-col w-full lg:w-[220px]">
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
                  className="w-full h-[47px] px-3 py-2 border border-purple-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                />
              )}
            />
          </div>
        ))}

        {/* Select Dropdowns */}
        {selectDropdowns?.map(item => (
          <div key={item.name} className="flex flex-col w-full lg:w-[220px]">
            <Controller
              name={item.name}
              control={control}
              defaultValue={item?.option?.value && item.option}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={item.name}
                  options={item.options}
                  onChange={selected => {
                    field.onChange(selected);
                    item.setOption(selected);
                  }}
                  classNamePrefix="react-select"
                  className="text-sm react-select-container dark:react-select-dark"
                  styles={getCustomSelectStyles(isDark)}
                />
              )}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 mt-4 items-start justify-between w-full lg:w-auto">
          <button
            type="button"
            disabled={!isSearchButtonEnable}
            onClick={() => handleSearch()}
            className="h-[45px] px-6 py-2 order-2 lg:order-1 rounded-lg bg-gradient-to-r from-purple-400 to-purple-300 text-white font-semibold shadow hover:from-purple-700 hover:to-purple-600 transition text-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
            className="h-[45px] px-6 py-2 order-1 lg:order-2 rounded-lg border border-gray-400 text-gray-600 bg-white font-semibold shadow hover:bg-gray-100 transition text-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonSearchBox;
