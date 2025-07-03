import { useEffect, useState } from 'react';
import { SearchDateRange, SearchField } from '../../types/common';

export const useResetEnable = ({
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
