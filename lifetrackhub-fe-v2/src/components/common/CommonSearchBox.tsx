import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  SearchDateRange,
  SearchField,
  SelectDropdown,
} from '../../types/common';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

const useResetEnabled = ({
  textFields,
  dateFields,
}: {
  textFields?: SearchField[];
  dateFields?: SearchDateRange[];
}) => {
  const [isResetEnable, setIsResetEnable] = useState(false);
  useEffect(() => {
    setIsResetEnable(false);
    textFields?.map(field => {
      if (field.value) {
        setIsResetEnable(true);
      }
    });
    dateFields?.map(dateField => {
      if (dateField.date[0] && dateField.date[1]) {
        setIsResetEnable(true);
      }
    });
  }, [textFields, dateFields]);
  return isResetEnable;
};

const useSearchEnabled = ({
  textFields,
  dateFields,
}: {
  textFields?: SearchField[];
  dateFields?: SearchDateRange[];
}) => {
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  useEffect(() => {
    setIsSearchEnable(false);
    let hasMandatoryFields = false;
    let isEnable = true;
    textFields?.map(field => {
      if (field.isMandatory) {
        hasMandatoryFields = true;
      }
    });
    dateFields?.map(dateField => {
      if (dateField.isMandatory) {
        hasMandatoryFields = true;
      }
    });

    if (hasMandatoryFields) {
      textFields?.map(field => {
        if (field.isMandatory && !field.value) {
          isEnable = false;
        }
      });
      dateFields?.map(dateField => {
        if (
          dateField.isMandatory &&
          (!dateField.date[0] || !dateField.date[1])
        ) {
          isEnable = false;
        }
      });
      if (isEnable) {
        setIsSearchEnable(true);
      }
    } else {
      isEnable = false;
      textFields?.map(field => {
        if (field.value) {
          isEnable = true;
        }
      });
      dateFields?.map(dateField => {
        if (dateField.date[0] && dateField.date[1]) {
          isEnable = true;
        }
      });
      if (isEnable) {
        setIsSearchEnable(true);
      }
    }
  }, [textFields, dateFields]);
  return isSearchEnable;
};
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
  console.log(textFields, dateFields);
  const isSearchButtonEnable = useSearchEnabled({ textFields, dateFields });
  const isResetButtonEnable = useResetEnabled({ textFields, dateFields });

  const { control, reset } = useForm();

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6 w-full">
      {/* Text Inputs */}
      {textFields?.map((item, index) => (
        <div key={index} className="w-[220px]">
          <label className="block text-sm font-medium mb-1">{item.name}</label>
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
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            )}
          />
        </div>
      ))}

      {/* Date Range Pickers */}
      {dateFields?.map((item, index) => (
        <div key={index} className="w-[220px]">
          <label className="block text-sm font-medium mb-1">{item.name}</label>
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
                // onChangeRaw={(e: any) => {
                //   const regex =
                //     /^(\\d{4}-\\d{2}-\\d{2})\\s*-\\s*(\\d{4}-\\d{2}-\\d{2})$/;
                //   const match = e.target.value.match(regex);
                //   if (e.targe.value && e.type !== 'onChange' && match) {
                //     field.onChange([new Date(match[1]), new Date(match[2])]);
                //     item.setDateRange([new Date(match[1]), new Date(match[2])]);
                //   }
                // }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            )}
          />
        </div>
      ))}

      {/* Select Dropdowns */}
      {selectDropdowns?.map(item => (
        <div key={item.name} className="w-[220px]">
          <label className="block text-sm font-medium mb-1">{item.name}</label>
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
                className="text-sm"
              />
            )}
          />
        </div>
      ))}

      {/* Buttons */}
      <button
        type="button"
        disabled={!isSearchButtonEnable}
        onClick={() => handleSearch()}
        className="w-[180px] px-4 py-2 rounded border border-teal-500 text-teal-600 hover:bg-teal-100 text-sm disabled:opacity-50"
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
        className="w-[180px] px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100 text-sm disabled:opacity-50"
      >
        Reset
      </button>
    </div>
  );
};

export default CommonSearchBox;
