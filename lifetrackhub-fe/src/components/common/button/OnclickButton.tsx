import { Button } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../../constants/extend-theme/colors';
import { ClickButton } from '../../../types/button';

const OnclickButton: React.FC<ClickButton> = ({
  color,
  text,
  width,
  cursor,
  isDisable,
  isLoading = false,
  action,
  borderRadius,
}) => {
  return (
    <Button
      w={width}
      bg={color}
      color="btn.text"
      borderRadius={borderRadius || '8px'}
      fontWeight={500}
      cursor={cursor}
      isDisabled={isDisable}
      isLoading={isLoading}
      _disabled={{
        bg: `${colors().btn.bg_disable} !important`,
        color: `${colors().btn.text_disable} !important`,
      }}
      // _hover={{
      //   bg: `${color} !important`,
      //   color: `${colors().btn.text} !important`,
      // }}
      onClick={action}
    >
      {text}
    </Button>
  );
};

export default OnclickButton;
