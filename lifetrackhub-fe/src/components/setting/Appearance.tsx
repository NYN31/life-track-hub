import { Box, Flex, Heading, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  APP_COLOR_KEY,
  BLUE,
  ORANGE,
  PINK,
  PURPLE,
} from '../../constants/extend-theme/colors';
import { Radio } from '../ui/radio';

const Appearance = () => {
  const [value, setValue] = useState(
    localStorage.getItem(APP_COLOR_KEY) || PURPLE
  );

  const handleAppColor = () => {
    setValue(value);
    localStorage.setItem(APP_COLOR_KEY, value);
  };

  useEffect(() => {
    handleAppColor();
  }, [value]);

  return (
    <Flex direction={['column', 'column', 'column', 'row']} gap={[4, 4, 4, 16]}>
      <Box>
        <Heading as="h4">Accent Color</Heading>
        <Text color="gray.500">
          Choose the accent color and reload page for using throughout the app.
        </Text>
      </Box>

      {/* onChange={setValue} */}
      <RadioGroup.Root value={value}>
        <Stack direction={['column', 'column', 'row']}>
          <Radio colorScheme="purple" value={PURPLE}>
            Purple
          </Radio>
          <Radio colorScheme="pink" value={PINK}>
            Pink
          </Radio>
          <Radio colorScheme="blue" value={BLUE}>
            Blue
          </Radio>
          <Radio colorScheme="orange" value={ORANGE}>
            Orange
          </Radio>
        </Stack>
      </RadioGroup.Root>
    </Flex>
  );
};

export default Appearance;
