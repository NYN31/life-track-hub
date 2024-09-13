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
}) => {
  return (
    <Button
      w={width}
      bg={color ? color : 'btn.bg'}
      color="btn.text"
      borderRadius={0}
      fontWeight={500}
      cursor={cursor}
      isDisabled={isDisable}
      isLoading={isLoading}
      _disabled={{
        bg: `${colors().btn.bg_disable} !important`,
        color: `${colors().btn.text_disable} !important`,
      }}
      onClick={action}
    >
      {text}
    </Button>
  );
};

export default OnclickButton;
