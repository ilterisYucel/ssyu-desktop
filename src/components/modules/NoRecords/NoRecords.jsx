import React from "react";
import { Box, AbsoluteCenter, Text, Center } from "@chakra-ui/react";
import { MdSearchOff } from "react-icons/md";

const NoRecords = () => {
  return (
    <Box>
      <AbsoluteCenter axis="both">
        <Center>
          <MdSearchOff size={64} />
        </Center>
        <Text fontSize="24px" padding={4}>
          Kayıt Bulunamadı
        </Text>
      </AbsoluteCenter>
    </Box>
  );
};

export default NoRecords;
