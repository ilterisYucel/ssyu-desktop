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
  HStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";
import { FaFilter, FaSort } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";

const PageToolbar = ({ inputPlaceholder, buttonText, modalComponent }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ModalCompoent = modalComponent;
  const modal = modalComponent && (
    <ModalCompoent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
  );
  return (
    <>
      <Flex>
        <Box paddingTop={8} paddingLeft={4} width="66%">
          <HStack>
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
            <IconButton
              background="transparent"
              icon={<IoIosRefresh size={24} />}
              color="gray.700"
              aria-label="yenile"
              onClick={() => window.location.reload()}
            />
          </HStack>
        </Box>
        <Spacer />
        <Box paddingTop={8} paddingRight={4}>
          <Button colorScheme="red" onClick={onOpen}>
            {buttonText}
          </Button>
        </Box>
      </Flex>
      {modal && modal}
    </>
  );
};

export default PageToolbar;
