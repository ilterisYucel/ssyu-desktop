import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  HStack,
  Icon,
  Box,
  Center,
} from "@chakra-ui/react";
import { selectAvatar } from "../../../utils/imageUtils.js";
import { dateFormat } from "../../../utils/valueUtils.js";
import { IoPersonCircle } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa6";

const DataCard = ({ icon, data }) => {
  return (
    <HStack spacing="16px">
      <Icon as={icon} boxSize={8} />
      <Center>
        <Text>{data}</Text>
      </Center>
    </HStack>
  );
};

const CustomerCard = ({ data }) => {
  const { name, phone, email, gender, registrationDate } = data;
  const avatar = selectAvatar(gender);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      maxHeight="275px"
      overflow="hidden"
    >
      <Center>
        <Image
          objectFit="contain"
          padding={8}
          boxSize={{ base: "100%", md: "200px", lg: "250px" }}
          src={avatar}
          alt="Avatar"
        />
      </Center>
      <Stack>
        <CardBody>
          <Stack spacing="2">
            <DataCard icon={IoPersonCircle} data={name} />
            <DataCard icon={FaPhone} data={phone} />
            <DataCard icon={MdEmail} data={email} />
            <DataCard
              icon={FaCalendarCheck}
              data={dateFormat(registrationDate)}
            />
          </Stack>
        </CardBody>

        <CardFooter>
          <Button variant="outline" colorScheme="teal" width="100%">
            Detay
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
export default CustomerCard;
