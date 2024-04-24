import React, { useContext } from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  CardFooter,
  Button,
  HStack,
  Icon,
  Center,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { selectAvatar } from "../../../utils/imageUtils.js";
import { dateFormat } from "../../../utils/valueUtils.js";
import { IoPersonCircle } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa6";

import { client } from "../../../utils/requestUtils.js";
import { CustomerContext } from "../../../context/CustomerContext.jsx";
import { AddorUpdateCustomerModal } from "../../modules/index.js";

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
  const { id, name, phone, email, gender, registrationDate } = data;
  const avatar = selectAvatar(gender);
  const toast = useToast();

  const { deleteCustomer } = useContext(CustomerContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const delCustomer = async () => {
    try {
      await client.delete(`customers/${id}`);
      deleteCustomer(id);
    } catch (err) {
      throw new Error(err);
    }
  };
  const deleteCustomerCallback = () => {
    const deleteCustomerPromise = delCustomer();
    const successToast = {
      title: "Müşteri Silindi.",
      description: `${name} isimli müşteri silindi.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    };
    const pendingToast = {
      title: "Müşteri Siliniyor",
      description: `${name} isimli müşteri siliniyor...`,
      status: "info",
    };
    const failToast = {
      title: "Müşteri Silinemedi.",
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
    <Button colorScheme="red" w="100%" onClick={deleteCustomerCallback}>
      Sil
    </Button>
  );

  return (
    <>
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden">
        <Center>
          <Image
            objectFit="contain"
            objectPosition="center"
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
            <HStack spacing="8px">
              {updateButton}
              {deleteButton}
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
      <AddorUpdateCustomerModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        data={{
          id,
          name,
          gender,
          phone,
          email,
          registrationDate,
        }}
      />
    </>
  );
};
export default CustomerCard;
