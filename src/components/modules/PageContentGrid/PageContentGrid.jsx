import { Box, SimpleGrid } from "@chakra-ui/react";

const PageContentGrid = ({ cols }) => {
  return (
    <Box padding={4}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
        {cols}
      </SimpleGrid>
    </Box>
  );
};

export default PageContentGrid;
