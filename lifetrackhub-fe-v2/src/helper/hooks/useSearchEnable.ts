import { useEffect, useState } from 'react';
import { SearchDateRange, SearchField } from '../../types/common';

export const useSearchEnable = ({
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
