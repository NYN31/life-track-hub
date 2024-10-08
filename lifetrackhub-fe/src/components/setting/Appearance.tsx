import {
  Box,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  APP_COLOR_KEY,
  BLUE,
  GREEN,
  ORANGE,
  PINK,
  PURPLE,
} from '../../constants/extend-theme/colors';

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

      <RadioGroup onChange={setValue} value={value}>
        <Stack direction={['column', 'column', 'row']}>
          <Radio size="lg" colorScheme="purple" value={PURPLE}>
            Purple
          </Radio>
          <Radio size="lg" colorScheme="pink" value={PINK}>
            Pink
          </Radio>
          <Radio size="lg" colorScheme="blue" value={BLUE}>
            Blue
          </Radio>
          <Radio size="lg" colorScheme="orange" value={ORANGE}>
            Orange
          </Radio>
          <Radio size="lg" colorScheme="green" value={GREEN}>
            Green
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default Appearance;
