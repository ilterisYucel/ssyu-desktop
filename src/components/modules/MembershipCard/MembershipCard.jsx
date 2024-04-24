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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CustomerContext } from "../../../context/index.js";
import { IoPersonCircle } from "react-icons/io5";
import { GiDuration } from "react-icons/gi";
import { LuCalendarCheck2, LuCalendarOff } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { dateFormat } from "../../../utils/valueUtils.js";
import { client } from "../../../utils/requestUtils.js";
import { MembershipContext } from "../../../context/index.js";
import MembershipImage from "../../../assets/images/membership.png";
import { AddorUpdateMembershipModal } from "../../modules/index.js";

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
  const { deleteMembership } = useContext(MembershipContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const customer = getCustomers().filter(
    (customer) => customer.id === customerId
  )[0];

  const delMembership = async () => {
    try {
      await client.delete(`memberships/${id}`);
      deleteMembership(id);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteMembershipCallback = () => {
    const deleteCustomerPromise = delMembership();
    const successToast = {
      title: "Üyelik Silindi.",
      status: "success",
      duration: 3000,
      isClosable: true,
    };
    const pendingToast = {
      title: "Üyelik Siliniyor...",
      status: "info",
    };
    const failToast = {
      title: "Üyelik Silinemedi.",
      description: `Sunucu yanıt vermiyor olabilir.`,
      status: "error",
    };
    toast.promise(deleteCustomerPromise, {
      success: successToast,
      error: failToast,
      loading: pendingToast,
    });
  };

  const updateButton = (
    <Button
      variant="outline"
      colorScheme="blue"
      w="100%"
      onClick={() => onOpen(true)}
    >
      Güncelle
    </Button>
  );
  const deleteButton = (
    <Button colorScheme="red" w="100%" onClick={deleteMembershipCallback}>
      Sil
    </Button>
  );

  const checkPaymentButton = (
    <Button colorScheme="green" w="100%">
      Ödeme Onayı
    </Button>
  );

  return (
    <>
      <Card
        key={id}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
      >
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
            <HStack spacing="8px">
              {updateButton}
              {deleteButton}
              {checkPaymentButton}
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
      <AddorUpdateMembershipModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        data={{
          id,
          beginDate,
          duration,
          endDate,
          payment,
          customerId,
        }}
      />
    </>
  );
};

export default MembershipCard;
