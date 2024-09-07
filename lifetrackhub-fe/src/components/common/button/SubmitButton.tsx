import { Button } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../../constants/extend-theme/colors';
import { SubmitionButton } from './type';

const SubmitButton: React.FC<SubmitionButton> = ({
  text,
  width,
  type,
  cursor,
  isDisable,
  isLoading = false,
}) => {
  return (
    <Button
      w={width}
      type={type}
      bg="btn.bg"
      color="btn.text"
      cursor={cursor}
      isDisabled={isDisable}
      isLoading={isLoading}
      _disabled={{
        bg: `${colors.btn.bg_disable} !important`,
        color: `${colors.btn.text_disable} !important`,
      }}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
