import { Button, Text } from '@chakra-ui/react';

const SsoLoginButton: React.FC<{
  onClick: () => void;
  text: string;
  icon: JSX.Element;
}> = ({ onClick, text, icon }) => {
  return (
    <Button
      onClick={onClick}
      leftIcon={icon}
      colorScheme="gray"
      variant="outline"
      size="md"
      width="full"
      fontWeight="medium"
      _hover={{ bg: 'gray.100' }}
      _active={{ bg: 'gray.200' }}
      rounded="md"
      shadow="sm"
    >
      <Text>{text}</Text>
    </Button>
  );
};

export default SsoLoginButton;
