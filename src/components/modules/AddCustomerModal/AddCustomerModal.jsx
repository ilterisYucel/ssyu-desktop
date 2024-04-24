import React, { useState, useContext } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  ModalBody,
  Input,
  InputLeftAddon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Select,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FaPhone } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

import { CustomerContext } from "../../../context";
import { client } from "../../../utils/requestUtils";

const AddCustomerModal = ({ isOpen, onOpen, onClose }) => {
  const { addCustomer } = useContext(CustomerContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [registrationDate, setRegistrationDate] = useState(new Date());

  const toast = useToast();
  const close = () => {
    setName("");
    setPhone("");
    setEmail("");
    setGender("");
    setRegistrationDate(null);
  };

  const submitCustomer = () => {
    if (!name || !phone || !gender || !registrationDate) {
      toast({
        title: "Müşteri Oluşturulamadı.",
        description: "İsim, telefon, cinsiyet ve kayıt zamanı zorunlu alandır.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const createCustomerPromise = createCustomer();
    const successToast = {
      title: "Müşteri Oluşturuldu.",
      description: `${name} isimli müşteri oluşturuldu.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    };
    const pendingToast = {
      title: "Müşteri oluşturuluyor",
      description: `${name} isimli müşteri oluşturuluyor...`,
      status: "info",
    };
    const failToast = {
      title: "Müşteri oluşturulamadı.",
      description: `Sunucu yanıt vermiyor olabilir.`,
      status: "error",
    };
    toast.promise(createCustomerPromise, {
      success: successToast,
      error: failToast,
      loading: pendingToast,
    });
  };

  const createCustomer = async () => {
    try {
      const newCustomer = {
        name,
        phone,
        email,
        gender,
        registrationDate,
      };
      const response = await client.post("customers", newCustomer);
      addCustomer(response.data);
      onClose(true);
      close();
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Müşteri</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <IoPersonCircleSharp />
                  </InputLeftElement>
                  <Input
                    variant="outline"
                    placeholder="Müşteri İsmi"
                    onInput={(event) => setName(event.currentTarget.value)}
                  />
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftAddon>+90</InputLeftAddon>
                  <Input
                    type="tel"
                    variant="outline"
                    placeholder="Müşteri Telefon Numarası"
                    onInput={(event) => setPhone(event.currentTarget.value)}
                  />
                  <InputRightElement pointerEvents="none">
                    <FaPhone />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl>
              <Box paddingBottom={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdEmail />
                  </InputLeftElement>
                  <Input
                    variant="outline"
                    type="mail"
                    placeholder="Müşteri Eposta Adresi"
                    onInput={(event) => setEmail(event.currentTarget.value)}
                  />
                </InputGroup>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box paddingBottom={4}>
                <Select
                  icon={<FaTransgender />}
                  placeholder="Müşteri Cinsiyeti"
                  onChange={(event) => setGender(event.currentTarget.value)}
                >
                  <option value="K">Kadın</option>
                  <option value="E">Erkek</option>
                </Select>
              </Box>
            </FormControl>
            <FormControl isRequired={true}>
              <Box>
                <SingleDatepicker
                  configs={{ dateFormat: "dd/MM/yyyy" }}
                  propsConfigs={{
                    triggerBtnProps: {
                      w: "100%",
                    },
                  }}
                  name="date-input"
                  date={registrationDate}
                  onDateChange={setRegistrationDate}
                />
              </Box>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button colorScheme="red" onClick={submitCustomer}>
            Ekle
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCustomerModal;
