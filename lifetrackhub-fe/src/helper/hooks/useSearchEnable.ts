import { useEffect, useState } from 'react';
import {
  SearchDateRange,
  SearchField,
  SelectDropdown,
} from '../../types/common';

export const useSearchEnable = ({
  textFields,
  dateFields,
  selectDropdowns,
}: {
  textFields?: SearchField[];
  dateFields?: SearchDateRange[];
  selectDropdowns?: SelectDropdown[];
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
    selectDropdowns?.map(dropdown => {
      if (dropdown.isMandatory) {
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
      selectDropdowns?.map(dropDown => {
        if (dropDown.isMandatory && !dropDown.option) {
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
      selectDropdowns?.map(dropdown => {
        if (dropdown?.option) {
          isEnable = true;
        }
      });
      if (isEnable) {
        setIsSearchEnable(true);
      }
    }
  }, [textFields, dateFields, selectDropdowns]);
  return isSearchEnable;
};
