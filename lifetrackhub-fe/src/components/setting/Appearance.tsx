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
  DEEP_PINK,
  DEFAULT,
} from '../../constants/extend-theme/colors';

const Appearance = () => {
  const [value, setValue] = useState(
    localStorage.getItem(APP_COLOR_KEY) || DEFAULT
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
        <Stack direction="row">
          <Radio size="lg" colorScheme="gray" value={DEFAULT}>
            Default
          </Radio>
          <Radio size="lg" colorScheme="pink" value={DEEP_PINK}>
            Pink
          </Radio>
          <Radio size="lg" colorScheme="blue" value={BLUE}>
            Blue
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default Appearance;
