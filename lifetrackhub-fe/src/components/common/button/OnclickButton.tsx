import React from 'react';
import { colors } from '../../../constants/extend-theme/colors';
import { ClickButton } from '../../../types/button';
import { Button } from '../../ui/button';

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
      disabled={isDisable}
      loading={isLoading}
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
