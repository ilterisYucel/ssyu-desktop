import {
  Card,
  Center,
  HStack,
  Icon,
  Text,
  Image,
  Stack,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CustomerContext } from "../../../context/index.js";
import { IoPersonCircle } from "react-icons/io5";
import { GiDuration } from "react-icons/gi";
import { LuCalendarCheck2, LuCalendarOff } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { dateFormat } from "../../../utils/valueUtils.js";
import MembershipImage from "../../../assets/images/membership.png";

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

const MembershipCard = ({ data }) => {
  const { id, customerId, beginDate, duration, endDate, payment } = data;
  const { getCustomers } = useContext(CustomerContext);
  const customer = getCustomers().filter(
    (customer) => customer.id === customerId
  )[0];

  return (
    <Card key={id} direction={{ base: "column", sm: "row" }} overflow="hidden">
      <Center>
        <Image
          objectFit="contain"
          padding={8}
          boxSize={{ base: "100%", md: "200px", lg: "250px" }}
          src={MembershipImage}
          alt="Üyelik Simgesi"
        />
      </Center>
      <Stack>
        <CardBody>
          <Stack spacing="2">
            <DataCard icon={IoPersonCircle} data={customer?.name} />
            <DataCard icon={LuCalendarCheck2} data={dateFormat(beginDate)} />
            <DataCard icon={GiDuration} data={`${duration} Ay`} />
            <DataCard icon={LuCalendarOff} data={dateFormat(endDate)} />
            <DataCard
              icon={MdOutlinePayments}
              data={payment ? "Ödeme Alındı" : "Ödeme Alınmadı"}
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

export default MembershipCard;
