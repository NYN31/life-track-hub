import { useEffect, useState } from 'react';
import {
  SearchDateRange,
  SearchField,
  SelectDropdown,
} from '../../types/common';

export const useResetEnable = ({
  textFields,
  dateFields,
  selectDropdowns,
}: {
  textFields?: SearchField[];
  dateFields?: SearchDateRange[];
  selectDropdowns?: SelectDropdown[];
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
    selectDropdowns?.map(dropdown => {
      if (dropdown?.option) {
        setIsResetEnable(true);
      }
    });
  }, [textFields, dateFields, selectDropdowns]);
  return isResetEnable;
};
