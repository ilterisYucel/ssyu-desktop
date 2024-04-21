import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaFilter, FaSort } from "react-icons/fa6";

const PageToolbar = ({ inputPlaceholder, buttonText }) => {
  return (
    <Flex>
      <Box paddingTop={8} paddingLeft={4} width="66%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input paddingRight={24} placeholder={inputPlaceholder} />
          <InputRightElement>
            <ButtonGroup spacing="1" marginRight={16}>
              <IconButton
                background="transparent"
                icon={<FaFilter />}
                color="gray.700"
                aria-label="filtrele"
                onClick={() => console.log("OK")}
              />
              <IconButton
                background="transparent"
                icon={<FaSort />}
                color="gray.700"
                aria-label="sırala"
                onClick={() => console.log("OK")}
              />
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Spacer />
      <Box paddingTop={8} paddingRight={4}>
        <Button colorScheme="red">{buttonText}</Button>
      </Box>
    </Flex>
  );
};

export default PageToolbar;